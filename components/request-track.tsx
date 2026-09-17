"use client";

import { Copy, Mail, MessageCircle, Send, Share2, ShieldCheck, Smartphone } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { radioConfig } from "@/config/radio";
import { requestLinksConfig } from "@/config/request-links";

type FormStatus = "idle" | "sending" | "sent" | "unconfigured" | "error";
type RequestData = { name: string; artist: string; track: string; message: string };
const emptyRequest: RequestData = { name: "", artist: "", track: "", message: "" };

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function messageFor(request: RequestData) {
  return [
    "Привіт! Хочу замовити трек на DJ_SKY_STYLE RADIO.",
    `Виконавець: ${request.artist || "—"}`,
    `Трек: ${request.track || "—"}`,
    request.name ? `Від слухача: ${request.name}` : "",
    request.message ? `Коментар: ${request.message}` : "",
  ].filter(Boolean).join("\n");
}

export function RequestTrack() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [request, setRequest] = useState<RequestData>(emptyRequest);
  const text = useMemo(() => messageFor(request), [request]);
  const phone = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const setField = (field: keyof RequestData, value: string) => {
    setRequest((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  };

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("sent");
      setMessage("Текст запиту скопійовано. Вставте його у зручний чат.");
    } catch {
      setStatus("error");
      setMessage("Не вдалося скопіювати текст. Виділіть його у формі вручну.");
    }
  }

  async function shareRequest() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Замовлення треку — DJ_SKY_STYLE RADIO", text, url: radioConfig.requestShareUrl || undefined });
        setStatus("sent");
        setMessage("Відкрито меню програм. Виберіть месенджер і надішліть запит.");
      } catch {
        // Closing the native sharing dialog is not an error for a listener.
      }
      return;
    }
    await copyRequest();
  }

  async function openTelegram() {
    await copyRequest();
    const username = requestLinksConfig.telegramUsername.replace(/^@/, "");
    window.open(`https://t.me/${username}`, "_blank", "noopener,noreferrer");
  }

  function openLink(url: string) {
    window.location.assign(url);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!request.artist.trim() || !request.track.trim()) return;

    if (!radioConfig.requestTrackEndpoint) {
      await shareRequest();
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(radioConfig.requestTrackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error("Endpoint запитів повернув помилку");
      setRequest(emptyRequest);
      setStatus("sent");
      setMessage("Ваш запит надіслано до редакції.");
    } catch {
      setStatus("error");
      setMessage("Не вдалося надіслати запит. Скористайтеся кнопкою месенджера нижче.");
    }
  }

  const whatsapp = digits(requestLinksConfig.whatsappPhone);
  const viber = digits(requestLinksConfig.viberPhone);
  const sms = digits(requestLinksConfig.smsPhone);
  const email = requestLinksConfig.email.trim();
  const hasDirectApps = Boolean(requestLinksConfig.telegramUsername || whatsapp || viber || sms || email);

  return (
    <section className="section request-section" aria-labelledby="request-heading">
      <div className="shell request-layout">
        <div className="request-copy">
          <div className="section-kicker">ДОДАЙТЕ СВІЙ РИТМ</div>
          <h2 id="request-heading">ЗАМОВИТИ <span>ТРЕК</span></h2>
          <p>Напишіть, що хочете почути. На телефоні форма відкриє меню ваших програм — месенджер, SMS або пошту.</p>
          <div className="request-assurance"><ShieldCheck size={19} aria-hidden="true" /> Ми не просимо пароль трансляції й не зберігаємо ваші дані на сайті.</div>
        </div>
        <form className="request-form" onSubmit={handleSubmit}>
          <label>Ваше ім’я<input value={request.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" /></label>
          <label>Виконавець<input value={request.artist} onChange={(event) => setField("artist", event.target.value)} required /></label>
          <label>Трек<input value={request.track} onChange={(event) => setField("track", event.target.value)} required /></label>
          <label className="request-form__message">Повідомлення<textarea value={request.message} onChange={(event) => setField("message", event.target.value)} rows={3} /></label>
          <button className="button button--primary" type="submit" disabled={status === "sending"}>
            <Send size={17} aria-hidden="true" /> {status === "sending" ? "НАДСИЛАЄМО…" : phone ? "ОБРАТИ ПРОГРАМУ" : "НАДІСЛАТИ ЗАПИТ"}
          </button>
          <div className="request-form__tools">
            <div><Smartphone size={16} aria-hidden="true" /><p><strong>З телефону:</strong> після натискання відкриється список доступних програм.</p></div>
            <div className="request-apps">
              <button type="button" className="request-app-button" onClick={() => void shareRequest()}><Share2 size={15} aria-hidden="true" /> ПОДІЛИТИСЯ</button>
              {requestLinksConfig.telegramUsername ? <button type="button" className="request-app-button" onClick={() => void openTelegram()}><MessageCircle size={15} aria-hidden="true" /> TELEGRAM</button> : null}
              {whatsapp ? <button type="button" className="request-app-button" onClick={() => openLink(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`)}><MessageCircle size={15} aria-hidden="true" /> WHATSAPP</button> : null}
              {viber ? <button type="button" className="request-app-button" onClick={() => openLink(`viber://forward?text=${encodeURIComponent(text)}`)}><MessageCircle size={15} aria-hidden="true" /> VIBER</button> : null}
              {sms ? <button type="button" className="request-app-button" onClick={() => openLink(`sms:+${sms}?body=${encodeURIComponent(text)}`)}><MessageCircle size={15} aria-hidden="true" /> SMS</button> : null}
              {email ? <button type="button" className="request-app-button" onClick={() => openLink(`mailto:${email}?subject=${encodeURIComponent("Замовлення треку — DJ_SKY_STYLE RADIO")}&body=${encodeURIComponent(text)}`)}><Mail size={15} aria-hidden="true" /> ПОШТА</button> : null}
              <button type="button" className="request-app-button" onClick={() => void copyRequest()}><Copy size={15} aria-hidden="true" /> КОПІЮВАТИ</button>
            </div>
            {!hasDirectApps ? <small>Для прямого Telegram / WhatsApp / Viber / SMS додайте свій контакт у <code>config/request-links.ts</code>.</small> : null}
          </div>
          {message ? <p className={`form-message form-message--${status}`} role="status">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
