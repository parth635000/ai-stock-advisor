import { useState } from "react";
import { STOCKS, SECTORS, type UserPreferences } from "@/data/mockData";
import { Search, ArrowRight, GitCompare } from "lucide-react";

interface Props {
  onSubmit: (prefs: UserPreferences) => void;
  loading: boolean;
}

export const AnalysisForm = ({ onSubmit, loading }: Props) => {
  const [riskAppetite, setRiskAppetite] = useState<"Low" | "Medium" | "High">("Medium");
  const [investmentHorizon, setInvestmentHorizon] = useState<"Short" | "Medium" | "Long">("Medium");
  const [sector, setSector] = useState("IT");
  const [stock, setStock] = useState("TCS");
  const [compareStock, setCompareStock] = useState("");
  const [showCompare, setShowCompare] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ riskAppetite, investmentHorizon, sector, stock, compareStock: showCompare ? compareStock : undefined });
  };

  const riskOptions: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
  const horizonOptions: ("Short" | "Medium" | "Long")[] = ["Short", "Medium", "Long"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {/* Risk Appetite */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Risk Appetite</label>
        <div className="grid grid-cols-3 gap-2">
          {riskOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setRiskAppetite(opt)}
              className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                riskAppetite === opt
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Horizon */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Investment Horizon</label>
        <div className="grid grid-cols-3 gap-2">
          {horizonOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setInvestmentHorizon(opt)}
              className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                investmentHorizon === opt
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {opt === "Short" ? "Short Term" : opt === "Medium" ? "Medium Term" : "Long Term"}
            </button>
          ))}
        </div>
      </div>

      {/* Sector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Sector Preference</label>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                sector === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Select Stock</label>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {STOCKS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.value} — {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Compare Toggle */}
      <button
        type="button"
        onClick={() => setShowCompare(!showCompare)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <GitCompare className="h-4 w-4" />
        {showCompare ? "Remove comparison" : "Compare with another stock"}
      </button>

      {showCompare && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-sm font-medium text-foreground">Compare With</label>
          <select
            value={compareStock}
            onChange={(e) => setCompareStock(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select stock...</option>
            {STOCKS.filter((s) => s.value !== stock).map((s) => (
              <option key={s.value} value={s.value}>
                {s.value} — {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || (showCompare && !compareStock)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
        ) : (
          <>
            <Search className="h-4 w-4" />
            Analyze {showCompare ? "& Compare" : "Stock"}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};
