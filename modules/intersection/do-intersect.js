import { isSameSign } from './is-same-sign.js'
import { stock } from '../stock.js'

export function doIntersect(prev, curr) {
  let x1 = stock.count - 1, y1 = prev.short.y
  let x2 = stock.count, y2 = curr.short.y
  let x3 = stock.count - 1, y3 = prev.long.y
  let x4 = stock.count, y4 = curr.long.y
  let a1, b1, c1, a2, b2, c2
  let r1, r2, r3, r4
  let denom

  a1 = y2 - y1
  b1 = x1 - x2
  c1 = x2 * y1 - x1 * y2

  r3 = a1 * x3 + b1 * y3 + c1
  r4 = a1 * x4 + b1 * y4 + c1

  if (r3 !== 0 && r4 !== 0 && isSameSign(r3, r4)) return false

  a2 = y4 - y3
	b2 = x3 - x4
	c2 = x4 * y3 - x3 * y4

  r1 = a2 * x1 + b2 * y1 + c2
	r2 = a2 * x2 + b2 * y2 + c2

  if (r1 !== 0 && r2 !== 0 && isSameSign(r1, r2)) return false

  denom = a1 * b2 - a2 * b1
	if (denom === 0) return true

	return true
}
