function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function divide(a, b) {
    return (a / b);
}

function multiply(a, b) {
    return (a * b);
}

function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
          return add(a, b);
        case '-':
          return subtract(a, b);
        case 'x':
          return multiply(a, b);
        case '÷':
          if (b === 0) return null
          else return divide(a, b);
        default:
          return null;
      }
}

function operatorConversion(operator) {
    if (operator === '/') return '÷';
    if (operator === '*') return 'x';
    if (operator === '-') return '-';
    if (operator === '+') return '+';
  }

function round(num) {
    return Math.round(num * 1000) / 1000;
}

const lastOperation = document.getElementsByClassName('last-display')
const currentOperation = document.getElementsByClassName('current-display');

let operationType = null;
let screenClear = false;

function evaluate() {
    if (operationType === null || screenClear) {
        return;
    }
    if (operationType === '÷' && currentOperation.textContent === '0') {
        alert("You cannot divide by 0");
        return;
    }
    b = currentOperation.textContent;
    currentOperation.textContent = round(operate(a, operationType, b));
    lastOperation.textContent = `${a}${operationType}${b}`;
}