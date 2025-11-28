'use client';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BarDonutProps<T extends Record<string, unknown>> {
  title: string;
  data: T[];
  dataKeyX: keyof T;
  dataKeyY: keyof T;
  colors?: string[];
}

const DEFAULT_COLORS = ['#f23d67', '#3c4352', '#a7aab1', '#717681', '#2f3137'];

interface TooltipPayload {
  name?: string;
  value?: number | string;
  dataKey?: string;
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
      <p className="text-(--deep-gray)">
        {payload[0].name}: <span className="font-semibold">{payload[0].value}</span>
      </p>
    </div>
  );
};

export default function BarDonut<T extends Record<string, unknown>>({
  title,
  data,
  dataKeyX,
  dataKeyY,
  colors = DEFAULT_COLORS,
}: BarDonutProps<T>) {
  return (
    <div className="rounded-lg border border-(--pale-gray) bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-(--font-color)">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey={dataKeyX as string}
                stroke="#a7aab1"
                style={{ fontSize: '12px' }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              
              <YAxis stroke="#a7aab1" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKeyY as string} radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`bar-${String(entry[dataKeyX])}-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex h-64 flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKeyY as string}
                nameKey={dataKeyX as string}
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`slice-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

