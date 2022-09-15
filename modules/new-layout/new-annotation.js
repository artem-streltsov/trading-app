export function newAnnotation(startDate, text) {
  return {
    x: startDate,
    y: 1,
    xref: 'x',
    yref: 'paper',
    text: text,
    font: { color: 'black', size: 8 },
    showarrow: false,
    xanchor: 'left',
    ax: 0,
    ay: 0
  }
}
