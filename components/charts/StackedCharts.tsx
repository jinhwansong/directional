'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface StackedChartsProps<T extends Record<string, unknown>> {
  title: string;
  data: T[];
  keys: string[];
  xKey: keyof T;
  colors?: string[];
}

const DEFAULT_COLORS = ['#f23d67', '#717681', '#3c4352', '#a7aab1'];

interface TooltipPayload {
  name?: string;
  value?: number | string;
  dataKey?: string;
  color?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-(--pale-gray) bg-white px-3 py-2 text-xs shadow-sm">
      <p className="font-semibold text-(--font-color)">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="text-(--deep-gray)">
          <span
            className="mr-1 inline-block h-2 w-2 rounded-full"
            style={{ background: item.color }}
          />
          {item.name}: <span className="font-semibold">{item.value}%</span>
        </p>
      ))}
    </div>
  );
};

export default function StackedCharts<T extends Record<string, unknown>>({
  title,
  data,
  keys,
  xKey,
  colors = DEFAULT_COLORS,
}: StackedChartsProps<T>) {
  return (
    <div className="rounded-lg border border-(--pale-gray) bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-(--font-color)">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xKey as string}
                stroke="#a7aab1"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#a7aab1"
                tickFormatter={(value) => `${Math.round(value * 100)}%`}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {keys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="stack"
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={xKey as string}
                stroke="#a7aab1"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#a7aab1"
                tickFormatter={(value) => `${Math.round(value * 100)}%`}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {keys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stackId="stack"
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.5}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

