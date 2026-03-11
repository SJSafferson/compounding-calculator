import { CalcParams, calculateGrowth } from '../utils/calculator'
import InputForm from './InputForm'
import ResultSummary from './ResultSummary'
import GrowthChart from './GrowthChart'
import styles from './ComparisonPanel.module.css'

interface Props {
  paramsA: CalcParams
  paramsB: CalcParams
  onChangeA: (p: CalcParams) => void
  onChangeB: (p: CalcParams) => void
}

const COLOR_A = '#4f46e5'
const COLOR_B = '#e05c2a'

export default function ComparisonPanel({ paramsA, paramsB, onChangeA, onChangeB }: Props) {
  const dataA = calculateGrowth(paramsA)
  const dataB = calculateGrowth(paramsB)

  return (
    <div className={styles.grid}>
      <div className={styles.scenario}>
        <InputForm params={paramsA} onChange={onChangeA} label="Scenario A" />
        <ResultSummary data={dataA} color={COLOR_A} />
        <GrowthChart data={dataA} color={COLOR_A} />
      </div>
      <div className={styles.divider} />
      <div className={styles.scenario}>
        <InputForm params={paramsB} onChange={onChangeB} label="Scenario B" />
        <ResultSummary data={dataB} color={COLOR_B} />
        <GrowthChart data={dataB} color={COLOR_B} />
      </div>
    </div>
  )
}
