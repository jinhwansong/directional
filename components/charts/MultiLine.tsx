'use client';

import { Fragment, useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface MultiLineProps<T extends { team: string; consumption: number; bugs?: number | null; meetingMissed?: number | null; productivity?: number | null; morale?: number | null; [key: string]: unknown }> {
  title: string;
  data: T[];
  colorMap: Record<string, string>;
  consumptionLabel: string;
}

interface DotProps {
  cx?: number;
  cy?: number;
  stroke?: string;
  fill?: string;
}

const CircleDot = ({ cx, cy, stroke, fill }: DotProps) => (
  <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={2} fill={fill} />
);

const SquareDot = ({ cx, cy, stroke }: DotProps) => (
  <rect
    x={(cx ?? 0) - 4}
    y={(cy ?? 0) - 4}
    width={8}
    height={8}
    stroke={stroke}
    strokeWidth={2}
    fill="#fff"
    rx={1}
  />
);

interface TooltipPayload {
  dataKey?: string;
  name?: string;
  value?: number | string;
  payload?: Record<string, unknown>;
}

const createCustomTooltip = (
  consumptionLabel: string,
  teamDataMap: Map<string, Map<number, { team: string; consumption: number; bugs?: number | null; productivity?: number | null; [key: string]: unknown }>>
) => {
  const CustomTooltipComponent = (props: {
    active?: boolean;
    payload?: readonly TooltipPayload[];
    label?: string | number;
  }) => {
    const { active, payload, label } = props;
    if (!active || !payload?.length) return null;
    
    // shared={false}일 때 payload는 호버된 라인 하나만 포함
    const activePayload = payload[0];
    if (!activePayload) return null;

    // name에서 팀 이름 추출 (예: "Backend bugs" -> "Backend")
    const name = activePayload.name as string | undefined;
    const team = name?.split(' ')[0];
    
    if (!team) return null;

    const consumption = typeof label === 'number' ? label : Number(label);
    const isCoffee = consumptionLabel.toLowerCase().includes('coffee');

    // teamDataMap에서 해당 팀의 해당 consumption 값 찾기
    let teamBugs: number | null | undefined = null;
    let teamProductivity: number | null | undefined = null;

    const teamMap = teamDataMap.get(team);
    const point = teamMap?.get(consumption);
    if (point) {
      teamBugs = point.bugs;
      teamProductivity = point.productivity;
    }

    return (
      <div className="rounded-md border border-(--pale-gray) bg-white px-3 py-2 text-xs shadow-sm">
        <p className="font-semibold text-(--font-color)">Team: {team}</p>
        <p className="text-(--deep-gray)">
          {isCoffee ? 'Coffee' : 'Snacks'}: {consumption}{' '}
          {isCoffee ? 'cups' : 'snacks'}
        </p>
        <p className="text-(--deep-gray)">
          Bugs: <span className="font-semibold">{teamBugs ?? '-'}</span>
        </p>
        <p className="text-(--deep-gray)">
          Productivity: <span className="font-semibold">{teamProductivity ?? '-'}</span>
        </p>
      </div>
    );
  };
  CustomTooltipComponent.displayName = 'CustomTooltip';
  return CustomTooltipComponent;
};

export default function MultiLine<T extends { team: string; consumption: number; bugs?: number | null; meetingMissed?: number | null; productivity?: number | null; morale?: number | null; [key: string]: unknown }>({
  title,
  data,
  colorMap,
  consumptionLabel,
}: MultiLineProps<T>) {
  const teams = Array.from(
    new Set(data.map((item) => (item.team as string) ?? ''))
  ).filter(Boolean) as string[];

  // 툴팁에서 사용할 팀별 데이터 맵
  const teamDataMap = useMemo(() => {
    const map = new Map<string, Map<number, T>>();
    teams.forEach((team) => {
      const teamMap = new Map<number, T>();
      data
        .filter((item) => item.team === team)
        .forEach((item) => {
          teamMap.set(item.consumption, item);
        });
      map.set(team, teamMap);
    });
    return map;
  }, [data, teams]);

  return (
    <div className="rounded-lg border border-(--pale-gray) bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-(--font-color)">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="consumption"
              stroke="#a7aab1"
              style={{ fontSize: '12px' }}
              label={{ value: consumptionLabel, position: 'insideBottomRight', offset: -5 }}
            />
            <YAxis
              yAxisId="left"
              stroke="#3c4352"
              tick={{ fill: '#3c4352' }}
              style={{ fontSize: '12px' }}
              label={{ value: 'Bugs / Meetings', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#f23d67"
              tick={{ fill: '#f23d67' }}
              style={{ fontSize: '12px' }}
              label={{ value: 'Productivity / Morale', angle: 90, position: 'insideRight' }}
            />
            <Tooltip
              shared={false}
              content={createCustomTooltip(consumptionLabel, teamDataMap)}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />

            {teams.map((team) => {
              const color = colorMap[team] || '#8884d8';
              return (
                <Fragment key={team}>
                  {/* Bugs - 실선, 원 마커, 왼쪽 Y축 */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={(entry: T) =>
                      entry.team === team ? (entry.bugs as number | null | undefined) ?? null : null
                    }
                    name={`${team} bugs`}
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="0"
                    dot={<CircleDot stroke={color} fill="#fff" />}
                    activeDot={{ r: 6 }}
                    legendType="none"
                    connectNulls={false}
                  />
                  {/* MeetingMissed - 실선, 원 마커, 왼쪽 Y축 */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={(entry: T) =>
                      entry.team === team ? (entry.meetingMissed as number | null | undefined) ?? null : null
                    }
                    name={`${team} meetingMissed`}
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="0"
                    dot={<CircleDot stroke={color} fill="#fff" />}
                    activeDot={{ r: 6 }}
                    legendType="none"
                    connectNulls={false}
                  />
                  {/* Productivity - 점선, 사각형 마커, 오른쪽 Y축 */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={(entry: T) =>
                      entry.team === team ? (entry.productivity as number | null | undefined) ?? null : null
                    }
                    name={`${team} productivity`}
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={<SquareDot stroke={color} />}
                    activeDot={{ r: 6 }}
                    legendType="none"
                    connectNulls={false}
                  />
                  {/* Morale - 점선, 사각형 마커, 오른쪽 Y축 */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey={(entry: T) =>
                      entry.team === team ? (entry.morale as number | null | undefined) ?? null : null
                    }
                    name={`${team} morale`}
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={<SquareDot stroke={color} />}
                    activeDot={{ r: 6 }}
                    legendType="none"
                    connectNulls={false}
                  />
                </Fragment>
              );
            })}

            {/* 범례용 더미 라인 (팀별 색상만 표시) */}
            {teams.map((team) => {
              const color = colorMap[team] || '#8884d8';
              return (
                <Line
                  key={`legend-${team}-`}
                  yAxisId="left"
                  type="monotone"
                  dataKey={(entry: T) =>
                    entry.team === team ? (entry.bugs as number | null | undefined) ?? null : null
                  }
                  name={team}
                  stroke={color}
                  strokeWidth={2}
                  legendType="line"
                  connectNulls={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


