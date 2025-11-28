import {
  CoffeeConsumption,
  SnackImpact,
  WorkoutTrend,
  WeeklyMoodTrend,
  PopularSnackBrand,
  CoffeeBrand,
} from '@/types/chart';
import { apiFetch } from '@/utils/fetcher';

export const fetchCoffeeBrands = async () => {
  return apiFetch<CoffeeBrand[]>('/mock/top-coffee-brands');
};

export const fetchPopularSnacks = async () => {
  return apiFetch<PopularSnackBrand[]>('/mock/popular-snack-brands');
};

export const fetchWeeklyMood = async () => {
  return apiFetch<WeeklyMoodTrend[]>('/mock/weekly-mood-trend');
};


export const fetchWorkoutTrend = async () => {
  return apiFetch<WorkoutTrend[]>('/mock/weekly-workout-trend');
};

export const fetchCoffeeConsumption = async () => {
  return apiFetch<CoffeeConsumption>('/mock/coffee-consumption');
};

export const fetchSnackImpact = async () => {
  return apiFetch<SnackImpact>('/mock/snack-impact');
};

