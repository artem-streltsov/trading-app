import { wallet } from './wallet.js'
import { level } from './level.js'

export function stopSimulation() {
  let isPassed = wallet.profit >= level.required_profit

  window.open(`result.html?profit=${wallet.profit}&required_profit=${level.required_profit}&isPassed=${isPassed}`, '_self')
}
