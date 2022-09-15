export function newShape(startDate, endDate) {
  return {
    type: 'rect',
    xref: 'x',
    yref: 'paper',
    x0: startDate,
    y0: 0,
    x1: endDate,
    y1: 1,
    fillcolor: '#ffff00',
    opacity: 0.4,
    line: { width: 0 }
  }
}
