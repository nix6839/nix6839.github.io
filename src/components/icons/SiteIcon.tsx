type Props = {
  title?: string;
};

export default function SiteIcon({ title = undefined }: Props) {
  return (
    <svg
      width="32"
      height="32"
      version="1.1"
      viewBox="0 0 8.4667 8.4667"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g>
        <circle
          cx="4.2333"
          cy="4.2333"
          r="4.2333"
          fill="#f4f4f4"
          strokeWidth=".40943"
        />
        <g fill="#b4ec94">
          <rect x="1.0583" y="1.5875" width="2.6458" height="2.6458" />
          <path d="m2.3812 5.0271v2.6458h3.7042v-2.6458h-1.3229v1.3229h-1.0583v-1.3229h-1.3229z" />
          <rect x="4.7625" y="1.5875" width="2.6458" height="2.6458" />
        </g>
      </g>
    </svg>
  );
}
