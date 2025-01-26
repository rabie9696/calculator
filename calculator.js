class Calculator {
  constructor() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    
    this.display = document.querySelector('.display');
    this.bindEvents();
  }

  bindEvents() {
    document.querySelector('.buttons').addEventListener('click', (event) => {
      if (!event.target.matches('button')) return;
      
      if (event.target.classList.contains('number')) {
        this.inputDigit(event.target.textContent);
      } else if (event.target.classList.contains('operator')) {
        this.handleOperator(event.target.dataset.action);
      } else if (event.target.classList.contains('special')) {
        this.handleSpecial(event.target.dataset.action);
      }
      
      this.updateDisplay();
    });
  }

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  }

  calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case 'add': return firstOperand + secondOperand;
      case 'subtract': return firstOperand - secondOperand;
      case 'multiply': return firstOperand * secondOperand;
      case 'divide': return firstOperand / secondOperand;
      case 'equals': return secondOperand;
    }
  }

  handleSpecial(action) {
    switch (action) {
      case 'clear':
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        break;
      case 'plusminus':
        this.displayValue = this.displayValue.charAt(0) === '-' ? 
          this.displayValue.slice(1) : '-' + this.displayValue;
        break;
      case 'percent':
        const value = parseFloat(this.displayValue);
        this.displayValue = `${value / 100}`;
        break;
    }
  }

  updateDisplay() {
    let displayValue = this.displayValue;
    if (displayValue.length > 9) {
      displayValue = parseFloat(displayValue).toExponential(3);
    }
    this.display.textContent = displayValue;
  }
}

new Calculator();