import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "nychyporuk.ivan.vfx@gmail.com";
const FROM_EMAIL = "contact@ivan-nychyporuk.me";

export async function POST(req: NextRequest) {
  const { name, email, message, honeypot } = await req.json();

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (!message || message.trim().length < 10) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email.trim(),
    subject: name?.trim()
      ? `Website contact from ${name.trim()}`
      : "Website contact",
    text: [
      name?.trim() ? `Name: ${name.trim()}` : null,
      `Email: ${email.trim()}`,
      "",
      message.trim(),
    ]
      .filter((v) => v !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
