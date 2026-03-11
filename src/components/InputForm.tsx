import { CalcParams } from '../utils/calculator'
import { Translations } from '../utils/translations'
import styles from './InputForm.module.css'

interface Props {
  params: CalcParams
  onChange: (params: CalcParams) => void
  label?: string
  tr: Translations
}

function update(field: keyof CalcParams, raw: string, params: CalcParams, onChange: Props['onChange']) {
  const value = parseFloat(raw) || 0
  onChange({ ...params, [field]: value })
}

export default function InputForm({ params, onChange, label, tr }: Props) {
  return (
    <div className={styles.form}>
      {label && <h3 className={styles.label}>{label}</h3>}

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label>{tr.principal}</label>
          <span className={styles.value}>
            <input type="number" min={0} max={1000000} step={1000}
              value={params.principal || ''}
              onChange={e => update('principal', e.target.value, params, onChange)} />
            <span className={styles.unit}>{tr.unitKr}</span>
          </span>
        </div>
        <input type="range" className={styles.slider} min={0} max={1000000} step={1000}
          value={params.principal}
          onChange={e => update('principal', e.target.value, params, onChange)} />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label>{tr.annualRate}</label>
          <span className={styles.value}>
            <input type="number" min={0} max={30} step={0.1}
              value={params.annualRate || ''}
              onChange={e => update('annualRate', e.target.value, params, onChange)} />
            <span className={styles.unit}>{tr.unitPct}</span>
          </span>
        </div>
        <input type="range" className={styles.slider} min={0} max={30} step={0.1}
          value={params.annualRate}
          onChange={e => update('annualRate', e.target.value, params, onChange)} />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label>{tr.years}</label>
          <span className={styles.value}>
            <input type="number" min={1} max={50} step={1}
              value={params.years || ''}
              onChange={e => update('years', e.target.value, params, onChange)} />
            <span className={styles.unit}>{tr.unitYears}</span>
          </span>
        </div>
        <input type="range" className={styles.slider} min={1} max={50} step={1}
          value={params.years}
          onChange={e => update('years', e.target.value, params, onChange)} />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label>{tr.monthlyDeposit}</label>
          <span className={styles.value}>
            <input type="number" min={0} max={20000} step={100}
              value={params.monthlyDeposit || ''}
              onChange={e => update('monthlyDeposit', e.target.value, params, onChange)} />
            <span className={styles.unit}>{tr.unitKr}</span>
          </span>
        </div>
        <input type="range" className={styles.slider} min={0} max={20000} step={100}
          value={params.monthlyDeposit}
          onChange={e => update('monthlyDeposit', e.target.value, params, onChange)} />
      </div>
    </div>
  )
}
