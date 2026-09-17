import { AtSign, Instagram, Send } from "lucide-react";
import { stationContent } from "@/config/content";
import { contactDetails } from "@/config/socials";
import { SocialLinks } from "@/components/social-links";

export function AboutSection() {
  return (
    <section className="section about-section" aria-labelledby="about-heading">
      <div className="shell about-grid about-grid--single">
        <div className="about-card">
          <div className="section-kicker">ПРО СТАНЦІЮ</div>
          <h2 id="about-heading">ПРО <span>DJ_SKY_STYLE RADIO</span></h2>
          <p>{stationContent.about}</p>
          <div className="about-stat"><strong>24/7</strong><span>Музика • DJ • Вайб</span></div>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}

export function ContactSection() {
  const contacts = [
    { label: "Електронна пошта", value: contactDetails.email, icon: AtSign, href: contactDetails.email ? `mailto:${contactDetails.email}` : "" },
    { label: "Telegram", value: contactDetails.telegram, icon: Send, href: contactDetails.telegram },
    { label: "Instagram", value: contactDetails.instagram, icon: Instagram, href: contactDetails.instagram },
  ].filter((contact) => contact.value);

  return (
    <section className="section contact-section" aria-labelledby="contact-heading">
      <div className="shell contact-panel">
        <div><div className="section-kicker">НАПИШІТЬ НАМ</div><h2 id="contact-heading">КОНТАКТИ</h2></div>
        {contacts.length ? (
          <div className="contact-links">
            {contacts.map(({ label, value, icon: Icon, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                <Icon size={17} aria-hidden="true" /><span>{label}</span><strong>{value}</strong>
              </a>
            ))}
          </div>
        ) : <p className="config-note">Додайте email, Telegram та Instagram у <code>config/socials.ts</code>.</p>}
      </div>
    </section>
  );
}
