import { stock } from "../stock.js"
import { pattern } from '../pattern-recognition/pattern.js'
import { newShape } from '../new-layout/new-shape.js'
import { newAnnotation } from '../new-layout/new-annotation.js'

export let candlestick = {
  container: 'candlestick-chart',
  data: [{
    x: [],
    open: [],
    high: [],
    low: [],
    close: [],
    type: 'candlestick'
  }],
  layout: {
    dragmode: 'zoom',
    title: 'Candlestick Chart',
    shapes: [],
    annotations: [],
    xaxis: {
      autorange: true,
      type: 'date',
      rangeslider: { visible: false }
    },
    yaxis: {
      autorange: true,
      type: 'linear',
      title: 'Price($)'
    }
  },
  extend: function() {
    if (this.data[0].x.length >= 14) {
      this.data[0].x.shift()
      this.data[0].open.shift()
      this.data[0].high.shift()
      this.data[0].low.shift()
      this.data[0].close.shift()
    }
    this.data[0].x.push(stock.data[stock.count].date)
    this.data[0].open.push(stock.data[stock.count].open)
    this.data[0].high.push(stock.data[stock.count].high)
    this.data[0].low.push(stock.data[stock.count].low)
    this.data[0].close.push(stock.data[stock.count].close)
  },
  updateShapes: function() {
    if (this.layout.shapes.length > 12) this.layout.shapes.shift()
    let new_shape = pattern.name ? newShape(pattern.prev.date, pattern.curr.date) : null
    this.layout.shapes.push(new_shape)
  },
  updateAnnotations: function() {
    if (this.layout.annotations.length > 12) this.layout.annotations.shift()
    let new_annotation = pattern.name ? newAnnotation(pattern.prev.date, pattern.name) : null
    this.layout.annotations.push(new_annotation)
  }
}