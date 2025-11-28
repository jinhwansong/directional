'use client';
import BarDonut from '@/components/charts/BarDonut';
import MultiLine from '@/components/charts/MultiLine';
import StackedCharts from '@/components/charts/StackedCharts';
import {
    useCoffeeBrands,
  useCoffeeConsumption,
  usePopularSnacks,
  useSnackImpact,
  useWeeklyMood,
  useWorkoutTrend,
} from '@/query/useChart';
import { useMemo } from 'react';

const teamPalette = ['#f23d67', '#3c4352', '#a7aab1', '#717681', '#2f3137'];

const buildTeamColorMap = (
  data?: Array<{ team: string }>
): Record<string, string> => {
  if (!data || !Array.isArray(data)) return {};
  const teams = Array.from(new Set(data.map((item) => item.team)));
  return teams.reduce<Record<string, string>>((acc, team, index) => {
    acc[team] = teamPalette[index % teamPalette.length];
    return acc;
  }, {});
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <h2 className="text-xl font-semibold text-(--font-color)">{title}</h2>
    {children}
  </section>
);

export default function ChartsPage() {
  const { data: snackBrands } = usePopularSnacks();
  const { data: coffeeBrands } = useCoffeeBrands();
  const { data: weeklyMood } = useWeeklyMood();
  const { data: workoutTrend } = useWorkoutTrend();
  const { data: coffeeData } = useCoffeeConsumption();
  const { data: snackImpact } = useSnackImpact();

  // MultiLineChart용 데이터 변환
  const coffeeChartData = useMemo(() => {
    if (!coffeeData?.teams) return [];
    return coffeeData.teams.flatMap(({ team, series }) =>
      series.map((point) => ({
        team,
        consumption: point.cups,
        bugs: point.bugs,
        meetingMissed: (point.meetingMissed as number) ?? 0,
        productivity: point.productivity,
        morale: (point.morale as number) ?? 0,
      }))
    );
  }, [coffeeData]);

  const snackChartData = useMemo(() => {
    if (!snackImpact?.departments) return [];
    return snackImpact.departments.flatMap(({ name, metrics }) =>
      metrics.map((point) => ({
        team: name,
        consumption: point.snacks,
        bugs: 0, 
        meetingMissed: point.meetingMissed,
        productivity: (point.productivity as number) ?? 0,
        morale: point.morale,
      }))
    );
  }, [snackImpact]);

  const normalizedCoffeeBrands = useMemo(
    () =>
      (coffeeBrands ?? []).map((item) => ({
        ...item,
        brand: item.brand ?? item.name ?? 'Unknown',
      })),
    [coffeeBrands]
  );

  const normalizedSnackBrands = useMemo(
    () =>
      (snackBrands ?? []).map((item) => ({
        ...item,
        brand: item.brand ?? item.name ?? 'Unknown',
      })),
    [snackBrands]
  );

  const coffeeColorMap = useMemo(
    () => buildTeamColorMap(coffeeChartData),
    [coffeeChartData]
  );
  const snackColorMap = useMemo(
    () => buildTeamColorMap(snackChartData),
    [snackChartData]
  );
  console.log(snackChartData);
  return (
    <div className="space-y-10">
      <Section title="바 & 도넛 인사이트">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <BarDonut
            title="인기 커피 브랜드"
            data={normalizedCoffeeBrands}
            dataKeyX="brand"
            dataKeyY="popularity"
          />
          <BarDonut
            title="인기 간식 브랜드"
            data={normalizedSnackBrands}
            dataKeyX="brand"
            dataKeyY="share"
          />
        </div>
      </Section>

      <Section title="스택형 분포">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <StackedCharts
            title="감정 분포"
            data={weeklyMood ?? []}
            keys={['happy', 'tired', 'stressed']}
            xKey="week"
          />
          <StackedCharts
            title="운동 습관 분포"
            data={workoutTrend ?? []}
            keys={['running', 'cycling', 'stretching']}
            xKey="week"
          />
        </div>
      </Section>

      <Section title="업무 영향 분석">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <MultiLine
            title="커피 섭취 vs 업무 영향"
            data={coffeeChartData}
            consumptionLabel="Coffee (cups)"
            colorMap={coffeeColorMap}
          />
          <MultiLine
            title="스낵 섭취 vs 협업 영향"
            data={snackChartData}
            consumptionLabel="Snacks"
            colorMap={snackColorMap}
          />
        </div>
      </Section>
    </div>
  );
}