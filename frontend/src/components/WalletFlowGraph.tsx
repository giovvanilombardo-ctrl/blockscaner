import { t as _t } from "@/i18n";
import { useMemo, useState, useRef, useEffect } from "react";

interface Transaction {
  id: number;
  date: Date;
  fromAddress: string;
  toAddress: string;
  amount: number;
  label: string;
  type: "initial" | "transfer" | "exchange" | "mixer" | "scammer" | "stolen";
}

interface Node {
  id: string;
  label: string;
  type: "victim" | "exchange" | "mixer" | "scammer" | "intermediate";
  x: number;
  y: number;
  totalAmount: number;
}

interface Edge {
  from: string;
  to: string;
  amount: number;
  type: Transaction["type"];
}

const NODE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  victim: { bg: "#1e78e6", border: "#3b8ff0", text: "#ffffff" },
  exchange: { bg: "#2dd4a0", border: "#34d399", text: "#0a1628" },
  mixer: { bg: "#8b5cf6", border: "#a78bfa", text: "#ffffff" },
  scammer: { bg: "#dc3232", border: "#ef4444", text: "#ffffff" },
  intermediate: { bg: "#e89c28", border: "#f59e0b", text: "#0a1628" },
};

const shortenAddr = (addr: string) =>
  addr.length > 14 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;

