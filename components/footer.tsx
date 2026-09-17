import { Radio } from "lucide-react";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-content">
        <div className="footer-brand"><Radio size={19} aria-hidden="true" /><strong>DJ_SKY_STYLE RADIO</strong><span>ОНЛАЙН-РАДІО • МУЗИКА • DJ • ВАЙБ</span></div>
        <SocialLinks compact />
        <p>© 2026 DJ_SKY_STYLE RADIO</p>
      </div>
    </footer>
  );
}
