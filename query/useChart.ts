import {
  fetchCoffeeBrands,
  fetchCoffeeConsumption,
  fetchPopularSnacks,
  fetchSnackImpact,
  fetchWeeklyMood,
  fetchWorkoutTrend,
} from '@/libs/chart';
import { useQuery } from '@tanstack/react-query';

export const useCoffeeBrands = () => {
  return useQuery({
    queryKey: ['chart', 'coffeeBrands'],
    queryFn: fetchCoffeeBrands,
    staleTime: 1000 * 60 * 5,
  });
};

export const useWeeklyMood = () => {
  return useQuery({
    queryKey: ['chart', 'weeklyMood'],
    queryFn: fetchWeeklyMood,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePopularSnacks = () => {
  return useQuery({
    queryKey: ['chart', 'popularSnacks'],
    queryFn: fetchPopularSnacks,
    staleTime: 1000 * 60 * 5,
  });
};

export const useWorkoutTrend = () => {
  return useQuery({
    queryKey: ['chart', 'workoutTrend'],
    queryFn: fetchWorkoutTrend,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCoffeeConsumption = () => {
  return useQuery({
    queryKey: ['chart', 'coffeeConsumption'],
    queryFn: fetchCoffeeConsumption,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSnackImpact = () => {
  return useQuery({
    queryKey: ['chart', 'snackImpact'],
    queryFn: fetchSnackImpact,
    staleTime: 1000 * 60 * 5,
  });
};

