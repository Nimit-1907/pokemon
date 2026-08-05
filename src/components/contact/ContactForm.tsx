"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact form UI. This demo handles submission locally (no backend) and
 * shows a confirmation — wire it to an email/API endpoint when one exists.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="glow-ring flex flex-col items-center justify-center rounded-2xl border p-10 text-center">
        <CheckCircle2 className="size-12 text-brand" />
        <h3 className="mt-4 font-display text-h2 font-bold uppercase text-foreground">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-body-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </p>
        <Button
          variant="outline"
          className="mt-6 hover:text-brand"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Name">
            <Input id="name" name="name" required placeholder="Ash Ketchum" />
          </Field>
          <Field id="email" label="Email">
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </Field>
        </div>
        <Field id="subject" label="Subject">
          <Input
            id="subject"
            name="subject"
            required
            placeholder="How can we help?"
          />
        </Field>
        <Field id="message" label="Message">
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you're looking for…"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full font-semibold sm:w-fit">
          <Send className="size-4" />
          Send Message
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
