import { stock } from './modules/stock.js'
import { level } from './modules/level.js'
import { wallet } from './modules/wallet.js'
import { candlestick } from './modules/charts/candlestick.js'
import { moving_average } from './modules/charts/moving-average.js'
import { drawNewPlot, updatePlot } from './modules/charts/plot.js'
import { pattern } from './modules/pattern-recognition/pattern.js'
import { point } from './modules/intersection/point.js'
import { trade } from './modules/trade.js'
import { stopSimulation } from './modules/result.js'

(async () => {
  let interval_constant = 2000

  // stock.js
  stock.getId()
  stock.displayId()
  stock.getUrl()
  stock.getData()
    .then(() => { stock.getPrice() })

  // level.js
  level.getInitialCapital()
  level.getRequiredProfit()
  level.displayRequiredProfit()

  // wallet.js
  wallet.setMoneyAvailable()
  wallet.update()

  // charts
  drawNewPlot(candlestick)
  drawNewPlot(moving_average)

  // event listeners
  document.getElementById('buy-btn').addEventListener('click', () => { trade.buyStock() })
  document.getElementById('sell-btn').addEventListener('click', () => { trade.sellStock() })
  document.getElementById('change-settings-btn').addEventListener('click', () => { moving_average.changeSettings() })
  document.getElementById('pattern-recognition-checkbox').addEventListener('click', () => { pattern.toggleShow() })
  document.getElementById('stop-simulation-btn').addEventListener('click', () => { stopSimulation() })

  let interval = setInterval(() => {

    // clear interval
    if (stock.count === stock.data.length - 1) clearInterval(interval)

    // update stock price
    stock.getPrice()

    // update candlestick chart
    candlestick.extend()

    if (stock.count > 1) {
      pattern.updatePrev()
      pattern.updateCurr()
      pattern.updateName()

      if (pattern.show) {
        candlestick.updateShapes()
        candlestick.updateAnnotations()
      }
    }

    updatePlot(candlestick)

    // update moving average chart
    moving_average.extendShortMovingAverage()
    moving_average.extendLongMovingAverage()

    if (moving_average.data[1].x.length > 1) {
      point.updatePrev()
      point.updateCurr()
      point.updateIntersect()

      moving_average.updateShapes()
      moving_average.updateAnnotations()
    }

    updatePlot(moving_average)

    // update profit
    wallet.getProfit()
    wallet.displayProfit()

    // update stock count
    stock.incrementCount()

  }, interval_constant)
})()
