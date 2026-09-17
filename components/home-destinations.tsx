import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Headphones, MessageCircleMore, Waves } from "lucide-react";

const destinations = [
  { href: "/radio", label: "ЕФІР", title: "Слухати наживо", copy: "Офіційний player Caster.fm та статус трансляції.", icon: Headphones, tone: "blue" },
  { href: "/schedule", label: "ТАЙМІНГ", title: "Плануй свій вечір", copy: "Щотижневий розклад DJ-сетів і нічних ефірів.", icon: CalendarDays, tone: "violet" },
  { href: "/history", label: "МУЗИЧНИЙ СЛІД", title: "Що звучало", copy: "Останні треки з ефіру, щойно метадані стануть доступні.", icon: Waves, tone: "pink" },
  { href: "/contact", label: "НА ЗВ’ЯЗКУ", title: "Замовити трек", copy: "Надішліть ідею для наступного нічного сигналу.", icon: MessageCircleMore, tone: "green" },
];

export function HomeDestinations() {
  return (
    <section className="section home-destinations" aria-labelledby="explore-heading">
      <div className="shell">
        <div className="section-heading-row">
          <div><div className="section-kicker"><Clock3 size={15} aria-hidden="true" /> НАВІГАЦІЯ ПО ЕФІРУ</div><h2 id="explore-heading">ОБЕРИ <span>СВІЙ РИТМ</span></h2></div>
          <p className="section-aside">Кожен розділ має свій настрій — як окремий трек одного нічного сету.</p>
        </div>
        <div className="destination-grid">
          {destinations.map(({ href, label, title, copy, icon: Icon, tone }) => (
            <Link className={`destination-card destination-card--${tone}`} href={href} key={href}>
              <Icon className="destination-card__icon" size={28} aria-hidden="true" />
              <p>{label}</p><h3>{title}</h3><span>{copy}</span>
              <b>ВІДКРИТИ <ChevronRight size={16} aria-hidden="true" /></b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
