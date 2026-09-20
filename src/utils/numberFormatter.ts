export function toPersianDigits(n: string | number): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}

export function formatPhone(phone: string): string {
  const normalized = phone.replace(/\D/g, "");

  if (normalized.length !== 11) {
    return `\u2066${toPersianDigits(phone)}\u2069`;
  }

  const formatted = normalized.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");

  return `\u2066${toPersianDigits(formatted)}\u2069`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  const value = new Date(date);
  const dateLabel = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(value);
  const timeLabel = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(value);

  return `${dateLabel}، ساعت ${timeLabel}`;
}
