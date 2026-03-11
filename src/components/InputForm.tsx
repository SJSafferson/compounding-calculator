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

function step(field: keyof CalcParams, dir: 1 | -1, amount: number, min: number, max: number, params: CalcParams, onChange: Props['onChange']) {
  const next = Math.min(max, Math.max(min, params[field] + dir * amount))
  onChange({ ...params, [field]: next })
}

interface FieldConfig {
  key: keyof CalcParams
  label: string
  min: number
  max: number
  stepAmount: number
  unit: string
}

export default function InputForm({ params, onChange, label, tr }: Props) {
  const fields: FieldConfig[] = [
    { key: 'principal',      label: tr.principal,      min: 0, max: 1000000, stepAmount: 1000, unit: tr.unitKr    },
    { key: 'annualRate',     label: tr.annualRate,     min: 0, max: 30,      stepAmount: 0.1,  unit: tr.unitPct   },
    { key: 'years',          label: tr.years,          min: 1, max: 50,      stepAmount: 1,    unit: tr.unitYears },
    { key: 'monthlyDeposit', label: tr.monthlyDeposit, min: 0, max: 20000,   stepAmount: 100,  unit: tr.unitKr    },
  ]

  return (
    <div className={styles.form}>
      {label && <h3 className={styles.label}>{label}</h3>}

      {fields.map(({ key, label: fieldLabel, min, max, stepAmount, unit }) => (
        <div key={key} className={styles.field}>
          <div className={styles.fieldHeader}>
            <label>{fieldLabel}</label>
            <span className={styles.value}>
              <input
                type="number"
                min={min}
                max={max}
                step={stepAmount}
                value={params[key] || ''}
                onChange={e => update(key, e.target.value, params, onChange)}
              />
              <div className={styles.steppers}>
                <button
                  className={styles.stepBtn}
                  onClick={() => step(key, 1, stepAmount, min, max, params, onChange)}
                  tabIndex={-1}
                >▲</button>
                <button
                  className={styles.stepBtn}
                  onClick={() => step(key, -1, stepAmount, min, max, params, onChange)}
                  tabIndex={-1}
                >▼</button>
              </div>
              <span className={styles.unit}>{unit}</span>
            </span>
          </div>
          <input
            type="range"
            className={styles.slider}
            min={min}
            max={max}
            step={stepAmount}
            value={params[key]}
            onChange={e => update(key, e.target.value, params, onChange)}
          />
        </div>
      ))}
    </div>
  )
}
