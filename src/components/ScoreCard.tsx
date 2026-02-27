import { ReactNode } from "react";

interface Props {
  title: string;
  score: number;
  icon: ReactNode;
  items: { label: string; value: string | number }[];
  delay?: number;
}

export const ScoreCard = ({ title, score, icon, items, delay = 0 }: Props) => {
  const getColor = (s: number) => {
    if (title.includes("Risk")) {
      if (s <= 30) return "score-green";
      if (s <= 60) return "score-amber";
      return "score-red";
    }
    if (s >= 70) return "score-green";
    if (s >= 40) return "score-amber";
    return "score-red";
  };

  return (
    <div
      className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <span className={`font-mono text-2xl font-bold ${getColor(score)}`}>{score}</span>
      </div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-mono font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
