import { doIntersect } from './do-intersect.js'
import { moving_average } from '../charts/moving-average.js'

export let point = {
  prev: {
    short: {},
    long: {}
  },
  curr: {
    short: {},
    long: {}
  },
  intersect: false,
  updatePrev: function() {
    this.prev.short = {
        x: moving_average.data[0].x[moving_average.data[0].x.length - 2],
        y: moving_average.data[0].y[moving_average.data[0].y.length - 2]
    }
    this.prev.long = {
        x: moving_average.data[1].x[moving_average.data[1].x.length - 2],
        y: moving_average.data[1].y[moving_average.data[1].y.length - 2]
    }
  },
  updateCurr: function() {
    this.curr.short = {
        x: moving_average.data[0].x[moving_average.data[0].x.length - 1],
        y: moving_average.data[0].y[moving_average.data[0].y.length - 1]
    }
    this.curr.long = {
        x: moving_average.data[1].x[moving_average.data[1].x.length - 1],
        y: moving_average.data[1].y[moving_average.data[1].y.length - 1]
    }
  },
  updateIntersect: function() {
    this.intersect = doIntersect(this.prev, this.curr)
  }
}
