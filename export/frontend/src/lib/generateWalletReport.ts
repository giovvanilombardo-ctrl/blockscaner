import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImg from "@/assets/logo-b24.png";

interface Transaction {
  id: number;
  date: Date;
  fromAddress: string;
  toAddress: string;
  amount: number;
  label: string;
  type: "initial" | "transfer" | "exchange" | "mixer" | "scammer" | "stolen";
}

interface PdfReportData {
  userName: string;
  walletAddress: string;
  transactions: Transaction[];
  totalStolen: number;
  exchangeCount: number;
  trackedWallets: number;
  generatedAt: Date;
}

interface GraphNode {
  id: string;
  label: string;
  type: "victim" | "exchange" | "mixer" | "scammer" | "intermediate";
  x: number;
  y: number;
  totalAmount: number;
}

interface GraphEdge {
  from: string;
  to: string;
  amount: number;
  type: Transaction["type"];
}

const NODE_COLORS_PDF: Record<string, { bg: [number, number, number]; border: [number, number, number]; text: [number, number, number] }> = {
  victim: { bg: [30, 120, 230], border: [59, 143, 240], text: [255, 255, 255] },
  exchange: { bg: [45, 212, 160], border: [52, 211, 153], text: [10, 22, 40] },
  mixer: { bg: [139, 92, 246], border: [167, 139, 250], text: [255, 255, 255] },
  scammer: { bg: [220, 50, 50], border: [239, 68, 68], text: [255, 255, 255] },
  intermediate: { bg: [232, 156, 40], border: [245, 158, 11], text: [10, 22, 40] },
};

function buildGraph(transactions: Transaction[], walletAddress: string, W: number, H: number): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodeMap = new Map<string, GraphNode>();
  const edgeList: GraphEdge[] = [];

  const classifyAddress = (addr: string, tx: Transaction): GraphNode["type"] => {
    if (addr.toLowerCase() === walletAddress.toLowerCase()) return "victim";
    if (tx.type === "exchange" && addr === tx.toAddress) return "exchange";
    if (tx.type === "mixer" && addr === tx.toAddress) return "mixer";
    if (tx.type === "scammer" && addr === tx.toAddress) return "scammer";
    return "intermediate";
  };

  const labelForNode = (addr: string, type: GraphNode["type"], tx: Transaction): string => {
    if (type === "victim") return "Ihre Wallet";
    if (type === "exchange") { const m = tx.label.match(/on (.+)$/); return m ? m[1] : "Exchange"; }
    if (type === "mixer") { const m = tx.label.match(/through (.+)$/); return m ? m[1] : "Mixer"; }
    if (type === "scammer") return tx.label || "Scammer";
    return "Zwischenwallet";
  };

  for (const tx of transactions) {
    for (const addr of [tx.fromAddress, tx.toAddress]) {
      if (!nodeMap.has(addr)) {
        const type = classifyAddress(addr, tx);
        nodeMap.set(addr, { id: addr, label: labelForNode(addr, type, tx), type, x: 0, y: 0, totalAmount: tx.amount });
      } else {
        const existing = nodeMap.get(addr)!;
        existing.totalAmount += tx.amount;
        const newType = classifyAddress(addr, tx);
        if (existing.type === "intermediate" && newType !== "intermediate") {
          existing.type = newType;
          existing.label = labelForNode(addr, newType, tx);
        }
      }
    }
    edgeList.push({ from: tx.fromAddress, to: tx.toAddress, amount: tx.amount, type: tx.type });
  }

  const padding = 18;
  const depositExchanges = new Set<string>();
  const cashoutExchanges = new Set<string>();
  for (const tx of transactions) {
    if (tx.type === "initial") depositExchanges.add(tx.fromAddress);
    if (tx.type === "exchange") cashoutExchanges.add(tx.toAddress);
  }

  const positioned = new Set<string>();

  // Victim
  for (const n of nodeMap.values()) {
    if (n.type === "victim") { n.x = W * 0.22; n.y = H / 2; positioned.add(n.id); }
  }

  // Deposit exchanges (left)
  const depExArr = [...nodeMap.values()].filter(n => depositExchanges.has(n.id) && !cashoutExchanges.has(n.id));
  depExArr.forEach((n, i) => { n.x = padding; n.y = padding + 10 + (i * (H - 2 * padding - 10)) / Math.max(1, depExArr.length - 1); positioned.add(n.id); });

  // Intermediates + mixers
  const midNodes = [...nodeMap.values()].filter(n => !positioned.has(n.id) && (n.type === "intermediate" || n.type === "mixer"));
  midNodes.forEach((n, i) => { n.x = W * 0.48 + (i % 2 === 0 ? -8 : 8); n.y = padding + 6 + (i * (H - 2 * padding - 6)) / Math.max(1, midNodes.length - 1); positioned.add(n.id); });

  // Right side
  const rightNodes = [...nodeMap.values()].filter(n => !positioned.has(n.id));
  rightNodes.forEach((n, i) => { n.x = W - padding; n.y = padding + 10 + (i * (H - 2 * padding - 10)) / Math.max(1, rightNodes.length - 1); positioned.add(n.id); });

  return { nodes: [...nodeMap.values()], edges: edgeList };
}

