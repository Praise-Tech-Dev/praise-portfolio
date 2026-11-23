/**
 * The flowing-ribbon motif: many thin curves interpolated between two Bézier
 * curves, so the lines bunch and fan out like a twisted ribbon. It is generated
 * (no image file), recolours with the theme, and is purely decorative.
 */
const LINES = 34;
const A = [[-60, 440], [260, 40], [640, 640], [1280, 130]];
const B = [[-60, 520], [300, 340], [620, 290], [1280, 380]];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const paths = Array.from({ length: LINES }, (_, i) => {
  const t = i / (LINES - 1);
  const [p0, p1, p2, p3] = A.map((a, k) => [lerp(a[0], B[k][0], t), lerp(a[1], B[k][1], t)]);
  return `M${p0[0]},${p0[1]} C${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`;
});

export function WaveRibbon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--wave-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--wave-b)" }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#wave-gradient)" strokeWidth="1.1" style={{ opacity: "var(--wave-opacity)" }}>
        {paths.map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  );
}

/**
 * A soft curved edge between sections. `flip` is for the bottom of a section.
 * The fill uses the section's own colour (text-alt), so it joins seamlessly.
 */
export function WaveEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-8 w-full text-alt sm:h-12 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0,30 C240,0 480,56 720,28 C960,0 1200,50 1440,20 L1440,56 L0,56 Z"
        fill="currentColor"
      />
    </svg>
  );
}
