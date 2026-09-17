import { CalendarDays } from "lucide-react";
import { schedule } from "@/data/schedule";

export function Schedule() {
  return (
    <section id="schedule" className="section schedule-section" aria-labelledby="schedule-heading">
      <div className="shell">
        <div className="section-kicker">ЦЬОГО ТИЖНЯ В ЕФІРІ</div>
        <div className="section-heading-row">
          <h2 id="schedule-heading">РОЗКЛАД <span>ЕФІРУ</span></h2>
          <CalendarDays className="section-symbol" size={28} aria-hidden="true" />
        </div>
        <div className="schedule-grid">
          {schedule.map((item, index) => (
            <article className={`schedule-card ${index === 0 ? "schedule-card--featured" : ""}`} key={item.day}>
              <h3>{item.day}</h3>
              <div>
                {item.shows.map((show) => (
                  <p key={`${show.time}-${show.title}`}><time>{show.time}</time><span>{show.title}</span></p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
