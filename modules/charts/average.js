import { stock } from '../stock.js'

export function getSimpleMovingAverage(day) {
  let sum = 0
  let average = 0

  for (let i = stock.count - day + 1; i <= stock.count; i++) {
    sum = sum + stock.data[i].close
  }

  average = sum / day
  return average
}

export function getWeightedMovingAverage(day) {
  let sum = 0
  let average = 0
  let weight = 0
  let total_weight = 0

  for (let i = stock.count - day + 1; i <= stock.count; i++) {
    weight++
    sum = sum + weight * stock.data[i].close
    total_weight = total_weight + weight
  }

  average = sum / total_weight
  return average
}
