"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message || "Message sent!",
        });
        setForm({ email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
      }
    } catch {
      setStatus({ type: "error", message: "Failed to send message." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className={`group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Send us a message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            className="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Your email address"
          />
          <input
            type="text"
            required
            className="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            placeholder="Subject line"
          />
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 text-sm border border-border/50 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Your message..."
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm hover:shadow-md transition-all duration-300 h-9 text-sm"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
          {status && (
            <div
              className={`text-center text-xs mt-2 ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {status.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
