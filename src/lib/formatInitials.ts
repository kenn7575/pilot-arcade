export function formatInitials(name: string): string {
  // Handle empty or undefined input
  if (!name?.trim()) {
    return "??";
  }

  // Split the name into parts
  const parts = name.trim().split(" ");

  if (parts.length >= 2) {
    // If we have multiple parts, take first char of first and last part
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  } else {
    // For single names, take first two chars
    return name.slice(0, 2).toUpperCase();
  }
}
