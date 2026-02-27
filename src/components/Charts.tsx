import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import type { AnalysisResult } from "@/data/mockData";

const COLORS = {
  green: "hsl(152, 60%, 45%)",
  amber: "hsl(38, 92%, 55%)",
  red: "hsl(0, 72%, 55%)",
  blue: "hsl(217, 91%, 60%)",
};

const chartTooltipStyle = {
  backgroundColor: "hsl(222, 25%, 12%)",
  border: "1px solid hsl(222, 20%, 18%)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "12px",
};

export const PriceTrendChart = ({ data, compareData }: { data: AnalysisResult; compareData?: AnalysisResult }) => (
  <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
    <h3 className="mb-4 text-sm font-semibold text-foreground">1-Year Price Trend</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data.price_history}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Line type="monotone" dataKey="price" stroke={COLORS.green} strokeWidth={2} dot={false} name={data.stock} />
        {compareData && (
          <Line
            type="monotone"
            dataKey="price"
            data={compareData.price_history}
            stroke={COLORS.blue}
            strokeWidth={2}
            dot={false}
            name={compareData.stock}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const RevenueChart = ({ data }: { data: AnalysisResult }) => (
  <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
    <h3 className="mb-4 text-sm font-semibold text-foreground">Revenue Growth (₹ Cr)</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data.revenue_history}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} />
        <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => `₹${v.toLocaleString()} Cr`} />
        <Bar dataKey="revenue" fill={COLORS.green} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const SentimentPieChart = ({ data }: { data: AnalysisResult }) => {
  const pieData = [
    { name: "Positive", value: data.sentiment.distribution.positive },
    { name: "Neutral", value: data.sentiment.distribution.neutral },
    { name: "Negative", value: data.sentiment.distribution.negative },
  ];
  const colors = [COLORS.green, COLORS.amber, COLORS.red];

  return (
    <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
            {pieData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RiskGauge = ({ score }: { score: number }) => {
  const angle = (score / 100) * 180 - 90;
  const getColor = () => {
    if (score <= 30) return COLORS.green;
    if (score <= 60) return COLORS.amber;
    return COLORS.red;
  };

  return (
    <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Risk Gauge</h3>
      <div className="flex justify-center">
        <svg width="200" height="120" viewBox="0 0 200 120">
          {/* Background arc */}
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(222, 20%, 18%)" strokeWidth="12" strokeLinecap="round" />
          {/* Green zone */}
          <path d="M 20 100 A 80 80 0 0 1 60 30" fill="none" stroke={COLORS.green} strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          {/* Amber zone */}
          <path d="M 60 30 A 80 80 0 0 1 140 30" fill="none" stroke={COLORS.amber} strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          {/* Red zone */}
          <path d="M 140 30 A 80 80 0 0 1 180 100" fill="none" stroke={COLORS.red} strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 60 * Math.sin((angle * Math.PI) / 180)}
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <circle cx="100" cy="100" r="6" fill={getColor()} />
          <text x="100" y="90" textAnchor="middle" className="fill-foreground font-mono text-lg font-bold" fontSize="18">
            {score}
          </text>
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {score <= 30 ? "Low Risk" : score <= 60 ? "Moderate Risk" : "High Risk"}
      </p>
    </div>
  );
};
