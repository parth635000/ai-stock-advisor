import { AnalysisResult } from "@/data/mockData";
import { SuitabilityMeter } from "./SuitabilityMeter";
import { ScoreCard } from "./ScoreCard";
import { PriceTrendChart, RevenueChart, SentimentPieChart, RiskGauge } from "./Charts";
import { BarChart3, Shield, MessageSquare, Brain, Download, Save, ArrowLeft, Newspaper } from "lucide-react";

interface Props {
  result: AnalysisResult;
  compareResult?: AnalysisResult;
  onBack: () => void;
}

export const ResultsDashboard = ({ result, compareResult, onBack }: Props) => {
  const sentimentColor =
    result.sentiment.label === "Positive" ? "bg-score-green" :
    result.sentiment.label === "Neutral" ? "bg-score-amber" : "bg-score-red";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> New Analysis
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors">
            <Download className="h-3.5 w-3.5" /> PDF Report
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>
      </div>

      {/* Stock Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">
          {result.stock}
          {compareResult && <span className="text-muted-foreground"> vs {compareResult.stock}</span>}
        </h2>
        <p className="text-sm text-muted-foreground">Analysis Report</p>
      </div>

      {/* Suitability Meters */}
      <div className={`grid gap-6 ${compareResult ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        <div className="flex justify-center">
          <SuitabilityMeter score={result.suitability_score} />
        </div>
        {compareResult && (
          <div className="flex justify-center">
            <SuitabilityMeter score={compareResult.suitability_score} />
          </div>
        )}
      </div>

      {/* Score Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <ScoreCard
          title="Fundamental Analysis"
          score={result.fundamental_score}
          icon={<BarChart3 className="h-4 w-4 text-primary" />}
          items={[
            { label: "Revenue Growth", value: `${result.fundamentals.revenue_growth}%` },
            { label: "Profit Growth", value: `${result.fundamentals.profit_growth}%` },
            { label: "Debt/Equity", value: result.fundamentals.debt_to_equity },
            { label: "ROE", value: `${result.fundamentals.roe}%` },
          ]}
          delay={0}
        />
        <ScoreCard
          title="Risk Analysis"
          score={result.risk_score}
          icon={<Shield className="h-4 w-4 text-primary" />}
          items={[
            { label: "Volatility", value: `${result.risk.volatility}%` },
            { label: "Max Drawdown", value: `${result.risk.max_drawdown}%` },
            { label: "Market", value: result.risk.market_condition },
          ]}
          delay={100}
        />
        <ScoreCard
          title="Sentiment Analysis"
          score={result.sentiment_score}
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
          items={[
            { label: "Sentiment", value: result.sentiment.label },
          ]}
          delay={200}
        />
      </div>

      {/* Sentiment Badge & Headlines */}
      <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="mb-3 flex items-center gap-3">
          <Newspaper className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Recent Headlines</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-primary-foreground ${sentimentColor}`}>
            {result.sentiment.label}
          </span>
        </div>
        <ul className="space-y-2">
          {result.sentiment.headlines.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Explanation */}
      <div className="glass-card rounded-xl p-5 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Analysis</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{result.explanation}</p>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <PriceTrendChart data={result} compareData={compareResult} />
        <RevenueChart data={result} />
        <SentimentPieChart data={result} />
        <RiskGauge score={result.risk_score} />
      </div>

      {/* Compare Cards */}
      {compareResult && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">Comparison: {compareResult.stock}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <ScoreCard
              title="Fundamental Analysis"
              score={compareResult.fundamental_score}
              icon={<BarChart3 className="h-4 w-4 text-primary" />}
              items={[
                { label: "Revenue Growth", value: `${compareResult.fundamentals.revenue_growth}%` },
                { label: "Profit Growth", value: `${compareResult.fundamentals.profit_growth}%` },
                { label: "Debt/Equity", value: compareResult.fundamentals.debt_to_equity },
                { label: "ROE", value: `${compareResult.fundamentals.roe}%` },
              ]}
              delay={0}
            />
            <ScoreCard
              title="Risk Analysis"
              score={compareResult.risk_score}
              icon={<Shield className="h-4 w-4 text-primary" />}
              items={[
                { label: "Volatility", value: `${compareResult.risk.volatility}%` },
                { label: "Max Drawdown", value: `${compareResult.risk.max_drawdown}%` },
                { label: "Market", value: compareResult.risk.market_condition },
              ]}
              delay={100}
            />
            <ScoreCard
              title="Sentiment Analysis"
              score={compareResult.sentiment_score}
              icon={<MessageSquare className="h-4 w-4 text-primary" />}
              items={[{ label: "Sentiment", value: compareResult.sentiment.label }]}
              delay={200}
            />
          </div>
        </div>
      )}
    </div>
  );
};
