import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { YearlyDataPoint, formatSEK } from '../utils/calculator'
import { Translations } from '../utils/translations'
import styles from './GrowthChart.module.css'

interface Props {
  data: YearlyDataPoint[]
  color?: string
  tr: Translations
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`
  return String(value)
}

function CustomTooltip({ active, payload, label, tr }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTitle}>{tr.year} {label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: {formatSEK(entry.value)}
        </p>
      ))}
    </div>
  )
}

export default function GrowthChart({ data, color = '#4f46e5', tr }: Props) {
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tickFormatter={v => `${tr.year} ${v}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} width={60} />
          <Tooltip content={<CustomTooltip tr={tr} />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name={tr.withInterest}
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="deposited"
            name={tr.yourSavings}
            stroke="#a0aec0"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
