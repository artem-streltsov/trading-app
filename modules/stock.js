export let stock = {
  id: '',
  url: '',
  data: [],
  price: 0,
  count: 0,
  getId: function() {
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    this.id = urlParams.get('stock_id')
  },
  displayId: function() {
    document.getElementById('stock-id').textContent = this.id
  },
  getUrl: function() {
    this.url = './json/' + this.id + '.json'
  },
  getData: async function() {
    let response = await fetch(stock.url)
    this.data = await response.json()
  },
  getPrice: function() {
    this.price = this.data[this.count].close
  },
  incrementCount: function() {
    this.count = this.count + 1
  }
}