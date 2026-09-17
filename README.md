# DJ_SKY_STYLE RADIO

Modern responsive website for **DJ_SKY_STYLE RADIO**. It is built with Next.js, TypeScript, Tailwind CSS and the native HTML5 Audio API. The visual design is a dark club/night radio interface, with no paid libraries and no invented Caster.fm details.

Українська покрокова інструкція з налаштування, редагування, GitHub та Vercel: [ІНСТРУКЦІЯ_ЗМІНИ_ТА_ПУБЛІКАЦІЇ.md](./ІНСТРУКЦІЯ_ЗМІНИ_ТА_ПУБЛІКАЦІЇ.md).

## What is included

- Large responsive hero and sticky mobile navigation
- HTML5 live-stream player: play/pause, volume, mute, connection state, live equalizer and accessible controls
- Live Caster.fm public-status adapter with current track, listeners and real playlist history (20-second refresh)
- Editable schedule, radio description, social links and contacts
- Track-request form with mobile native sharing, plus optional Telegram / WhatsApp / Viber / SMS / e-mail actions
- SEO metadata, Open Graph card, SVG favicon, web manifest and a small production PWA service worker
- Graceful fallbacks: no metadata shows `DJ_SKY_STYLE RADIO / LIVE STREAM`; unavailable audio shows an error without breaking the site

## Requirements

- Node.js 20.9 or later (Node.js 22 LTS recommended)
- npm 10 or later

## Install and run locally

1. Open a terminal in the project folder.
2. Copy `.env.example` to `.env.local`.
3. Add either your real Caster.fm stream URL or, on Caster.fm Free Cloud, the official widget public token:

   ```env
   NEXT_PUBLIC_RADIO_STREAM_URL=https://your-real-stream-url
   ```

   For the Free Cloud plan, use this instead and leave `NEXT_PUBLIC_RADIO_STREAM_URL` blank:

   ```env
   NEXT_PUBLIC_CASTER_PUBLIC_TOKEN=
   NEXT_PUBLIC_CASTER_CHANNEL_ID=
   ```

4. Install packages and start development mode:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

The player intentionally never autoplays sound. A listener must press **LISTEN LIVE**.

## Configuration

### 1. Caster.fm stream

In `.env.local`, paste the actual public audio stream URL supplied by Caster.fm:

```env
NEXT_PUBLIC_RADIO_STREAM_URL=
```

The project leaves it blank on purpose. This URL is needed for the player itself.

### Free Caster.fm plan: official embedded player

Caster.fm Free Cloud does not provide a shareable Direct Stream Link for a custom HTML5 audio player. It does provide an official embeddable live player. In Caster.fm Cloud, open **Widgets / Players**, choose the live player, and copy its `data-publicToken`. Put it in:

```env
NEXT_PUBLIC_CASTER_PUBLIC_TOKEN=your-widget-public-token
```

If Caster.fm gives you a `data-channelId`, set `NEXT_PUBLIC_CASTER_CHANNEL_ID` as well. Otherwise leave it empty to show the available channel(s). This project automatically displays the official dark Caster.fm player when that public token is set. Never put the broadcaster/source password in this project.

### 2. Caster.fm metadata, listeners and history

This station already uses Caster.fm’s documented public Icecast status endpoint. It delivers the current track, listener count and recent playlist without a broadcaster password. The default server and mount point are in `/config/radio.ts` and are requested server-side by `/app/api/radio/route.ts`.

If Caster.fm changes its server later, override these optional values in `.env.local` or Vercel:

```env
CASTER_STATUS_URL=https://new-host:port/admin/publicstats.json
CASTER_MOUNT_POINT=/new-mount
```

A separate documented private API can still be added with:

```env
CASTER_API_URL=
CASTER_API_TOKEN=
CASTER_STATION_ID=
```

`/app/api/radio/route.ts` calls that endpoint from the server, so `CASTER_API_TOKEN` is not sent to visitors. The normalizer in `/lib/caster.ts` already recognizes several common field names. If Caster.fm returns different names, update **only** `normalizeCasterPayload` using the sample response. It has a comment showing exactly where to do this.

The requested public placeholders are also present in `.env.example`:

```env
NEXT_PUBLIC_CASTER_API_URL=
NEXT_PUBLIC_CASTER_API_TOKEN=
NEXT_PUBLIC_STATION_ID=
```

Only use a `NEXT_PUBLIC_*` token if Caster.fm explicitly says it is safe to reveal in every visitor's browser. Otherwise, use the private `CASTER_*` variables above.

### 3. Station and request settings

- Player name and public station page: `/config/radio.ts`
- Mobile app/contact destinations: `/config/request-links.ts` (Telegram, WhatsApp, Viber, SMS, e-mail)
- Without an endpoint, phones open the native sharing menu; direct app buttons are configured in `/config/request-links.ts`. A custom POST endpoint can still receive `{ name, artist, track, message }`.

### 4. Socials and contacts

Edit `/config/socials.ts`:

- Set each social `href` to your real page. Empty values are hidden automatically.
- Set `telegramUrl` to enable **JOIN TELEGRAM**.
- Set `contactDetails.email`, `.telegram`, and `.instagram` to populate Contact.

### 5. Editorial text and schedule

- Change the About text in `/config/content.ts`.
- Change all days and shows in `/data/schedule.ts`.

## Verify a production build

```bash
npm run build
npm run start
```

`npm run build` performs the Next.js TypeScript check and creates the production bundle.

## Project structure

```text
app/
  api/radio/route.ts    Server-only metadata proxy
  layout.tsx            SEO metadata and page shell
  manifest.ts           PWA manifest
  page.tsx              Home page composition
components/             Player, navigation, sections and PWA registration
config/                 Radio, social/contact and text settings
data/schedule.ts        Editable weekly schedule
lib/caster.ts           Caster.fm response adapter
public/                 Favicon, social preview card and service worker
```

## Deploy to GitHub and Vercel

### GitHub

```bash
git init
git add .
git commit -m "Initial DJ_SKY_STYLE RADIO website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Never commit `.env.local`; it is already ignored. Keep your stream and API credentials in environment variables.

### Vercel

1. Push the project to GitHub.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Framework detection should select Next.js automatically; keep the default build command.
4. In **Settings → Environment Variables**, add the same values from `.env.local`.
5. Deploy.

### Custom domain

1. In the Vercel project, open **Settings → Domains** and enter your domain.
2. Add the DNS record Vercel displays at your domain provider.
3. Wait for DNS verification. Vercel provisions HTTPS automatically.

After deploying, check the stream on an Android phone and iPhone. A stream must support browser-friendly HTTPS/CORS delivery for playback from a public HTTPS site.
