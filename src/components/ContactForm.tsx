"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

const TO_EMAIL = "nychyporuk.ivan.vfx@gmail.com";
const MESSAGE_MAX = 2000;

function isLikelyEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [error, setError] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={styles.form}>
        <p className={styles.note}>
          Message sent — thank you! I will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");

        if (hp.trim()) return;

        if (!isLikelyEmail(fromEmail)) {
          setError("Please enter a valid email address.");
          return;
        }

        if (message.trim().length < 10) {
          setError("Please add a bit more detail to your message.");
          return;
        }

        if (message.length > MESSAGE_MAX) {
          setError(`Message is too long. Please keep it under ${MESSAGE_MAX} characters.`);
          return;
        }

        setSending(true);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email: fromEmail, message, honeypot: hp }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || "Something went wrong. Please try again.");
          } else {
            setSent(true);
          }
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setSending(false);
        }
      }}
      noValidate
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">
            Name (optional)
          </label>
          <input
            id="contact-name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">
            Your email
          </label>
          <input
            id="contact-email"
            className={styles.input}
            type="email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            onBlur={() => {
              if (!fromEmail) return;
              setError(isLikelyEmail(fromEmail) ? "" : "Please enter a valid email address.");
            }}
            autoComplete="email"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "contact-error" : undefined}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MESSAGE_MAX}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-error" : undefined}
        />
        <p className={`${styles.counter} ${message.length > MESSAGE_MAX * 0.9 ? styles.counterWarn : ""}`}>
          {message.length} / {MESSAGE_MAX}
        </p>
      </div>

      <div className={styles.hidden} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error ? (
        <p id="contact-error" className={styles.error}>
          {error}
        </p>
      ) : (
        <p className={styles.note}>
          Your message will be sent directly to my inbox.
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className="button buttonPrimary" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
        <a className="button" href={`mailto:${TO_EMAIL}`}>
          Email directly
        </a>
      </div>
    </form>
  );
}
