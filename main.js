const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const lastOperation = document.getElementById('last-display');
const currentOperation = document.getElementById('current-display');

let operationType = null;
let a = '';
let b = '';
let shouldDisplayClear = false;

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

function resetDisplay() {
    currentOperation.textContent = '';
    shouldDisplayClear = false;
}

function appendNum(num) {
    if (currentOperation.textContent === '0' || shouldDisplayClear) {
        resetDisplay();
    }
        currentOperation.textContent += num;
}

numberButtons.forEach((button) => 
    button.addEventListener('click', () => appendNum(button.textContent))
)

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => startOperation(button.textContent))
)

function evaluate() {
    if (operationType === null || shouldDisplayClear) {
        return;
    }
    if (operationType === '÷' && currentOperation.textContent === '0') {
        alert("You cannot divide by 0");
        return;
    }
    b = currentOperation.textContent;
    currentOperation.textContent = round(operate(a, operationType, b));
    lastOperation.textContent = a + operationType + b;
}

function startOperation(operator) {
    if (operationType !== null) {
        evaluate();
    }
    a = currentOperation.textContent;
    operationType = operator;
    lastOperation.textContent = a + operationType;
    shouldDisplayClear = true;
}

function clear() {
    currentOperation.textContent = '0';
    lastOperation.textContent = '';
    a = '';
    b = '';
    operationType = null;
}

function deleteNum() {
    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
}