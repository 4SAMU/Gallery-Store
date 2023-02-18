/** @format */

import ReactPlayer from "react-player";

export default function makeTextClickable(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const photoRegex = /\.(jpg|jpeg|gif|png|bmp|svg|ico)$/i;

  const videoRegex = /\.(mp4|avi|mov|wmv|flv|mkv|webm)$/i;

  const socialMediaRegex =
    /(https?:\/\/.*(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|twitch\.tv|facebook\.com|fb\.watch|bbc\.com))/i;

  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/; // Match phone numbers with an optional country code and with spaces, dashes, or dots between digits
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const parts = text.split(
    /(\b(?:https?:\/\/|mailto:)?\S+\b|\+?\d{1,3}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|[^\s]+\.(jpg|jpeg|gif|png|bmp|svg|ico)|https?:\/\/[^\s]+)\b|[^\s]+\.(mp4|avi|mov|wmv|flv|mkv|webm)\b/gi
  );

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      if (socialMediaRegex.test(part)) {
        // Add the "http://" or "https://" prefix back to the URL if it's not already there
        const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;

        // Extract the website's root URL
        const rootUrl = url.match(/^(https?:\/\/[^/]+)/i)[1];
        return (
          <div key={i}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={`${rootUrl}/favicon.ico`} alt="" />
              {part}
            </a>
            <ReactPlayer url={part} width={200} height={"auto"} controls />
          </div>
        );
      } else if (photoRegex.test(part)) {
        const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;

        // Extract the website's root URL
        const rootUrl = url.match(/^(https?:\/\/[^/]+)/i)[1];
        return (
          <div key={i}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={`${rootUrl}/favicon.ico`} alt="" width={20} />
              {part}
              <img src={part} alt="" width={200} height={300}></img>
            </a>
          </div>
        );
      } else {
        // Add the "http://" or "https://" prefix back to the URL if it's not already there
        const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;

        // Extract the website's root URL
        const rootUrl = url.match(/^(https?:\/\/[^/]+)/i)[1];
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer">
            <img src={`${rootUrl}/favicon.ico`} alt="" />
            {part}
          </a>
        );
      }
    } else if (photoRegex.test(part)) {
      // Add the "http://" or "https://" prefix back to the URL if it's not already there
      const url = /^https?:\/\//i.test(part) ? part : `http://${part}`;

      // Extract the website's root URL
      const rootUrl = url.match(/^(https?:\/\/[^/]+)/i)[1];
      return (
        <div key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={`${rootUrl}/favicon.ico`} alt="" />
            {part}
          </a>
          <img src={part} alt="" width={200} height={200} />
        </div>
      );
    } else if (phoneRegex.test(part)) {
      return (
        <a key={i} href={`tel:${part.replace(/[^\d+]/g, "")}`}>
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
