import { ArrowUpRight, AudioLines, HeartHandshake, RadioTower, Sparkles } from "lucide-react";
import Link from "next/link";

const moods = ["DJ-СЕТИ", "МІКСИ", "НОВІ ВІДКРИТТЯ", "НІЧНИЙ ВАЙБ"];

export function StationExperience() {
  return (
    <section className="section station-experience" aria-labelledby="experience-heading">
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker"><Sparkles size={15} aria-hidden="true" /> БІЛЬШЕ, НІЖ ПЛЕЄР</div>
            <h2 id="experience-heading">ТВОЯ НІЧ. <span>ТВОЯ ЧАСТОТА.</span></h2>
          </div>
          <p className="section-aside">Місце для музики, яку хочеться не просто почути, а залишити увімкненою.</p>
        </div>

        <div className="experience-grid">
          <article className="experience-card experience-card--lead">
            <div className="experience-card__symbol"><AudioLines size={30} aria-hidden="true" /></div>
            <p>ФОРМАТ ЕФІРУ</p>
            <h3>Ритм без зайвого шуму.</h3>
            <span>Музика, DJ-енергія та настрій, що тримає темп від першої ноти до ранку.</span>
            <div className="mood-tags">{moods.map((mood) => <b key={mood}>{mood}</b>)}</div>
          </article>

          <article className="experience-card experience-card--signal">
            <RadioTower size={22} aria-hidden="true" />
            <p>СИГНАЛ</p>
            <strong>24<span>/7</span></strong>
            <small>МУЗИКА У ПРЯМОМУ ЕФІРІ</small>
            <i className="signal-bars" aria-hidden="true"><u /><u /><u /><u /><u /><u /><u /></i>
          </article>

          <Link className="experience-card experience-card--listen" href="/radio">
            <span className="experience-card__arrow"><ArrowUpRight size={21} aria-hidden="true" /></span>
            <p>ЗАРАЗ В ЕФІРІ</p>
            <h3>Підключайся до хвилі.</h3>
            <span>Офіційний плеєр Caster.fm, поточний трек та статус трансляції — в одному місці.</span>
          </Link>

          <Link className="experience-card experience-card--request" href="/contact#request-heading">
            <HeartHandshake size={25} aria-hidden="true" />
            <p>ТВІЙ ВИБІР</p>
            <h3>Є трек для цієї ночі?</h3>
            <span>Надішли ідею в месенджер, SMS або пошту прямо зі свого телефона.</span>
            <b>ЗАМОВИТИ ТРЕК <ArrowUpRight size={15} aria-hidden="true" /></b>
          </Link>
        </div>
      </div>
    </section>
  );
}
