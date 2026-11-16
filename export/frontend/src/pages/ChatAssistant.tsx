import { t as _t, lang } from "@/i18n";
import { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Bot, Send, Shield, CheckCircle, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string; timestamp: Date };

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const CHAT_URL = `${BACKEND}/api/functions/chat-victim`;

function formatTime(date: Date) {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: Msg[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lang, messages: messages.map(m => ({ role: m.role, content: m.content })) }),
  });

  if (!resp.ok || !resp.body) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData.error || _t("Stream fehlgeschlagen"));
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { streamDone = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const TypingIndicator = () => (
  <div className="flex items-end gap-2.5">
    <Avatar className="h-8 w-8 border border-primary/30">
      <AvatarFallback className="bg-primary/10 text-primary">
        <Bot className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
    <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex gap-1.5 items-center">
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const ChatBubble = ({ msg }: { msg: Msg }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className={`h-8 w-8 shrink-0 border ${isUser ? "border-primary/50" : "border-primary/30"}`}>
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-card border border-border text-foreground rounded-bl-sm"
          }`}
        >
          {!isUser ? (
            <div className="prose prose-sm prose-invert max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0">
              <ReactMarkdown>{msg.content.replace(/\[FORM_COMPLETE\].*/s, "")}</ReactMarkdown>
            </div>
          ) : (
            msg.content
          )}
        </div>
        <span className="text-[10px] text-muted-foreground/60 mt-1 px-1">{formatTime(msg.timestamp)}</span>
      </div>
    </div>
  );
};

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasGreeted = useRef(false);
  const sessionIdRef = useRef<string | null>(null);
  const messagesRef = useRef<Msg[]>([]);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep messagesRef in sync
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Create session on mount
  useEffect(() => {
    const createSession = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_sessions")
          .insert({ messages: [], status: "active" })
          .select("id")
          .single();
        if (!error && data) {
          sessionIdRef.current = data.id;
        }
      } catch (e) {
        console.error("Failed to create chat session:", e);
      }
    };
    createSession();
  }, []);

  // Save messages to session (debounced)
  const saveSession = useCallback(async (status: string = "active", collectedData: any = null) => {
    if (!sessionIdRef.current) return;
    const msgsToSave = messagesRef.current.map(m => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp.toISOString(),
    }));
    try {
      const updatePayload: any = {
        messages: msgsToSave,
        updated_at: new Date().toISOString(),
        status,
      };
      if (collectedData) {
        updatePayload.collected_data = collectedData;
      }
      await supabase
        .from("chat_sessions")
        .update(updatePayload)
        .eq("id", sessionIdRef.current);
    } catch (e) {
      console.error("Failed to save session:", e);
    }
  }, []);

  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => saveSession("active"), 2000);
  }, [saveSession]);

  // Save on every message change
  useEffect(() => {
    if (messages.length > 0) {
      debouncedSave();
    }
  }, [messages, debouncedSave]);

  // Save + notify on page leave (abandoned)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formSubmitted || messagesRef.current.length <= 1) return;
      if (!sessionIdRef.current) return;

      // Use sendBeacon for reliable delivery on page close
      const msgsToSave = messagesRef.current.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      }));

      const url = `${BACKEND}/api/functions/notify-lead`;
      const payload = JSON.stringify({
        type: "abandoned_chat",
        session_id: sessionIdRef.current,
        messages: msgsToSave,
      });

      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));

      // Also update session status
      const updateUrl = `${BACKEND}/api/rest/chat_sessions?id=eq.${sessionIdRef.current}`;
      navigator.sendBeacon(
        updateUrl,
        new Blob([JSON.stringify({ status: "abandoned", messages: msgsToSave, updated_at: new Date().toISOString() })], {
          type: "application/json",
        })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !formSubmitted && messagesRef.current.length > 1) {
        saveSession("active");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [formSubmitted, saveSession]);

  // Initial greeting
  useEffect(() => {
    if (hasGreeted.current) return;
    hasGreeted.current = true;
    setIsLoading(true);
    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar, timestamp: new Date() }];
      });
    };
    streamChat({
      messages: [{ role: "user", content: _t("Hallo, ich brauche Hilfe."), timestamp: new Date() }],
      onDelta: upsert,
      onDone: () => setIsLoading(false),
    }).catch(() => {
      setMessages([{ role: "assistant", content: _t("Willkommen! Ich bin Ihr Assistent für Krypto-Betrugsfälle. Wie kann ich Ihnen helfen? Bitte erzählen Sie mir zunächst Ihren Vornamen und Nachnamen."), timestamp: new Date() }]);
      setIsLoading(false);
    });
  }, []);

  const checkForFormComplete = async (fullContent: string) => {
    const marker = "[FORM_COMPLETE]";
    const idx = fullContent.indexOf(marker);
    if (idx === -1) return;

    try {
      const jsonStr = fullContent.slice(idx + marker.length).trim();
      const data = JSON.parse(jsonStr);

      const { error: dbError } = await supabase.from("leads").insert({
        vorname: data.vorname || "",
        nachname: data.nachname || "",
        email: data.email || "",
        telefon: data.telefon || "",
        betrugsart: data.betrugsart || "",
        kryptowaehrung: data.kryptowaehrung || "",
        verlorener_betrag: data.verlorener_betrag || "",
        wann: data.wann || "",
        plattform: data.plattform || "",
        wallet_adresse: data.wallet_adresse || null,
        polizeibericht: data.polizeibericht || "",
        beschreibung: data.beschreibung || "",
      });

      if (dbError) throw dbError;

      // Save session as completed
      await saveSession("completed", data);

      // Send full notification with conversation
      const msgsToSave = messagesRef.current.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      }));

      await supabase.functions.invoke("notify-lead", {
        body: { ...data, type: "completed", messages: msgsToSave },
      });

      setFormSubmitted(true);
      toast.success(_t("Ihre Falldaten wurden erfolgreich gespeichert!"));
    } catch (err) {
      console.error("Error saving form:", err);
      toast.error("Fehler beim Speichern. Bitte versuchen Sie das Kontaktformular.");
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text, timestamp: new Date() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar, timestamp: new Date() }];
      });
    };

    try {
      await streamChat({
        messages: allMessages,
        onDelta: upsert,
        onDone: () => {
          setIsLoading(false);
          checkForFormComplete(assistantSoFar);
        },
      });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || _t("Verbindungsfehler"));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <Helmet>
        <title>{_t("KI-Betrugsassistent – Krypto-Fall dokumentieren | Blockscaner")}</title>
        <meta name="description" content="Dokumentieren Sie Ihren Krypto-Betrugsfall mit unserem deutschsprachigen KI-Assistenten. Schnell, sicher und vertraulich." />
        <link rel="canonical" href="https://blockchain-24.com/chat" />
        <meta property="og:title" content="KI-Betrugsassistent – Krypto-Fall dokumentieren" />
        <meta property="og:description" content="Dokumentieren Sie Ihren Krypto-Betrugsfall mit unserem deutschsprachigen KI-Assistenten." />
        <meta property="og:url" content="https://blockchain-24.com/chat" />
      </Helmet>
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">{_t("Zurück zur Startseite")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-5 w-5 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-card" />
            </div>
            <span className="font-display font-semibold text-foreground">{_t("Betrugs-Assistent")}</span>
            <span className="text-xs text-green-500 font-medium">{_t("Online")}</span>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6">
        {/* Bot avatar + title */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 mb-3 relative">
            <Bot className="h-8 w-8 text-primary" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">{_t("KI-Betrugsassistent")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{_t("Ich helfe Ihnen, Ihren Fall schnell und sicher zu dokumentieren")}</p>
        </div>

        {formSubmitted && (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
            <div className="rounded-full bg-primary/10 p-5 mb-4">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">{_t("Fall erfolgreich erfasst!")}</h2>
            <p className="text-muted-foreground max-w-md">{_t("Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.")}</p>
            <Link to="/" className="mt-4 text-primary hover:underline text-sm">{_t("Zurück zur Startseite")}</Link>
          </div>
        )}

        {!formSubmitted && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 min-h-0 mb-4" ref={scrollRef}>
              <div className="space-y-5 pr-2">
                {messages.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <TypingIndicator />
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={_t("Ihre Nachricht eingeben...")}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
              />
              <Button onClick={send} disabled={isLoading || !input.trim()} size="icon" className="shrink-0 rounded-lg">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/60 text-center mt-2">
              {_t("🔒 Alle Daten werden verschlüsselt und vertraulich behandelt.")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;
