export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // Average month length
  const years = Math.floor(days / 365.25); // Account for leap years

  if (seconds < 60) {
    return "lige nu";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minut" : "minutter"} siden`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "time" : "timer"} siden`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? "dag" : "dage"} siden`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "uge" : "uger"} siden`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "måned" : "måneder"} siden`;
  } else {
    return `${years} ${years === 1 ? "år" : "år"} siden`;
  }
}
