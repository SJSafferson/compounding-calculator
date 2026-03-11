import { YearlyDataPoint, formatSEK } from '../utils/calculator'
import styles from './ResultSummary.module.css'

interface Props {
  data: YearlyDataPoint[]
  color?: string
}

export default function ResultSummary({ data, color = '#4f46e5' }: Props) {
  if (data.length === 0) return null

  const last = data[data.length - 1]
  const gain = last.value - last.deposited
  const gainPct = last.deposited > 0 ? (gain / last.deposited) * 100 : 0

  return (
    <div className={styles.summary}>
      <div className={styles.card} style={{ borderTopColor: color }}>
        <span className={styles.cardLabel}>Slutvärde</span>
        <span className={styles.cardValue} style={{ color }}>
          {formatSEK(last.value)}
        </span>
      </div>
      <div className={styles.card}>
        <span className={styles.cardLabel}>Totalt inbetalt</span>
        <span className={styles.cardValue}>{formatSEK(last.deposited)}</span>
      </div>
      <div className={styles.card}>
        <span className={styles.cardLabel}>Total avkastning</span>
        <span className={styles.cardValue}>
          {formatSEK(gain)}
          <span className={styles.pct}> (+{gainPct.toFixed(1)}%)</span>
        </span>
      </div>
    </div>
  )
}
