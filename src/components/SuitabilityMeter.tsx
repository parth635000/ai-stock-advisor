import { useMemo } from "react";

interface Props {
  score: number;
  size?: number;
}

export const SuitabilityMeter = ({ score, size = 200 }: Props) => {
  const { color, label, glowClass } = useMemo(() => {
    if (score >= 70) return { color: "hsl(152, 60%, 45%)", label: "Suitable", glowClass: "glow-green" };
    if (score >= 40) return { color: "hsl(38, 92%, 55%)", label: "Moderate Risk", glowClass: "glow-amber" };
    return { color: "hsl(0, 72%, 55%)", label: "Not Recommended", glowClass: "glow-red" };
  }, [score]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-3 rounded-2xl p-6 glass-card ${glowClass}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-out"
          style={{ "--score-offset": offset } as React.CSSProperties}
        />
        <text x="50" y="46" textAnchor="middle" className="fill-foreground font-mono text-[22px] font-bold">
          {score}
        </text>
        <text x="50" y="60" textAnchor="middle" className="fill-muted-foreground text-[8px]">
          out of 100
        </text>
      </svg>
      <div
        className="rounded-full px-4 py-1.5 text-sm font-semibold"
        style={{ backgroundColor: color, color: "#fff" }}
      >
        {label}
      </div>
      <p className="text-xs text-muted-foreground">Suitability Score</p>
    </div>
  );
};
