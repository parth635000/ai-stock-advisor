export interface AnalysisResult {
  stock: string;
  fundamental_score: number;
  risk_score: number;
  sentiment_score: number;
  suitability_score: number;
  explanation: string;
  fundamentals: {
    revenue_growth: number;
    profit_growth: number;
    debt_to_equity: number;
    roe: number;
  };
  risk: {
    volatility: number;
    max_drawdown: number;
    market_condition: string;
  };
  sentiment: {
    label: "Positive" | "Neutral" | "Negative";
    headlines: string[];
    distribution: { positive: number; neutral: number; negative: number };
  };
  price_history: { date: string; price: number }[];
  revenue_history: { year: string; revenue: number }[];
}

export const STOCKS = [
  { value: "TCS", label: "TCS" },
  { value: "INFY", label: "Infosys" },
  { value: "RELIANCE", label: "Reliance" },
  { value: "HDFCBANK", label: "HDFC Bank" },
  { value: "ICICIBANK", label: "ICICI Bank" },
  { value: "WIPRO", label: "Wipro" },
  { value: "SBIN", label: "SBI" },
  { value: "BHARTIARTL", label: "Bharti Airtel" },
];

export const SECTORS = [
  "IT", "Banking", "Pharma", "FMCG", "Auto", "Energy", "Telecom", "Infrastructure",
];

const generatePriceHistory = (base: number, volatility: number) => {
  const data: { date: string; price: number }[] = [];
  let price = base;
  for (let i = 12; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    price += (Math.random() - 0.45) * volatility;
    data.push({ date: d.toLocaleDateString("en-US", { month: "short", year: "2-digit" }), price: Math.round(price * 100) / 100 });
  }
  return data;
};

