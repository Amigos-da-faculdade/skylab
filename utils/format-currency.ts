export function formatCurrency(number: number): string {
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}
