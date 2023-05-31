// 2023-02-22T08:00:00.000Z -> 2023-02-22
export function formatDate(date) {
  return new Date(date).toISOString().split("T")[0]
}

export function formatMoney(amount) {
  return Number(amount).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
}