const mockResults: Record<string, AnalysisResult> = {
  TCS: {
    stock: "TCS",
    fundamental_score: 82,
    risk_score: 28,
    sentiment_score: 75,
    suitability_score: 78,
    explanation: "TCS demonstrates strong fundamentals with consistent revenue growth and healthy profit margins. The company's low debt-to-equity ratio and high ROE indicate efficient capital utilization. Market sentiment is predominantly positive, driven by strong deal wins and digital transformation momentum. Given your risk appetite and investment horizon, TCS appears to be a suitable investment with moderate growth potential and relatively lower downside risk.",
    fundamentals: { revenue_growth: 14.2, profit_growth: 11.8, debt_to_equity: 0.04, roe: 47.5 },
    risk: { volatility: 18.5, max_drawdown: -12.3, market_condition: "Bullish" },
    sentiment: {
      label: "Positive",
      headlines: [
        "TCS wins $2B deal with major European bank",
        "Q3 results beat analyst expectations by 5%",
        "TCS expands AI and cloud services portfolio",
        "Employee retention improves to 88%",
      ],
      distribution: { positive: 62, neutral: 25, negative: 13 },
    },
    price_history: generatePriceHistory(3400, 80),
    revenue_history: [
      { year: "FY20", revenue: 156949 },
      { year: "FY21", revenue: 164177 },
      { year: "FY22", revenue: 191754 },
      { year: "FY23", revenue: 225458 },
      { year: "FY24", revenue: 240893 },
    ],
  },
  INFY: {
    stock: "INFY",
    fundamental_score: 74,
    risk_score: 35,
    sentiment_score: 60,
    suitability_score: 65,
    explanation: "Infosys shows solid fundamentals but faces headwinds from slower deal ramp-ups and margin pressures. The company's focus on AI-led services is promising but execution remains key. Sentiment is mixed with concerns about attrition and guidance cuts offsetting positive deal momentum. The stock carries moderate risk relative to its valuation.",
    fundamentals: { revenue_growth: 8.9, profit_growth: 6.2, debt_to_equity: 0.11, roe: 31.2 },
    risk: { volatility: 22.1, max_drawdown: -18.7, market_condition: "Neutral" },
    sentiment: {
      label: "Neutral",
      headlines: [
        "Infosys revises guidance downward for FY25",
        "Large deal TCV strong at $4.1B",
        "Margin pressure continues amid wage hikes",
        "AI-first strategy gains traction with clients",
      ],
      distribution: { positive: 38, neutral: 35, negative: 27 },
    },
    price_history: generatePriceHistory(1450, 50),
    revenue_history: [
      { year: "FY20", revenue: 90791 },
      { year: "FY21", revenue: 100472 },
      { year: "FY22", revenue: 121641 },
      { year: "FY23", revenue: 146767 },
      { year: "FY24", revenue: 153670 },
    ],
  },
  RELIANCE: {
    stock: "RELIANCE",
    fundamental_score: 70,
    risk_score: 42,
    sentiment_score: 55,
    suitability_score: 58,
    explanation: "Reliance Industries presents a diversified play across energy, retail, and telecom. While Jio and Retail segments show strong growth, the O2C business faces cyclical headwinds. High capital expenditure and debt levels moderate the overall attractiveness. The stock is suitable for investors with moderate-to-high risk appetite seeking long-term diversified exposure.",
    fundamentals: { revenue_growth: 22.5, profit_growth: 9.8, debt_to_equity: 0.39, roe: 9.3 },
    risk: { volatility: 25.8, max_drawdown: -22.1, market_condition: "Neutral" },
    sentiment: {
      label: "Neutral",
      headlines: [
        "Jio subscriber base crosses 480 million",
        "Retail expansion continues with 800 new stores",
        "O2C margins under pressure from global crude",
        "New energy investments of ₹75,000 Cr announced",
      ],
      distribution: { positive: 40, neutral: 32, negative: 28 },
    },
    price_history: generatePriceHistory(2500, 70),
    revenue_history: [
      { year: "FY20", revenue: 611645 },
      { year: "FY21", revenue: 539238 },
      { year: "FY22", revenue: 721634 },
      { year: "FY23", revenue: 900914 },
      { year: "FY24", revenue: 966382 },
    ],
  },
  HDFCBANK: {
    stock: "HDFCBANK",
    fundamental_score: 85,
    risk_score: 22,
    sentiment_score: 72,
    suitability_score: 82,
    explanation: "HDFC Bank continues to be a benchmark for consistent performance in Indian banking. Post-merger integration is progressing well with improving deposit granularity. Strong asset quality, robust NIM, and expanding digital capabilities make it a core portfolio holding. The stock is highly suitable for conservative to moderate investors seeking steady wealth creation.",
    fundamentals: { revenue_growth: 38.5, profit_growth: 35.2, debt_to_equity: 0.12, roe: 16.8 },
    risk: { volatility: 15.2, max_drawdown: -9.8, market_condition: "Bullish" },
    sentiment: {
      label: "Positive",
      headlines: [
        "HDFC Bank merger integration ahead of schedule",
        "NII growth at 24.5% YoY beats estimates",
        "Asset quality remains best-in-class with 1.2% GNPA",
        "Digital transactions up 40% YoY",
      ],
      distribution: { positive: 58, neutral: 30, negative: 12 },
    },
    price_history: generatePriceHistory(1650, 40),
    revenue_history: [
      { year: "FY20", revenue: 122189 },
      { year: "FY21", revenue: 128552 },
      { year: "FY22", revenue: 145550 },
      { year: "FY23", revenue: 178250 },
      { year: "FY24", revenue: 246820 },
    ],
  },
  ICICIBANK: {
    stock: "ICICIBANK",
    fundamental_score: 80,
    risk_score: 25,
    sentiment_score: 70,
    suitability_score: 76,
    explanation: "ICICI Bank has shown remarkable transformation with strong retail franchise and improving asset quality. The bank's digital initiatives and conservative provisioning provide comfort. With healthy ROE and consistent earnings growth, it remains a strong pick for medium to long-term investors with moderate risk appetite.",
    fundamentals: { revenue_growth: 28.2, profit_growth: 33.5, debt_to_equity: 0.14, roe: 17.5 },
    risk: { volatility: 17.8, max_drawdown: -11.5, market_condition: "Bullish" },
    sentiment: {
      label: "Positive",
      headlines: [
        "ICICI Bank Q3 PAT up 25% YoY",
        "Retail loan book grows at 22%",
        "NPA ratios at multi-year lows",
        "Technology investments driving efficiency",
      ],
      distribution: { positive: 55, neutral: 32, negative: 13 },
    },
    price_history: generatePriceHistory(1050, 35),
    revenue_history: [
      { year: "FY20", revenue: 74798 },
      { year: "FY21", revenue: 78435 },
      { year: "FY22", revenue: 89810 },
      { year: "FY23", revenue: 109225 },
      { year: "FY24", revenue: 140012 },
    ],
  },
};

// Fill remaining stocks with variants
["WIPRO", "SBIN", "BHARTIARTL"].forEach((stock) => {
  mockResults[stock] = {
    ...mockResults.INFY,
    stock,
    suitability_score: 50 + Math.floor(Math.random() * 30),
    fundamental_score: 55 + Math.floor(Math.random() * 25),
    risk_score: 25 + Math.floor(Math.random() * 30),
    sentiment_score: 45 + Math.floor(Math.random() * 30),
    price_history: generatePriceHistory(400 + Math.random() * 600, 30 + Math.random() * 40),
  };
});

export const getAnalysis = (stock: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResults[stock] || mockResults.TCS);
    }, 1500 + Math.random() * 1000);
  });
};

export type UserPreferences = {
  riskAppetite: "Low" | "Medium" | "High";
  investmentHorizon: "Short" | "Medium" | "Long";
  sector: string;
  stock: string;
  compareStock?: string;
};
