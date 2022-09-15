export let message = {
  message: '',
  displayMessage: function() {
    document.getElementById('error-message').textContent = this.message
  },
  notEnoughFunds: function() {
    this.message = 'Not enough funds.'
    this.displayMessage()
  },
  notEnoughStocks: function() {
    this.message = 'Not enough stocks.'
    this.displayMessage()
  },
  incorrectInput: function() {
    this.message = 'Must be an integer greater than 0.'
    this.displayMessage()
  },
  removeErrorMessage: function() {
    this.message = ''
    this.displayMessage()
  }
}
