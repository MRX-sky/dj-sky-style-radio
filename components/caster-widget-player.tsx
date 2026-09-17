"use client";

import Script from "next/script";
import { ExternalLink, Radio } from "lucide-react";
import { radioConfig } from "@/config/radio";

/**
 * Official Caster.fm player for Free Cloud accounts.
 * Caster.fm requires the three attribution links below for this widget to load.
 */
export function CasterWidgetPlayer() {
  return (
    <div className="caster-widget-card">
      <div className="caster-widget-card__header">
        <div><p>ОФІЦІЙНИЙ ПЛЕЄР CASTER.FM</p><h3>DJ_SKY_STYLE RADIO</h3></div>
        <Radio size={23} aria-hidden="true" />
      </div>
      <div
        className="cstrEmbed caster-widget"
        data-type="newStreamPlayer"
        data-publicToken={radioConfig.casterWidgetToken}
        data-theme="dark"
        data-color="55a8ff"
        data-channelId={radioConfig.casterWidgetChannelId || undefined}
        data-rendered="false"
      >
        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Shoutcast Hosting</a>{" "}
        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Stream Hosting</a>{" "}
        <a href="https://www.caster.fm" target="_blank" rel="noreferrer">Radio Server Hosting</a>
      </div>
      {radioConfig.stationUrl ? (
        <a className="caster-widget-card__station-link" href={radioConfig.stationUrl} target="_blank" rel="noreferrer">
          ВІДКРИТИ СТОРІНКУ СТАНЦІЇ <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : null}
      <Script src="https://cdn.cloud.caster.fm/widgets/embed.js" strategy="afterInteractive" />
    </div>
  );
}
