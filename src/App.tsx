import { useState } from 'react'
import { CalcParams, calculateGrowth } from './utils/calculator'
import InputForm from './components/InputForm'
import ResultSummary from './components/ResultSummary'
import GrowthChart from './components/GrowthChart'
import ComparisonPanel from './components/ComparisonPanel'
import styles from './App.module.css'

const defaults: CalcParams = {
  principal: 10000,
  annualRate: 7,
  years: 30,
  monthlyDeposit: 1000,
}

export default function App() {
  const [params, setParams] = useState<CalcParams>(defaults)
  const [paramsB, setParamsB] = useState<CalcParams>({ ...defaults, annualRate: 5 })
  const [compareMode, setCompareMode] = useState(false)

  const data = calculateGrowth(params)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Ränta på ränta</h1>
        <p>Se hur ditt kapital växer med sammansatt ränta</p>
        <button
          className={`${styles.compareBtn} ${compareMode ? styles.active : ''}`}
          onClick={() => setCompareMode(v => !v)}
        >
          {compareMode ? 'Stäng jämförelse' : 'Jämför scenarier'}
        </button>
      </header>

      <main className={styles.main}>
        {compareMode ? (
          <ComparisonPanel
            paramsA={params}
            paramsB={paramsB}
            onChangeA={setParams}
            onChangeB={setParamsB}
          />
        ) : (
          <div className={styles.single}>
            <InputForm params={params} onChange={setParams} />
            <ResultSummary data={data} />
            <GrowthChart data={data} />
          </div>
        )}
      </main>
    </div>
  )
}
