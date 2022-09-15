import { isBearishKicker, isBullishKicker, isShootingStar } from './candlestick-patterns.js'
import { stock } from '../stock.js'
import { candlestick } from '../charts/candlestick.js'

export let pattern = {
  show: true,
  prev: {},
  curr: {},
  name: '',
  toggleShow: function() {
    this.show = !this.show
    candlestick.layout.shapes = []
    candlestick.layout.annotations = []
  },
  updatePrev: function() {
    this.prev = stock.data[stock.count - 1]
  },
  updateCurr: function() {
    this.curr = stock.data[stock.count]
  },
  updateName: function() {
    if (isBearishKicker(this.prev, this.curr)) {
      this.name = 'Bearish Kicker'
    } else if (isBullishKicker(this.prev, this.curr)) {
      this.name = 'Bullish Kicker'
    } else if (isShootingStar(this.prev, this.curr)) {
      this.name = 'Shooting Star'
    } else {
      this.name = ''
    }
  }
}