function drawFlowGraph(doc: jsPDF, data: PdfReportData, startY: number, margin: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const graphW = pageWidth - margin * 2;
  const graphH = 90; // mm
  const originX = margin;
  const originY = startY;

  // Section title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 35, 45);
  doc.text("GELDFLUSS-NETZWERK", margin, startY - 3);

  // Background
  doc.setFillColor(248, 249, 252);
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(originX, originY, graphW, graphH, 2, 2, "FD");

  const { nodes, edges } = buildGraph(data.transactions, data.walletAddress, graphW, graphH);
  const maxAmount = Math.max(...edges.map(e => e.amount), 1);

  const getEdgeColor = (type: Transaction["type"]): [number, number, number] => {
    switch (type) {
      case "stolen": return [220, 50, 50];
      case "mixer": return [139, 92, 246];
      case "exchange": return [45, 212, 160];
      case "scammer": return [220, 50, 50];
      default: return [75, 85, 99];
    }
  };

  // Draw edges as lines
  for (let i = 0; i < edges.length; i++) {
    const e = edges[i];
    const fromNode = nodes.find(n => n.id === e.from);
    const toNode = nodes.find(n => n.id === e.to);
    if (!fromNode || !toNode) continue;

    const strokeW = 0.3 + (e.amount / maxAmount) * 0.8;
    const color = getEdgeColor(e.type);

    doc.setDrawColor(...color);
    doc.setLineWidth(strokeW);

    const x1 = originX + fromNode.x;
    const y1 = originY + fromNode.y;
    const x2 = originX + toNode.x;
    const y2 = originY + toNode.y;

    doc.line(x1, y1, x2, y2);

    // Arrowhead
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const nodeR = toNode.type === "victim" ? 7 : 5;
    const ax = x2 - Math.cos(angle) * nodeR;
    const ay = y2 - Math.sin(angle) * nodeR;
    const aLen = 2;
    const aW = 0.8;
    doc.setFillColor(...color);
    doc.triangle(
      ax, ay,
      ax - Math.cos(angle - 0.4) * aLen, ay - Math.sin(angle - 0.4) * aLen,
      ax - Math.cos(angle + 0.4) * aLen, ay - Math.sin(angle + 0.4) * aLen,
      "F"
    );

    // Amount label on edge midpoint
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - 1.5;
    doc.setFontSize(4.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(`€${e.amount.toLocaleString("de-DE", { maximumFractionDigits: 0 })}`, mx, my, { align: "center" });
  }

  // Draw nodes
  for (const node of nodes) {
    const colors = NODE_COLORS_PDF[node.type];
    const r = node.type === "victim" ? 7 : 5;
    const cx = originX + node.x;
    const cy = originY + node.y;

    doc.setFillColor(...colors.bg);
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.4);
    doc.circle(cx, cy, r, "FD");

    // Icon text
    const iconText = node.type === "victim" ? "YOU" : node.type === "exchange" ? "EX" : node.type === "mixer" ? "MIX" : node.type === "scammer" ? "!" : "→";
    doc.setFontSize(node.type === "victim" ? 5 : 4);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.text);
    doc.text(iconText, cx, cy + (node.type === "victim" ? 1.5 : 1.2), { align: "center" });

    // Label below node
    doc.setFontSize(4);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 55, 65);
    const lbl = node.label.length > 16 ? node.label.slice(0, 14) + "…" : node.label;
    doc.text(lbl, cx, cy + r + 4, { align: "center" });

    // Address below label
    doc.setFontSize(3.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130, 135, 145);
    const shortAddr = node.id.length > 14 ? `${node.id.slice(0, 6)}…${node.id.slice(-4)}` : node.id;
    doc.text(shortAddr, cx, cy + r + 7.5, { align: "center" });
  }

  // Legend
  const legendY = originY + graphH + 3;
  const types: { key: string; label: string }[] = [
    { key: "victim", label: "Ihre Wallet" },
    { key: "exchange", label: "Exchange" },
    { key: "mixer", label: "Mixer" },
    { key: "scammer", label: "Scammer" },
    { key: "intermediate", label: "Zwischenwallet" },
  ];
  let lx = margin;
  doc.setFontSize(5);
  for (const t of types) {
    const c = NODE_COLORS_PDF[t.key];
    doc.setFillColor(...c.bg);
    doc.circle(lx + 1.5, legendY, 1.5, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 85, 95);
    doc.text(t.label, lx + 4.5, legendY + 1);
    lx += doc.getTextWidth(t.label) + 8;
  }

  return legendY + 6;
}

