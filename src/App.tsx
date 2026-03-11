import { useState } from 'react'
import { CalcParams, calculateGrowth } from './utils/calculator'
import { Lang, t } from './utils/translations'
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
  const [lang, setLang] = useState<Lang>('sv')

  const tr = t[lang]
  const data = compareMode ? [] : calculateGrowth(params)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button
          className={styles.langBtn}
          onClick={() => setLang(l => l === 'sv' ? 'en' : 'sv')}
        >
          {lang === 'sv' ? 'EN' : 'SV'}
        </button>
        <h1>{tr.title}</h1>
        <p>{tr.subtitle}</p>
        <button
          className={`${styles.compareBtn} ${compareMode ? styles.active : ''}`}
          onClick={() => setCompareMode(v => !v)}
        >
          {compareMode ? tr.closeCompare : tr.compare}
        </button>
      </header>

      <main className={styles.main}>
        {compareMode ? (
          <ComparisonPanel
            paramsA={params}
            paramsB={paramsB}
            onChangeA={setParams}
            onChangeB={setParamsB}
            tr={tr}
          />
        ) : (
          <div className={styles.single}>
            <InputForm params={params} onChange={setParams} tr={tr} />
            <ResultSummary data={data} tr={tr} />
            <GrowthChart data={data} tr={tr} />
          </div>
        )}
      </main>

      <footer className={styles.footer}>{tr.disclaimer}</footer>
    </div>
  )
}
