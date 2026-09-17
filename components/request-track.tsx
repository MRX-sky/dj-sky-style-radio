"use client";

import { Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { radioConfig } from "@/config/radio";

type FormStatus = "idle" | "sending" | "sent" | "unconfigured" | "error";

export function RequestTrack() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!radioConfig.requestTrackEndpoint) {
      setStatus("unconfigured");
      setMessage("Запити ще не налаштовані. Додайте endpoint до NEXT_PUBLIC_REQUEST_TRACK_ENDPOINT.");
      return;
    }

    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());

    try {
      const response = await fetch(radioConfig.requestTrackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Endpoint запитів повернув помилку");
      event.currentTarget.reset();
      setStatus("sent");
      setMessage("Ваш запит надіслано.");
    } catch {
      setStatus("error");
      setMessage("Не вдалося надіслати запит. Спробуйте ще раз пізніше.");
    }
  }

  return (
    <section className="section request-section" aria-labelledby="request-heading">
      <div className="shell request-layout">
        <div className="request-copy">
          <div className="section-kicker">ДОДАЙТЕ СВІЙ РИТМ</div>
          <h2 id="request-heading">ЗАМОВИТИ <span>ТРЕК</span></h2>
          <p>Надішліть музичну ідею для майбутнього ефіру DJ_SKY_STYLE RADIO.</p>
          <div className="request-assurance"><ShieldCheck size={19} aria-hidden="true" /> Запит буде надіслано лише після підключення вашого endpoint.</div>
        </div>
        <form className="request-form" onSubmit={handleSubmit}>
          <label>Ваше ім’я<input name="name" autoComplete="name" required /></label>
          <label>Виконавець<input name="artist" required /></label>
          <label>Трек<input name="track" required /></label>
          <label className="request-form__message">Повідомлення<textarea name="message" rows={3} /></label>
          <button className="button button--primary" type="submit" disabled={status === "sending"}>
            <Send size={17} aria-hidden="true" /> {status === "sending" ? "НАДСИЛАЄМО…" : "НАДІСЛАТИ ЗАПИТ"}
          </button>
          {message ? <p className={`form-message form-message--${status}`} role="status">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
