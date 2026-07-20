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