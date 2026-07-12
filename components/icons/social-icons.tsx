import type { SVGProps } from "react";

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V23h-4v-6.75c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.6 1.76-2.6 3.57V23h-4V8.25z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.23 22 17.08 22 12.06z" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 2.8 12 2.8 12 2.8h-.01s-4.9 0-8.2.34c-.46.05-1.46.06-2.36 1C.72 4.86.5 6.5.5 6.5S.25 8.42.25 10.35v1.31c0 1.93.25 3.85.25 3.85s.23 1.64.93 2.36c.9.95 2.08.92 2.6 1.02 1.9.18 8.02.34 8.02.34s4.9-.01 8.2-.35c.46-.06 1.46-.06 2.36-1.01.71-.72.94-2.36.94-2.36s.25-1.92.25-3.85v-1.31c0-1.93-.25-3.85-.25-3.85zM9.7 14.6V8.4l6.11 3.11-6.1 3.1z" />
    </svg>
  );
}
