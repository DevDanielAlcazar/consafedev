const defaultBookingUrl = "https://calendar.app.google/3Pxeo6XGicJLxSgL9";
const defaultWhatsappUrl =
  "https://wa.me/524775694198?text=Hola%20ConSafeDev%2C%20vi%20su%20sitio%20y%20quiero%20platicarles%20sobre%20un%20problema%20en%20mi%20operaci%C3%B3n.";

export const siteConfig = {
  bookingUrl:
    process.env.NEXT_PUBLIC_CONSAFEDEV_BOOKING_URL?.trim() || defaultBookingUrl,
  whatsappUrl:
    process.env.NEXT_PUBLIC_CONSAFEDEV_WHATSAPP_URL?.trim() || defaultWhatsappUrl,
} as const;

export function configuredHref(value: string, fallback = "#contacto") {
  return value.length > 0 ? value : fallback;
}

export function isExternalHref(value: string) {
  return /^https?:\/\//i.test(value);
}
