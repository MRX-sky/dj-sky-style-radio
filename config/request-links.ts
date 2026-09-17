/**
 * Destinations for the “Замовити трек” page.
 *
 * Add only contacts that really accept listeners' requests. A phone number must
 * use international digits only, for example: 380XXXXXXXXX (without + or spaces).
 */
export const requestLinksConfig = {
  /** Telegram username without @, for example: dj_sky_style */
  telegramUsername: "",
  /** WhatsApp number: 380XXXXXXXXX */
  whatsappPhone: "",
  /** Viber number: 380XXXXXXXXX */
  viberPhone: "",
  /** SMS number: 380XXXXXXXXX */
  smsPhone: "",
  /** E-mail that receives music requests */
  email: "",
} as const;
