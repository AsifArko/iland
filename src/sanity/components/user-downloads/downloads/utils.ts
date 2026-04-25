export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Convert from cents
};

export const getTimeRemaining = (expiresAt: string) => {
  const now = new Date().getTime();
  const expires = new Date(expiresAt).getTime();
  const timeLeft = expires - now;

  if (timeLeft <= 0) return "Expired";

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getUrlTypeLabel = (urlType: string) => {
  switch (urlType) {
    case "active_download":
      return "Active Download";
    case "expired_redirect":
      return "Expired - Redirect to Success Page";
    case "no_token":
      return "No Token - Redirect to Success Page";
    default:
      return "Unknown";
  }
};
