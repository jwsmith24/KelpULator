// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')

const operators = ['+', '-', '/', '*'];
const MAX_LENGTH = 16;

// Variables for Operations

let currentExpression = '';
let result = 0;

let operatorEntered = false;


// Operations
// All operations take 2 arrays as an argument

function add(a, b) {

    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {

    if (b !== 0) return a / b;

    console.log("I can't believe you tried to divide by zero...");
    return undefined;
}



// only one expression should ever be passed at a time
function evaluateExpression() {

    // split the expression string into components on the operator
    const expression = currentExpression.split(/([+*/-])/);

    // [1, +, 3]
    const first = parseInt(expression[0]);
    const operator = expression[1];
    const second = parseInt(expression[2]);


    switch (operator) {
        case '+': result = add(first, second);
            break;

        case '-': result = subtract(first, second);
            break;

        case '*': result = multiply(first, second);
            break;

        case '/': result = divide(first, second);
    }

    updateDisplay(result);
    currentExpression = result;


    return result;
}




function updateDisplay(value) {

    display.textContent = value;
}

// check if last input was an operator
function isPrevInputOperator() {
    return (operators.includes(currentExpression[currentExpression.length - 1]));
}

function overwriteOperator(newOperator) {
    currentExpression = currentExpression.replace(/[+*/-]/, newOperator);

}

function isOperator(input) {
    return (operators.includes(input));
}


function handleInput(input) {
    // check for clear
    if (input === "Escape") {
        clearCalculator();
        resetDisplay();
        operatorEntered = false;
        return;
    }

    // check for equals 
    if (input === "Enter") {
        operatorEntered = false;
        result = evaluateExpression();
        return;
    }

    // check for max input length
    if (currentExpression.length > MAX_LENGTH && !isOperator(input)) {
        display.textContent = "Max length exceeded";
        return;
    }


    // Handle consecutive operators
    if (operators.includes(input) && operatorEntered) {

        if (!isPrevInputOperator()) {
            result = evaluateExpression();

        } else {
            // overwrite last operator
            overwriteOperator(input);
            updateDisplay(currentExpression);
            return
        }

    }

    // track that operator has been entered
    if (operators.includes(input)) {
        operatorEntered = true;
    }

    // add user input to the current expression
    currentExpression += input;
    updateDisplay(currentExpression);

}

function applyBackspace() {
    // slice string to get whole string - last element;
    const backspacedExpression = currentExpression.slice(0, -1);
    currentExpression = backspacedExpression;
}

function clearCalculator() {
    currentExpression = '';
    result = 0;
}

function resetDisplay() {
    display.textContent = "Let's Kelp-u-Late!";
}

function handleKeyBoardInput(event) {
    const key = event.key;

    // make sure input is a number or operator before updating display
    if (!isNaN(parseInt(key)) || ['+', '-', '/', '*', 'Enter', 'Escape'].includes(key)) {
        handleInput(key);
    }
}




// Listeners

window.addEventListener('keydown', handleKeyBoardInput);

buttons.forEach(button => button.addEventListener('click', () => handleInput(button.id)));
