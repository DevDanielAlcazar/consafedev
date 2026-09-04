export const siteConfig = {
  bookingUrl: process.env.NEXT_PUBLIC_CONSAFEDEV_BOOKING_URL?.trim() ?? "",
  whatsappUrl: process.env.NEXT_PUBLIC_CONSAFEDEV_WHATSAPP_URL?.trim() ?? "",
} as const;

export function configuredHref(value: string, fallback = "#contacto") {
  return value.length > 0 ? value : fallback;
}

export function isExternalHref(value: string) {
  return /^https?:\/\//i.test(value);
}
