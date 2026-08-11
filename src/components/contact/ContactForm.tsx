"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact form UI. This demo handles submission locally (no backend) and
 * shows a confirmation — wire it to an email/API endpoint when one exists.
 */

/**
 * How long the pending state is held. There is nothing to wait for yet, and
 * the honest reason for the delay is that a confirmation which appears on the
 * same frame as the click reads as a validation error rather than as a result.
 *
 * When a real endpoint lands, this timeout is the only thing that changes:
 * `send()` becomes the request and the states around it already exist.
 */
const FAKE_SEND_MS = 700;

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Nothing should land in state after the form is gone from the page.
  useEffect(() => () => clearTimeout(timer.current), []);

  if (status === "sent") {
    return (
      <div
        className="panel flex flex-col items-center justify-center rounded-2xl border p-10 text-center"
        /*
          The form is replaced rather than annotated, so nothing about the
          confirmation is announced on its own. This makes the swap a live
          region update instead of a silent one.
        */
        role="status"
      >
        <DrawnCheck />
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
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (sending) return;
        setStatus("sending");
        timer.current = setTimeout(() => setStatus("sent"), FAKE_SEND_MS);
      }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/*
            `autoComplete` lets the browser fill these from the visitor's saved
            profile — one tap instead of two typed fields on a phone. Without it
            Chrome flags the form and offers nothing.
          */}
          <Field id="name" label="Name">
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Ash Ketchum"
            />
          </Field>
          <Field id="email" label="Email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
        <Button
          type="submit"
          size="lg"
          disabled={sending}
          aria-busy={sending}
          className="w-full font-semibold sm:w-fit"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/**
 * The confirmation mark, drawn rather than shown.
 *
 * A static tick is a state; a tick that draws is an event, and that difference
 * is what makes this read as the form having completed rather than as the page
 * having swapped. The ring goes round first and the stroke follows it, in the
 * order a hand would make the mark.
 *
 * Drawn with dash offsets in CSS (`.draw-ring` / `.draw-tick` in `globals.css`)
 * rather than motion's `pathLength`. Both work; CSS wins here because this is
 * the only animation in the component, and doing it in the sheet means the
 * confirmation needs no animation runtime and picks up the reduced-motion rule
 * the rest of the file already carries instead of re-deriving it in JS.
 */
function DrawnCheck() {
  return (
    <svg
      viewBox="0 0 52 52"
      aria-hidden
      className="size-14 text-brand"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        className="draw-ring"
        cx="26"
        cy="26"
        r="23"
        strokeWidth="2"
        opacity="0.55"
      />
      <path
        className="draw-tick"
        d="M15.5 26.5 L22.5 33.5 L36.5 19"
        strokeWidth="3.2"
      />
    </svg>
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
