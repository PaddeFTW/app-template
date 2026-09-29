export function swedishAuthError(message: string) {
  const text = message.toLowerCase();
  if (text.includes("already") || text.includes("finns redan")) {
    return "Den här e-posten finns redan. Logga in i stället.";
  }
  if (text.includes("invalid") || text.includes("fel e-post")) {
    return "Fel e-post eller lösenord.";
  }
  if (text.includes("password") && text.includes("6")) {
    return "Lösenordet ska ha minst 6 tecken.";
  }
  return message;
}
