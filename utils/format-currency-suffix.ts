export function formatCurrencyValueWithSuffix(value: number, prefix: string = "R$ "): string {
  if (value >= 1000000000) {
    return prefix + (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G"
  }
  if (value >= 1000000) {
    return prefix + (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (value >= 1000) {
    return prefix + (value / 1000).toFixed(1).replace(/\.0$/, "") + "k"
  }
  return prefix + value.toString()
}
