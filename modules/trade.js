import { stock } from "./stock.js"
import { wallet } from './wallet.js'
import { message } from './message.js'

export let trade = {
  number_of_stocks: 0,
  total_price: 0,
  getNumberOfStocks: function() {
    this.number_of_stocks = Number(document.getElementById('number-of-stocks').value)
  },
  isValidNumber: function() {
    return (this.number_of_stocks > 0 && Number.isInteger(this.number_of_stocks))
  },
  getTotalPrice: function() {
    this.total_price = this.number_of_stocks * stock.price
  },
  buyStock: function() {
    this.getNumberOfStocks()
    if (!this.isValidNumber()) return message.incorrectInput()
    this.getTotalPrice()

    if (this.total_price < wallet.money_available) {
      wallet.owned_stocks += this.number_of_stocks
      wallet.money_available -= this.total_price
      message.removeErrorMessage()
    }
    else {
      message.notEnoughFunds()
    }
    wallet.update()
  },
  sellStock: function() {
    this.getNumberOfStocks()
    if (!this.isValidNumber()) return message.incorrectInput()
    this.getTotalPrice()

    if (wallet.owned_stocks >= this.number_of_stocks) {
      wallet.owned_stocks -= this.number_of_stocks
      wallet.money_available += this.total_price
      message.removeErrorMessage()
    }
    else {
      message.notEnoughStocks()
    }
    wallet.update()
  }
}
