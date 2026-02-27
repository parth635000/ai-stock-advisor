import { ThemeToggle } from "./ThemeToggle";
import { TrendingUp } from "lucide-react";

export const Header = () => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight text-foreground">AI Investment Analyzer</h1>
          <p className="text-xs text-muted-foreground">Suitability Analysis Engine</p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  </header>
);
