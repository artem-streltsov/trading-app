import { stock } from "../stock.js"
import { getSimpleMovingAverage, getWeightedMovingAverage } from './average.js'
import { newShape } from '../new-layout/new-shape.js'
import { newAnnotation } from '../new-layout/new-annotation.js'
import { point } from '../intersection/point.js'
import { getSlope } from '../intersection/get-slope.js'
import { isGoldenCross } from '../intersection/is-golden-cross.js'
import  { updatePlot } from './plot.js'

export let moving_average = {
  day_short: 5,
  day_long: 15,
  type: 'sma',
  container: 'moving-average-chart',
  data: [
    {
      x: [],
      y: [],
      type: 'scatter',
      mode: 'lines',
      name: 'Short-term SMA'
    },
    {
      x: [],
      y: [],
      type: 'scatter',
      mode: 'lines',
      name: 'Long-term SMA'
    }
  ],
  layout: {
    dragmode: 'zoom',
    title: 'Moving Average Chart',
    shapes: [],
    annotations: [],
    xaxis: {
      autorange: true,
      type: 'date',
      rangeslider: { visible: false },
    },
    yaxis: {
      autorange: true,
      type: 'linear',
      title: 'Price($)'
    }
  },
  extendShortMovingAverage: function() {
    if (this.data[0].x.length >= 14) {
      this.data[0].x.shift()
      this.data[0].y.shift()
    }

    if (stock.count >= this.day_short) {
      this.data[0].x.push(stock.data[stock.count].date)

      let y = (this.type === 'sma')
        ? getSimpleMovingAverage(this.day_short)
        : getWeightedMovingAverage(this.day_short)

      this.data[0].y.push(y)
    }
  },
  extendLongMovingAverage: function() {
    if (this.data[1].x.length >= 14) {
      this.data[1].x.shift()
      this.data[1].y.shift()
    }

    if (stock.count >= this.day_long) {
      this.data[1].x.push(stock.data[stock.count].date)

      let y = (this.type === 'sma')
        ? getSimpleMovingAverage(this.day_long)
        : getWeightedMovingAverage(this.day_long)

      this.data[1].y.push(y)
    }
  },
  updateShapes: function() {
    if (this.layout.shapes.length > 12) this.layout.shapes.shift()

    let new_shape = point.intersect ? newShape(point.prev.short.x, point.curr.short.x) : null

    this.layout.shapes.push(new_shape)
  },
  updateAnnotations: function() {
    if (this.layout.annotations.length > 12) this.layout.annotations.shift()

    let slope_short = getSlope(point.prev.short.y, point.curr.short.y)
    let slope_long = getSlope(point.prev.long.y, point.curr.long.y)
    let text = isGoldenCross(slope_short, slope_long) ? 'Buy' : 'Sell'

    let new_annotation = point.intersect ? newAnnotation(point.prev.short.x, text) : null

    this.layout.annotations.push(new_annotation)
  },
  changeSettings: function() {
    let short_term_input = Number(document.getElementById('short-term-input').value)
    let long_term_input = Number(document.getElementById('long-term-input').value)
    let type_input = document.getElementById('options').value

    if (short_term_input > 15 || short_term_input < 1 || !Number.isInteger(short_term_input)) {
      alert('Short-term input must be an integer between 1 and 14')
      return this.resetInputs()
    }
    else if (long_term_input > 30 || long_term_input < 15 || !Number.isInteger(long_term_input)) {
      alert('Long-term input must be an integer between 15 and 30')
      return this.resetInputs()
    }

    this.day_short = short_term_input
    this.day_long = long_term_input
    this.type = type_input

    this.data[0].x = []
    this.data[0].y = []
    this.data[0].name = 'Short-term ' + type_input.toUpperCase()

    this.data[1].x = []
    this.data[1].y = []
    this.data[1].name = 'Long-term ' + type_input.toUpperCase()

    this.layout.shapes = []
    this.layout.annotations = []

    updatePlot(this)

    console.log('Short-term input: ', this.day_short)
    console.log('Long-term-input: ', this.day_long)
    console.log('Type: ', this.type)
  },
  resetInputs: function() {
    document.getElementById('short-term-input').value = this.day_short
    document.getElementById('long-term-input').value = this.day_long
    document.getElementById('options').value = this.type
  }
}
