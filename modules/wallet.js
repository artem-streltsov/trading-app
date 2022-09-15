import { stock } from "./stock.js"
import { level } from "./level.js"

export let wallet = {
  money_available: 0,
  owned_stocks: 0,
  profit: 0,
  setMoneyAvailable: function() {
    this.money_available = level.initial_capital
  },
  displayMoneyAvailable: function() {
    document.getElementById('money-available').textContent = 'Money available: ' + Math.round(this.money_available)
  },
  displayOwnedStocks: function() {
    document.getElementById('owned-stocks').textContent = 'Stocks owned: ' + this.owned_stocks
  },
  getProfit: function() {
    this.profit = Math.round(this.money_available + this.owned_stocks * stock.price - level.initial_capital)
  },
  displayProfit: function() {
    document.getElementById('profit').textContent = 'Profit: ' + this.profit
  },
  update: function() {
    this.displayMoneyAvailable()
    this.displayOwnedStocks()
    this.getProfit()
    this.displayProfit()
  }
}