export default function WalletFlowGraph({
  transactions,
  walletAddress,
}: {
  transactions: Transaction[];
  walletAddress: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 520 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width: Math.max(600, width), height: 520 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map<string, Node>();
    const edgeList: Edge[] = [];

    const classifyAddress = (addr: string, tx: Transaction): Node["type"] => {
      if (addr.toLowerCase() === walletAddress.toLowerCase()) return "victim";
      if (tx.type === "exchange" && addr === tx.toAddress) return "exchange";
      if (tx.type === "mixer" && addr === tx.toAddress) return "mixer";
      if (tx.type === "scammer" && addr === tx.toAddress) return "scammer";
      return "intermediate";
    };

    const labelForNode = (addr: string, type: Node["type"], tx: Transaction): string => {
      if (type === "victim") return _t("Ihre Wallet");
      if (type === "exchange") {
        const m = tx.label.match(/on (.+)$/);
        return m ? m[1] : _t("Exchange");
      }
      if (type === "mixer") {
        const m = tx.label.match(/through (.+)$/);
        return m ? m[1] : _t("Mixer");
      }
      if (type === "scammer") return _t("Betrüger-Wallet");
      return _t("Zwischenwallet");
    };

    for (const tx of transactions) {
      for (const addr of [tx.fromAddress, tx.toAddress]) {
        if (!nodeMap.has(addr)) {
          const type = classifyAddress(addr, tx);
          nodeMap.set(addr, {
            id: addr,
            label: labelForNode(addr, type, tx),
            type,
            x: 0,
            y: 0,
            totalAmount: tx.amount,
          });
        } else {
          nodeMap.get(addr)!.totalAmount += tx.amount;
          // upgrade type if more specific
          const existing = nodeMap.get(addr)!;
          const newType = classifyAddress(addr, tx);
          if (existing.type === "intermediate" && newType !== "intermediate") {
            existing.type = newType;
            existing.label = labelForNode(addr, newType, tx);
          }
        }
      }
      edgeList.push({ from: tx.fromAddress, to: tx.toAddress, amount: tx.amount, type: tx.type });
    }

    // Layout: group by type into columns
    const W = dimensions.width;
    const H = dimensions.height;
    const padding = 70;

    const groups: Record<Node["type"], Node[]> = {
      victim: [],
      exchange: [],
      mixer: [],
      scammer: [],
      intermediate: [],
    };
    for (const n of nodeMap.values()) groups[n.type].push(n);

    // Column positions (left to right)
    const cols: { types: Node["type"][]; x: number }[] = [
      { types: ["exchange"], x: padding },          // left: source exchanges (deposits)
      { types: ["victim"], x: W * 0.25 },
      { types: ["intermediate", "mixer"], x: W * 0.55 },
      { types: ["scammer", "exchange"], x: W - padding },
    ];

    // Separate deposit exchanges from cashout exchanges
    const depositExchanges = new Set<string>();
    const cashoutExchanges = new Set<string>();
    for (const tx of transactions) {
      if (tx.type === "initial") depositExchanges.add(tx.fromAddress);
      if (tx.type === "exchange") cashoutExchanges.add(tx.toAddress);
    }

    // Position nodes
    const positioned = new Set<string>();

    // Victim
    for (const n of groups.victim) {
      n.x = W * 0.22;
      n.y = H / 2;
      positioned.add(n.id);
    }

    // Deposit exchanges (left)
    const depExArr = [...nodeMap.values()].filter((n) => depositExchanges.has(n.id) && !cashoutExchanges.has(n.id));
    depExArr.forEach((n, i) => {
      n.x = padding;
      n.y = padding + 40 + (i * (H - 2 * padding - 40)) / Math.max(1, depExArr.length - 1);
      positioned.add(n.id);
    });

    // Intermediates + mixers (middle)
    const midNodes = [...nodeMap.values()].filter(
      (n) => !positioned.has(n.id) && (n.type === "intermediate" || n.type === "mixer")
    );
    midNodes.forEach((n, i) => {
      n.x = W * 0.48 + (i % 2 === 0 ? -30 : 30);
      n.y = padding + 20 + (i * (H - 2 * padding - 20)) / Math.max(1, midNodes.length - 1);
      positioned.add(n.id);
    });

    // Right side: cashout exchanges + scammers
    const rightNodes = [...nodeMap.values()].filter((n) => !positioned.has(n.id));
    rightNodes.forEach((n, i) => {
      n.x = W - padding;
      n.y = padding + 40 + (i * (H - 2 * padding - 40)) / Math.max(1, rightNodes.length - 1);
      positioned.add(n.id);
    });

    return { nodes: [...nodeMap.values()], edges: edgeList };
  }, [transactions, walletAddress, dimensions]);

  const maxAmount = Math.max(...edges.map((e) => e.amount), 1);

  const getEdgeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "stolen": return "#dc3232";
      case "mixer": return "#8b5cf6";
      case "exchange": return "#2dd4a0";
      case "scammer": return "#dc3232";
      default: return "#4b5563";
    }
  };

  return (
    <div ref={containerRef} className="w-full overflow-x-auto rounded-lg border border-border bg-background/50">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-4 pt-4 pb-2 text-xs">
        {Object.entries(NODE_COLORS).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full border"
              style={{ background: colors.bg, borderColor: colors.border }}
            />
            <span className="text-muted-foreground capitalize">
              {type === "victim" ? _t("Ihre Wallet") : type === "intermediate" ? _t("Zwischenwallet") : type === "exchange" ? _t("Börse") : type === "mixer" ? _t("Mixer") : type === "scammer" ? _t("Betrüger") : type}
            </span>
          </div>
        ))}
      </div>

      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="block"
      >
        <defs>
          {edges.map((e, i) => (
            <marker
              key={`arrow-${i}`}
              id={`arrow-${i}`}
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill={getEdgeColor(e.type)}
                opacity={0.7}
              />
            </marker>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in={"SourceGraphic"} />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const fromNode = nodes.find((n) => n.id === e.from);
          const toNode = nodes.find((n) => n.id === e.to);
          if (!fromNode || !toNode) return null;

          const strokeW = 1.5 + (e.amount / maxAmount) * 3;
          const isHighlighted = hoveredNode === e.from || hoveredNode === e.to;
          const opacity = hoveredNode ? (isHighlighted ? 0.9 : 0.15) : 0.5;

          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const cx = fromNode.x + dx * 0.5;
          const cy = fromNode.y + dy * 0.5 + (i % 2 === 0 ? -25 : 25);
          const pathD = `M ${fromNode.x} ${fromNode.y} Q ${cx} ${cy} ${toNode.x} ${toNode.y}`;
          const particleColor = getEdgeColor(e.type);
          const speed = 2 + (1 - e.amount / maxAmount) * 3;

          return (
            <g key={`edge-${i}`}>
              <path
                d={pathD}
                fill="none"
                stroke={getEdgeColor(e.type)}
                strokeWidth={strokeW}
                opacity={opacity}
                markerEnd={`url(#arrow-${i})`}
                className="transition-opacity duration-200"
              />
              {/* Animated particle */}
              <circle r={Math.max(2.5, strokeW * 0.8)} fill={particleColor} opacity={hoveredNode ? (isHighlighted ? 1 : 0.1) : 0.85}>
                <animateMotion dur={`${speed}s`} repeatCount="indefinite" path={pathD} begin={`${(i * 0.4) % 2}s`} />
              </circle>
              {/* Second staggered particle for larger edges */}
              {e.amount / maxAmount > 0.3 && (
                <circle r={Math.max(1.8, strokeW * 0.5)} fill={particleColor} opacity={hoveredNode ? (isHighlighted ? 0.7 : 0.05) : 0.5}>
                  <animateMotion dur={`${speed * 1.3}s`} repeatCount="indefinite" path={pathD} begin={`${(i * 0.4) % 2 + speed * 0.5}s`} />
                </circle>
              )}
              {/* Glow trail on hover */}
              {isHighlighted && (
                <circle r={5} fill={particleColor} opacity={0.3} filter={"url(#glow)"}>
                  <animateMotion dur={`${speed}s`} repeatCount="indefinite" path={pathD} begin={`${(i * 0.4) % 2}s`} />
                </circle>
              )}
              {isHighlighted && (
                <text x={cx} y={cy - 8} textAnchor="middle" fill={getEdgeColor(e.type)} fontSize="10" fontWeight="bold">
                  €{e.amount.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const colors = NODE_COLORS[node.type];
          const isHovered = hoveredNode === node.id;
          const dimmed = hoveredNode && !isHovered;
          const r = node.type === "victim" ? 28 : 20;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-opacity duration-200"
              opacity={dimmed ? 0.25 : 1}
              filter={isHovered ? "url(#glow)" : undefined}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={colors.bg}
                stroke={colors.border}
                strokeWidth={isHovered ? 3 : 1.5}
              />
              {/* Icon text inside */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                fontSize={r > 24 ? 11 : 9}
                fontWeight="bold"
              >
                {node.type === "victim"
                   ? "SIE"
                   : node.type === "exchange"
                   ? "EX"
                   : node.type === "mixer"
                   ? "MIX"
                   : node.type === "scammer"
                   ? "⚠"
                   : "→"}
              </text>
              {/* Label below */}
              <text
                x={node.x}
                y={node.y + r + 13}
                textAnchor="middle"
                fill="currentColor"
                className="text-foreground"
                fontSize="9"
                fontWeight="600"
              >
                {node.label.length > 16 ? node.label.slice(0, 14) + "…" : node.label}
              </text>
              <text
                x={node.x}
                y={node.y + r + 24}
                textAnchor="middle"
                fontSize="8"
                className="text-muted-foreground"
                fill="currentColor"
                opacity={0.6}
              >
                {shortenAddr(node.id)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
