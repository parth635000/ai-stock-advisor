import { useState } from "react";
import { Header } from "@/components/Header";
import { AnalysisForm } from "@/components/AnalysisForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { getAnalysis, type AnalysisResult, type UserPreferences } from "@/data/mockData";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [compareResult, setCompareResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (prefs: UserPreferences) => {
    setLoading(true);
    setResult(null);
    setCompareResult(null);

    try {
      const [primary, compare] = await Promise.all([
        getAnalysis(prefs.stock),
        prefs.compareStock ? getAnalysis(prefs.compareStock) : Promise.resolve(null),
      ]);
      setResult(primary);
      setCompareResult(compare);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        {!result ? (
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground">
                Stock Suitability<br />
                <span className="text-primary">Analysis</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                AI-powered investment analysis tailored to your risk profile
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <AnalysisForm onSubmit={handleAnalyze} loading={loading} />
            </div>
          </div>
        ) : (
          <ResultsDashboard result={result} compareResult={compareResult ?? undefined} onBack={() => setResult(null)} />
        )}
      </main>
    </div>
  );
};

export default Index;
