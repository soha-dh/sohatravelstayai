export const CLEANING_FEE = 40
export const SERVICE_FEE = 30

export function getNightCount(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(nights, 1)
}

export function getPriceBreakdown(pricePerNight: number, nights: number) {
  const stayTotal = pricePerNight * nights
  return {
    nights,
    stayTotal,
    cleaningFee: CLEANING_FEE,
    serviceFee: SERVICE_FEE,
    total: stayTotal + CLEANING_FEE + SERVICE_FEE,
  }
}

export function formatStayDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`)
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  return `${month} ${date.getDate()}, ${weekday}`
}