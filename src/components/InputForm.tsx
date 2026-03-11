import { CalcParams } from '../utils/calculator'
import styles from './InputForm.module.css'

interface Props {
  params: CalcParams
  onChange: (params: CalcParams) => void
  label?: string
}

export default function InputForm({ params, onChange, label }: Props) {
  function update(field: keyof CalcParams, raw: string) {
    const value = parseFloat(raw) || 0
    onChange({ ...params, [field]: value })
  }

  return (
    <div className={styles.form}>
      {label && <h3 className={styles.label}>{label}</h3>}

      <div className={styles.field}>
        <label>Startkapital (kr)</label>
        <input
          type="number"
          min="0"
          value={params.principal || ''}
          onChange={e => update('principal', e.target.value)}
          placeholder="10 000"
        />
      </div>

      <div className={styles.field}>
        <label>Årsränta (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={params.annualRate || ''}
          onChange={e => update('annualRate', e.target.value)}
          placeholder="7"
        />
      </div>

      <div className={styles.field}>
        <label>Antal år</label>
        <input
          type="number"
          min="1"
          max="100"
          value={params.years || ''}
          onChange={e => update('years', e.target.value)}
          placeholder="30"
        />
      </div>

      <div className={styles.field}>
        <label>Månadsinsättning (kr)</label>
        <input
          type="number"
          min="0"
          value={params.monthlyDeposit || ''}
          onChange={e => update('monthlyDeposit', e.target.value)}
          placeholder="1 000"
        />
      </div>
    </div>
  )
}
