export interface CalcParams {
  principal: number
  annualRate: number
  years: number
  monthlyDeposit: number
}

export interface YearlyDataPoint {
  year: number
  value: number
  deposited: number
}

export function calculateGrowth(params: CalcParams): YearlyDataPoint[] {
  const { principal, annualRate, years, monthlyDeposit } = params
  const monthlyRate = annualRate / 100 / 12
  const result: YearlyDataPoint[] = []

  let balance = principal
  let totalDeposited = principal

  result.push({ year: 0, value: Math.round(balance), deposited: Math.round(totalDeposited) })

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit
      totalDeposited += monthlyDeposit
    }
    result.push({
      year: y,
      value: Math.round(balance),
      deposited: Math.round(totalDeposited),
    })
  }

  return result
}

export function formatSEK(value: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(value)
}
