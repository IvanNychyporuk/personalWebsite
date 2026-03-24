import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import styles from "../content.module.css";

const CONTROLLER_NAME = "Ivan Nychyporuk";
const ADDRESS_LINES = ["Zurmaiener Strasse 128", "54292 Trier", "Germany"];
const EMAIL = "nychyporuk.ivan.vfx@gmail.com";

function ContentDE() {
  return (
    <>
      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Verantwortlicher</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          {CONTROLLER_NAME}<br />
          Zurmaiener Straße 128<br />
          54292 Trier<br />
          Deutschland<br />
          E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>1. Überblick</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Diese Website ist ein persönliches Portfolio und eine Präsentation meiner
          Beratungsleistungen. Der Schutz Ihrer personenbezogenen Daten ist mir wichtig.
          Diese Datenschutzerklärung informiert Sie darüber, welche Daten erhoben werden,
          wie sie verwendet werden und welche Rechte Ihnen zustehen.
        </p>
        <p className={styles.lead}>
          Diese Website verwendet <strong>keine Cookies, kein Tracking und keine
          Analysetools</strong>. Es werden keine Nutzerprofile erstellt und keine Daten
          an Werbenetzwerke weitergegeben.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>2. Hosting (Vercel)</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 900, San Francisco,
          CA 94104, USA gehostet. Beim Aufruf dieser Website verarbeitet Vercel automatisch
          Server-Logdaten, darunter IP-Adressen, Browsertyp, aufgerufene Seiten und
          Zeitstempel. Diese Daten sind technisch für den Betrieb der Website erforderlich.
        </p>
        <p className={styles.lead}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
          sicheren und stabilen Websitebetrieb). Vercel handelt als Auftragsverarbeiter auf
          Grundlage eines Auftragsverarbeitungsvertrags. Datenübermittlungen in die USA
          erfolgen auf Grundlage des EU-US Data Privacy Framework.
        </p>
        <p className={styles.lead}>
          Weitere Informationen:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
            vercel.com/legal/privacy-policy
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>3. Kontaktformular</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Wenn Sie das Kontaktformular nutzen, werden Ihr Name, Ihre E-Mail-Adresse und der
          Nachrichteninhalt erhoben und über den E-Mail-Dienst Resend (Resend Inc., USA)
          an mein Postfach weitergeleitet. Diese Daten werden ausschließlich zur Bearbeitung
          Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
        </p>
        <p className={styles.lead}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Bearbeitung eingehender Anfragen) bzw. Art. 6 Abs. 1 lit. b DSGVO bei
          vorvertraglichen Anfragen. Die Daten werden gelöscht, sobald Ihre Anfrage
          abschließend bearbeitet wurde und keine weitere Kommunikation zu erwarten ist,
          sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>4. KI-Assistent</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Der Bereich „KI-Assistent" bindet eine Chatbot-Anwendung ein, die auf Google
          Gemini (Google LLC, USA) basiert. Wenn Sie den Chatbot nutzen, werden Ihre Eingaben
          von Googles KI-Diensten verarbeitet. Ich speichere keine Chatbot-Konversationen selbst.
        </p>
        <p className={styles.lead}>
          Bitte beachten Sie Googles Datenschutzerklärung:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            policies.google.com/privacy
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>5. Ihre Rechte (Art. 15–22 DSGVO)</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Sie haben das Recht auf:
        </p>
        <ul className={styles.list}>
          <li>Auskunft über die gespeicherten Daten (Art. 15)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16)</li>
          <li>Löschung Ihrer Daten – „Recht auf Vergessenwerden" (Art. 17)</li>
          <li>Einschränkung der Verarbeitung (Art. 18)</li>
          <li>Datenübertragbarkeit (Art. 20)</li>
          <li>Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen (Art. 21)</li>
          <li>Beschwerde bei einer Datenschutzaufsichtsbehörde (Art. 77)</li>
        </ul>
        <p className={styles.lead}>
          <strong>So können Sie Ihre Rechte ausüben:</strong> Senden Sie eine E-Mail an{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Die einzigen personenbezogenen Daten,
          die diese Website über Sie speichern kann, sind Inhalte einer Kontaktformular-Einsendung
          (Name, E-Mail-Adresse und Nachricht). Auf eine verifizierte Anfrage hin bestätige
          ich, welche Daten ich besitze, und/oder lösche diese innerhalb von 30 Tagen aus
          meinem Postfach. Server-Logdaten (IP-Adressen) werden von Vercel verarbeitet und
          automatisch gelöscht – wenden Sie sich für Anfragen zu Logdaten direkt an Vercel.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Zuständige Aufsichtsbehörde</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          Rheinland-Pfalz<br />
          Hintere Bleiche 34, 55116 Mainz<br />
          <a href="https://www.datenschutz.rlp.de" target="_blank" rel="noreferrer">
            www.datenschutz.rlp.de
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>6. Rechtsgrundlagen im Überblick</h2>
        <ul className={styles.list}>
          <li>Hosting / Server-Logs: Art. 6 Abs. 1 lit. f DSGVO</li>
          <li>Kontaktformular: Art. 6 Abs. 1 lit. f bzw. lit. b DSGVO</li>
        </ul>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>7. Änderungen dieser Erklärung</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          Diese Datenschutzerklärung wird bei Bedarf aktualisiert. Die jeweils aktuelle
          Fassung ist stets unter dieser URL abrufbar.
        </p>
      </section>
    </>
  );
}

