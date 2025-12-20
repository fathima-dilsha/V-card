export function toLocalISOString(localDateStr: string) {
  // Split date and time manually (to treat as local, not UTC)
  const [datePart, timePart] = localDateStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour = 0, minute = 0] = timePart?.split(":").map(Number) || [];

  // Create date as local (not UTC)
  const date = new Date(year, month - 1, day, hour, minute);

  // Get local offset (e.g., +05:30)
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, "0");
  const hours = pad(offset / 60);
  const minutes = pad(offset % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}${sign}${hours}:${minutes}`;
}