export function generateWalletReport(data: PdfReportData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 0;

  const brandBlue: [number, number, number] = [30, 120, 230];
  const darkBg: [number, number, number] = [18, 22, 32];
  const white: [number, number, number] = [255, 255, 255];
  const lightGray: [number, number, number] = [180, 185, 195];
  const red: [number, number, number] = [220, 50, 50];
  const green: [number, number, number] = [50, 180, 100];
  const orange: [number, number, number] = [230, 160, 40];
  const purple: [number, number, number] = [140, 80, 220];

  // ---- HEADER BAND ----
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, 52, "F");

  doc.setFillColor(...brandBlue);
  doc.rect(0, 52, pageWidth, 1.5, "F");

  doc.addImage(logoImg, "PNG", margin, 6, 18, 18);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...white);
  doc.text("Blockscaner", margin + 22, 18);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...lightGray);
  doc.text("Blockchain Forensik & Krypto-Rückgewinnung", margin + 22, 24);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...brandBlue);
  doc.text("FORENSIK-BERICHT", pageWidth - margin, 16, { align: "right" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...lightGray);
  doc.text(`Wallet-Transaktionsanalyse`, pageWidth - margin, 22, { align: "right" });

  const refNo = `BF-${Date.now().toString(36).toUpperCase()}`;
  doc.setFontSize(7);
  doc.text(`Ref: ${refNo}`, pageWidth - margin, 28, { align: "right" });
  doc.text(
    `Erstellt: ${data.generatedAt.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}`,
    pageWidth - margin, 34, { align: "right" }
  );

  y = 62;

  // ---- CONFIDENTIAL BANNER ----
  doc.setFillColor(red[0], red[1], red[2]);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 8, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...white);
  doc.text("⚠  VERTRAULICH — Dieses Dokument enthält sensible Ermittlungsdaten", pageWidth / 2, y + 5.5, { align: "center" });

  y += 14;

  // ---- CLIENT INFORMATION ----
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 34, 2, 2, "F");
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 34, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(60, 65, 75);
  doc.text("MANDANTENINFORMATIONEN", margin + 5, y + 6);

  doc.setDrawColor(...brandBlue);
  doc.setLineWidth(0.5);
  doc.line(margin + 5, y + 8, margin + 60, y + 8);

  const infoY = y + 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 105, 115);

  const infoLeft = [
    ["Name:", data.userName],
    ["Betroffene Wallet:", data.walletAddress.length > 30 ? data.walletAddress.slice(0, 16) + "..." + data.walletAddress.slice(-10) : data.walletAddress],
  ];
  const infoRight = [
    ["Analysezeitraum:", (() => {
      const dates = data.transactions.map((t) => t.date).sort((a, b) => a.getTime() - b.getTime());
      const earliest = dates[0];
      const latest = dates[dates.length - 1];
      const fmt = (d: Date) => {
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
      };
      return earliest && latest ? `${fmt(earliest)} — ${fmt(latest)}` : "—";
    })()],
    ["Transaktionen:", `${data.transactions.length} erkannt`],
  ];

  infoLeft.forEach(([label, value], i) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 105, 115);
    doc.text(label, margin + 5, infoY + i * 7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 35, 45);
    doc.text(value, margin + 40, infoY + i * 7);
  });

  infoRight.forEach(([label, value], i) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 105, 115);
    doc.text(label, pageWidth / 2 + 5, infoY + i * 7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 35, 45);
    doc.text(value, pageWidth / 2 + 40, infoY + i * 7);
  });

  y += 40;

  // ---- SUMMARY BOXES ----
  const boxWidth = (pageWidth - margin * 2 - 8) / 3;
  const boxes = [
    { label: "Gestohlener Betrag", value: `€${data.totalStolen.toLocaleString("de-DE", { minimumFractionDigits: 2 })}`, color: red },
    { label: "Börsen-Auszahlungen", value: `${data.exchangeCount}`, color: brandBlue },
    { label: "Verfolgte Wallets", value: `${data.trackedWallets}`, color: green },
  ];

  boxes.forEach((box, i) => {
    const bx = margin + i * (boxWidth + 4);
    doc.setFillColor(...box.color);
    doc.roundedRect(bx, y, boxWidth, 18, 2, 2, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(box.label, bx + boxWidth / 2, y + 6, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(box.value, bx + boxWidth / 2, y + 14, { align: "center" });
  });

  y += 24;

  // ---- FUND FLOW NETWORK GRAPH ----
  y += 4;
  y = drawFlowGraph(doc, data, y, margin);

  // ---- Check if table fits, else new page ----
  if (y > pageHeight - 80) {
    doc.addPage();
    y = 20;
  }

  // ---- TRANSACTION TABLE ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 35, 45);
  doc.text("TRANSAKTIONSVERLAUF", margin, y + 5);
  y += 8;

  const typeLabels: Record<string, string> = {
    initial: "Einzahlung",
    stolen: "GESTOHLEN",
    transfer: "Transfer",
    mixer: "Mixer",
    exchange: "Börse",
    scammer: "Betrüger",
  };

  const typeColors: Record<string, [number, number, number]> = {
    initial: green,
    stolen: red,
    transfer: orange,
    mixer: purple,
    exchange: brandBlue,
    scammer: red,
  };

  const tableData = data.transactions.map((tx) => [
    tx.date.toLocaleDateString("de-DE"),
    typeLabels[tx.type] || tx.type,
    tx.fromAddress.slice(0, 8) + "..." + tx.fromAddress.slice(-4),
    tx.toAddress.slice(0, 8) + "..." + tx.toAddress.slice(-4),
    `€${tx.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    tx.label.replace("⚠️ ", ""),
  ]);

  autoTable(doc, {
    startY: y,
    head: [["Datum", "Typ", "Von", "An", "Betrag", "Beschreibung"]],
    body: tableData,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 7,
      cellPadding: 2.5,
      textColor: [50, 55, 65],
      lineColor: [230, 232, 236],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: darkBg,
      textColor: white,
      fontStyle: "bold",
      fontSize: 7.5,
    },
    alternateRowStyles: {
      fillColor: [248, 249, 252],
    },
    didParseCell: (hookData) => {
      if (hookData.section === "body" && hookData.column.index === 1) {
        const txIndex = hookData.row.index;
        const tx = data.transactions[txIndex];
        if (tx) {
          const color = typeColors[tx.type] || [50, 55, 65];
          hookData.cell.styles.textColor = color;
          hookData.cell.styles.fontStyle = "bold";
        }
      }
      if (hookData.section === "body") {
        const txIndex = hookData.row.index;
        const tx = data.transactions[txIndex];
        if (tx?.type === "stolen") {
          hookData.cell.styles.fillColor = [255, 240, 240];
          hookData.cell.styles.textColor = red;
          hookData.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  // @ts-ignore
  y = doc.lastAutoTable.finalY + 8;

  if (y > pageHeight - 60) {
    doc.addPage();
    y = 20;
  }

  // ---- DISCLAIMER ----
  doc.setFillColor(248, 249, 252);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 2, 2, "F");
  doc.setDrawColor(220, 225, 230);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 22, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(100, 105, 115);
  doc.text("HAFTUNGSAUSSCHLUSS", margin + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text(
    "Dieser Bericht wurde durch automatisierte Blockchain-Analyse erstellt und dient ausschließlich zu Informationszwecken.",
    margin + 4, y + 10, { maxWidth: pageWidth - margin * 2 - 8 }
  );
  doc.text(
    "Blockscaner übernimmt keine Garantie für die Vollständigkeit oder Richtigkeit der dargestellten Daten. Für rechtliche Schritte konsultieren Sie bitte einen Rechtsanwalt.",
    margin + 4, y + 14, { maxWidth: pageWidth - margin * 2 - 8 }
  );

  y += 28;

  // ---- FOOTER on every page ----
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);

    doc.setDrawColor(...brandBlue);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(130, 135, 145);
    doc.text("Blockscaner | Blockchain Forensik & Krypto-Rückgewinnung", margin, pageHeight - 11);
    doc.text("www.blockchain-24.com | support@blockchain-24.com", margin, pageHeight - 7);

    doc.text(`Seite ${p} von ${totalPages}`, pageWidth - margin, pageHeight - 11, { align: "right" });
    doc.text(`Ref: ${refNo}`, pageWidth - margin, pageHeight - 7, { align: "right" });
  }

  const fileName = `Blockscaner_Forensik_${data.walletAddress.slice(0, 8)}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}
