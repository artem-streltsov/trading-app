export function isBearishKicker(prev, curr) {
  return prev.open < prev.close &&
         curr.open > curr.close &&
         prev.open > curr.open
}

export function isBullishKicker(prev, curr) {
  return prev.open > prev.close &&
         curr.open < curr.close &&
         prev.open < curr.open
}

export function isShootingStar(prev, curr) {
  return prev.open < prev.close &&
         curr.open > curr.close &&
         prev.close < curr.close &&
         curr.high - curr.close > 2 * (curr.open - curr.close) &&
         curr.open - curr.close > curr.close - curr.low
}
