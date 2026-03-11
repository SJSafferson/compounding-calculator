import { CalcParams, calculateGrowth } from '../utils/calculator'
import { Translations } from '../utils/translations'
import InputForm from './InputForm'
import ResultSummary from './ResultSummary'
import GrowthChart from './GrowthChart'
import styles from './ComparisonPanel.module.css'

interface Props {
  paramsA: CalcParams
  paramsB: CalcParams
  onChangeA: (p: CalcParams) => void
  onChangeB: (p: CalcParams) => void
  tr: Translations
}

const COLOR_A = '#4f46e5'
const COLOR_B = '#e05c2a'

export default function ComparisonPanel({ paramsA, paramsB, onChangeA, onChangeB, tr }: Props) {
  const dataA = calculateGrowth(paramsA)
  const dataB = calculateGrowth(paramsB)

  return (
    <div className={styles.grid}>
      <div className={styles.scenario}>
        <InputForm params={paramsA} onChange={onChangeA} label={tr.scenarioA} tr={tr} />
        <ResultSummary data={dataA} color={COLOR_A} tr={tr} />
        <GrowthChart data={dataA} color={COLOR_A} tr={tr} />
      </div>
      <div className={styles.divider} />
      <div className={styles.scenario}>
        <InputForm params={paramsB} onChange={onChangeB} label={tr.scenarioB} tr={tr} />
        <ResultSummary data={dataB} color={COLOR_B} tr={tr} />
        <GrowthChart data={dataB} color={COLOR_B} tr={tr} />
      </div>
    </div>
  )
}
