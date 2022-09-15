export function drawNewPlot(plot) {
  Plotly.newPlot(plot.container, plot.data, plot.layout);
}

export function updatePlot(plot) {
  Plotly.update(plot.container, plot.data, plot.layout)
}
