import { CalcParams } from '../utils/calculator'
import styles from './InputForm.module.css'

interface Props {
  params: CalcParams
  onChange: (params: CalcParams) => void
  label?: string
}

const sliderConfig = {
  principal:      { min: 0,   max: 1000000, step: 1000 },
  annualRate:     { min: 0,   max: 30,      step: 0.1  },
  years:          { min: 1,   max: 50,      step: 1    },
  monthlyDeposit: { min: 0,   max: 20000,   step: 100  },
}

export default function InputForm({ params, onChange, label }: Props) {
  function update(field: keyof CalcParams, raw: string) {
    const value = parseFloat(raw) || 0
    onChange({ ...params, [field]: value })
  }

  function Field({ field, labelText, unit }: { field: keyof CalcParams; labelText: string; unit: string }) {
    const cfg = sliderConfig[field]
    return (
      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label>{labelText}</label>
          <span className={styles.value}>
            <input
              type="number"
              min={cfg.min}
              max={cfg.max}
              step={cfg.step}
              value={params[field] || ''}
              onChange={e => update(field, e.target.value)}
            />
            <span className={styles.unit}>{unit}</span>
          </span>
        </div>
        <input
          type="range"
          className={styles.slider}
          min={cfg.min}
          max={cfg.max}
          step={cfg.step}
          value={params[field]}
          onChange={e => update(field, e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className={styles.form}>
      {label && <h3 className={styles.label}>{label}</h3>}
      <Field field="principal"      labelText="Startkapital"      unit="kr" />
      <Field field="annualRate"     labelText="Årsränta"          unit="%" />
      <Field field="years"          labelText="Antal år"          unit="år" />
      <Field field="monthlyDeposit" labelText="Månadsinsättning"  unit="kr" />
    </div>
  )
}
