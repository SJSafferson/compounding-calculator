# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Installera beroenden
npm run dev        # Starta dev-server på localhost:5173
npm run build      # Bygg för produktion
npm run preview    # Förhandsgranska produktionsbygget
```

## Arkitektur

React + Vite + TypeScript. Recharts för diagram. CSS Modules för styling.

### Dataflöde
`App.tsx` håller state (`CalcParams`) och skickar ner via props. Beräkningar sker i `src/utils/calculator.ts` och anropas direkt vid rendering — ingen global state eller context.

### Nyckeltyper (`src/utils/calculator.ts`)
- `CalcParams` – inputparametrar (principal, annualRate, years, monthlyDeposit)
- `YearlyDataPoint` – `{ year, value, deposited }` — ett datapunkt per år
- `calculateGrowth(params)` – returnerar array av YearlyDataPoint, ackumulerar månadsvis
- `formatSEK(value)` – formaterar tal till svenska kronor

### Komponenter (`src/components/`)
| Fil | Ansvar |
|-----|--------|
| `InputForm` | Fyra kontrollade inputfält, anropar `onChange` vid varje tangentslag |
| `ResultSummary` | Visar slutvärde, totalt inbetalt och avkastning baserat på sista datapunkten |
| `GrowthChart` | Recharts `LineChart` med två linjer: portföljvärde vs. inbetalt |
| `ComparisonPanel` | Renderar två parallella instanser av InputForm + ResultSummary + GrowthChart |

### Jämförelseläge
Togglas med en knapp i headern i `App.tsx`. När aktivt visas `ComparisonPanel` med Scenario A (samma `params` som normal-läget) och Scenario B (separat `paramsB`-state).