function ContentEN() {
  return (
    <>
      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Controller</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          {CONTROLLER_NAME}<br />
          {ADDRESS_LINES.map((l) => (
            <span key={l}>{l}<br /></span>
          ))}
          Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>1. Overview</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          This website is a personal portfolio and consultant presentation. The protection
          of your personal data is important to me. This policy explains what data is
          collected, how it is used, and your rights under the GDPR.
        </p>
        <p className={styles.lead}>
          This website uses <strong>no cookies, no tracking, and no analytics tools</strong>.
          No user profiles are created and no data is shared with advertising networks.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>2. Hosting (Vercel)</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          This website is hosted by Vercel Inc., 340 Pine Street, Suite 900, San Francisco,
          CA 94104, USA. When you visit this website, Vercel automatically processes server
          log data including IP addresses, browser type, pages accessed, and timestamps.
          This data is technically necessary for operating the website.
        </p>
        <p className={styles.lead}>
          Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure and stable website
          operation). Vercel acts as a data processor under a Data Processing Agreement.
          Data transfers to the USA are covered by the EU–US Data Privacy Framework.
        </p>
        <p className={styles.lead}>
          More information:{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
            vercel.com/legal/privacy-policy
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>3. Contact Form</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          When you submit the contact form, your name, email address, and message are
          collected and forwarded to my inbox via Resend (Resend Inc., USA). This data is
          used solely to respond to your inquiry and is not shared with third parties.
        </p>
        <p className={styles.lead}>
          Legal basis: Art. 6(1)(f) GDPR (legitimate interest in processing incoming
          inquiries) or Art. 6(1)(b) GDPR where the inquiry relates to pre-contractual
          steps. Data is deleted once your inquiry has been fully resolved and no further
          communication is expected, unless statutory retention obligations apply.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>4. AI Assistant</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          The AI Assistant section embeds a chatbot application powered by Google Gemini
          (Google LLC, USA). When you use the chatbot, your inputs are processed by
          Google's AI services. I do not store chatbot conversations myself.
        </p>
        <p className={styles.lead}>
          Please refer to Google's Privacy Policy:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            policies.google.com/privacy
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>5. Your Rights (GDPR Art. 15–22)</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>You have the right to:</p>
        <ul className={styles.list}>
          <li>Access the personal data held about you (Art. 15)</li>
          <li>Rectification of inaccurate data (Art. 16)</li>
          <li>Erasure of your data – "right to be forgotten" (Art. 17)</li>
          <li>Restriction of processing (Art. 18)</li>
          <li>Data portability (Art. 20)</li>
          <li>Object to processing based on legitimate interests (Art. 21)</li>
          <li>Lodge a complaint with a supervisory authority (Art. 77)</li>
        </ul>
        <p className={styles.lead}>
          <strong>How to exercise your rights:</strong> Send an email to{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. The only personal data this
          website may hold about you is the content of a contact form submission
          (your name, email, and message). Upon a verified request, I will
          confirm what data I hold and/or delete it from my inbox within 30 days.
          Server log data (IP addresses) is processed and automatically rotated
          by Vercel — contact Vercel directly for log-level requests.
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>Supervisory Authority</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          The competent supervisory authority for Rhineland-Palatinate is:<br />
          Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          Rheinland-Pfalz<br />
          Hintere Bleiche 34, 55116 Mainz<br />
          <a href="https://www.datenschutz.rlp.de" target="_blank" rel="noreferrer">
            www.datenschutz.rlp.de
          </a>
        </p>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>6. Legal Bases Summary</h2>
        <ul className={styles.list}>
          <li>Hosting / server logs: Art. 6(1)(f) GDPR</li>
          <li>Contact form: Art. 6(1)(f) or Art. 6(1)(b) GDPR</li>
        </ul>
      </section>

      <section className={`card ${styles.block}`}>
        <h2 className={styles.blockTitle}>7. Changes to this Policy</h2>
        <p className={styles.lead} style={{ marginTop: 0 }}>
          This policy may be updated as the website evolves. The current version is always
          available at this URL.
        </p>
      </section>
    </>
  );
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolved = await Promise.resolve(params);
  const locale = resolved.locale;
  if (!isLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className="kicker">{dict.privacy.title}</p>
          <h1 className={styles.title}>{dict.privacy.title}</h1>
          <p className={styles.lead}>
            {locale === "de"
              ? "Datenschutzerklärung gemäß DSGVO und TDDDG."
              : "Privacy policy in accordance with GDPR and TDDDG."}
          </p>
        </header>

        {locale === "de" ? <ContentDE /> : <ContentEN />}
      </div>
    </main>
  );
}
