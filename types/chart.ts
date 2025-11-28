export interface CoffeeBrand {
  name?: string;
  brand?: string;
  popularity: number;
  [key: string]: unknown;
}

export interface PopularSnackBrand {
  brand?: string;
  name?: string;
  share: number;
  [key: string]: unknown;
}

export interface WeeklyMoodTrend {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
  [key: string]: unknown;
}

export interface WorkoutTrend {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
  [key: string]: unknown;
}

export interface CoffeeConsumptionMetric {
  cups: number;
  bugs: number;
  productivity: number;
  [key: string]: unknown;
}

export interface CoffeeConsumptionItem {
  team: string;
  series: CoffeeConsumptionMetric[];
}

export interface CoffeeConsumption {
  teams: CoffeeConsumptionItem[];
}

export interface SnackImpactMetric {
  snacks: number;
  meetingMissed: number;
  morale: number;
  productivity?: number;
  [key: string]: unknown;
}

export interface SnackImpactItem {
  name: string;
  metrics: SnackImpactMetric[];
}

export interface SnackImpact {
  departments: SnackImpactItem[];
}
