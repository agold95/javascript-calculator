// queries all numbered buttons and links to functionality
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach((button) => 
    button.addEventListener('click', () => appendNum(button.textContent))
);

// queries all operator buttons and links to functionality
const operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach((button) => 
    button.addEventListener('click', () => startOperation(button.textContent))
);

// queries decimal button and links functionality
const decimalButton = document.getElementById('decimal-button');
decimalButton.addEventListener('click', addDecimal);

// queries clear button and links functionality
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clear);

// queries delete button and links functionality
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', deleteNum);

// queries equals button and links functionality
const equalsButton = document.getElementById('equals-button');
equalsButton.addEventListener('click', evaluate);

// queries current and last displays
const lastOperation = document.getElementById('last-display');
const currentOperation = document.getElementById('current-display');

// instantiates the three parts of an operation
let operationType = null;
let a = '';
let b = '';
let shouldDisplayClear = false;

// all mathematical functions
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

// operation function which returns result
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

// converts button design into functional buttons
function operatorConversion(operator) {
    if (operator === '/') return '÷';
    if (operator === '*') return 'x';
    if (operator === '-') return '-';
    if (operator === '+') return '+';
  }

// rounds decimals
function round(num) {
    return Math.round(num * 1000) / 1000;
}

// resets display
function resetDisplay() {
    currentOperation.textContent = '';
    shouldDisplayClear = false;
}

// appends numbers to display screen
function appendNum(num) {
    if (currentOperation.textContent === '0' || shouldDisplayClear) {
        resetDisplay();
    }
        currentOperation.textContent += num;
}

// evaluates mathematical functions and displays result
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
    lastOperation.textContent = a + operationType + b + '=';
    operationType = null;
}

// starts operation and displays first operator and the operation type
function startOperation(operator) {
    if (operationType !== null) {
        evaluate();
    }
    a = currentOperation.textContent;
    operationType = operator;
    lastOperation.textContent = a + operationType;
    shouldDisplayClear = true;
}

// clears display
function clear() {
    currentOperation.textContent = '0';
    lastOperation.textContent = '';
    a = '';
    b = '';
    operationType = null;
}

// deletes single number from display
function deleteNum() {
    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
    if (currentOperation.textContent === '') {
        currentOperation.textContent = '0';
    }
}

// adds decimal to display
function addDecimal () {
    if (shouldDisplayClear) {
        resetDisplay();
    }
    if (currentOperation.textContent === '') {
        currentOperation.textContent = '0';
    }
    if (currentOperation.textContent.includes('.')) {
        return;
    }
    currentOperation.textContent += '.';
}