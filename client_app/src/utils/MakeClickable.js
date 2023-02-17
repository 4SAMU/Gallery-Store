/** @format */

export default function makeTextClickable(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const phoneRegex = /^\d{10}$/; // Match 10-digit phone numbers
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i; // Match email addresses
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    } else if (phoneRegex.test(part)) {
      return (
        <a key={i} href={`tel:${part}`}>
          {part}
        </a>
      );
    } else if (emailRegex.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      );
    } else {
      return <span key={i}>{part}</span>;
    }
  });
}
