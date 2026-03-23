"use client";

import { useMemo, useState } from "react";
import styles from "./ContactForm.module.css";

const TO_EMAIL = "nychyporuk.ivan.vfx@gmail.com";

function isLikelyEmail(email: string) {
  // Intentionally simple: enough to catch obvious mistakes.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [error, setError] = useState<string>("");

  const mailto = useMemo(() => {
    const safeName = name.trim();
    const safeEmail = fromEmail.trim();
    const subjectParts = ["Website contact"];
    if (safeName) subjectParts.push(safeName);
    if (safeEmail) subjectParts.push(`<${safeEmail}>`);
    const subject = subjectParts.join("  ");
    const body = [
      safeName ? `Name: ${safeName}` : null,
      safeEmail ? `Email: ${safeEmail}` : null,
      "",
      message.trim(),
    ]
      .filter((v) => v !== null)
      .join("\n");

    return `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [fromEmail, message, name]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setError("");

        // Honeypot for basic spam reduction.
        if (hp.trim()) {
          setError("Please remove the hidden field value and try again.");
          return;
        }

        if (!isLikelyEmail(fromEmail)) {
          setError("Please enter a valid email address.");
          return;
        }

        if (message.trim().length < 10) {
          setError("Please add a bit more detail to your message.");
          return;
        }

        // No server-side sending yet: open the user's email client.
        window.location.href = mailto;
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
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-error" : undefined}
        />
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
          This form opens your email app with a pre-filled message (no data is
          stored on the website yet).
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className="button buttonPrimary">
          Send message
        </button>
        <a className="button" href={`mailto:${TO_EMAIL}`}>
          Email directly
        </a>
      </div>
    </form>
  );
}
