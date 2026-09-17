import { ExternalLink, Send } from "lucide-react";
import { socialLinks, telegramUrl } from "@/config/socials";

type SocialLinksProps = { compact?: boolean };

export function SocialLinks({ compact = false }: SocialLinksProps) {
  const links = socialLinks.filter((link) => link.href.trim());
  if (compact && links.length === 0) return null;

  return (
    <div className={compact ? "social-links social-links--compact" : "social-area"}>
      {!compact ? (
        <>
          <div className="section-kicker">БУДЬТЕ НА ЗВ’ЯЗКУ</div>
          <h2>СЛІДКУЙ ЗА <span>DJ_SKY_STYLE</span></h2>
          <p>Нові сети, релізи та нічні сигнали — у каналах, якими ви користуєтеся.</p>
        </>
      ) : null}
      {links.length ? (
        <div className="social-links">
          {links.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Слідкувати за DJ_SKY_STYLE у ${label}`}>
              <Icon size={compact ? 17 : 19} aria-hidden="true" />
              {!compact ? <span>{label}</span> : null}
              {!compact ? <ExternalLink size={14} aria-hidden="true" /> : null}
            </a>
          ))}
        </div>
      ) : !compact ? <p className="config-note">Додайте посилання на соцмережі у <code>config/socials.ts</code>, щоб показати кнопки.</p> : null}
      {telegramUrl ? (
        <a className="button button--telegram" href={telegramUrl} target="_blank" rel="noreferrer"><Send size={18} aria-hidden="true" /> ДОЛУЧИТИСЯ ДО TELEGRAM</a>
      ) : null}
    </div>
  );
}
