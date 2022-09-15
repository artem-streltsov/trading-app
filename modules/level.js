import { stock } from './stock.js'

export const levels = [
  {
    name: 'Apple',
    id: 'APPL',
    initial_capital: 1000,
    required_profit: 100,
    difficulty: 'easy'
  },
  {
    name: 'Tesla',
    id: 'TSLA',
    initial_capital: 1000,
    required_profit: 200,
    difficulty: 'easy'
  },
  {
    name: 'Nike',
    id: 'NKE',
    initial_capital: 10000,
    required_profit: 5000,
    difficulty: 'medium'
  }
]

export let level = {
  initial_capital: 0,
  required_profit: 0,
  getInitialCapital: function() {
    for (let i = 0; i < levels.length; i++) {
      if (stock.id === levels[i].id) {
        this.initial_capital = levels[i].initial_capital
      }
    }
  },
  getRequiredProfit: function() {
    for (let i = 0; i < levels.length; i++) {
      if (stock.id === levels[i].id) {
        this.required_profit = levels[i].required_profit
      }
    }
  },
  displayRequiredProfit: function() {
    document.getElementById('required-profit').textContent = 'Required profit: ' + this.required_profit
  }
}