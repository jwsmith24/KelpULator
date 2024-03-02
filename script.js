// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')


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


function handleInput(input) {
    // check for clear
    if (input === "Escape") {
        clearCalculator();
        resetDisplay();
        return;
    }

    // check for equals 
    if (input === "Enter") {
        evaluateExpression();
        result = 0;

        return;
    }

    // add user input to the current expression

    currentExpression += input;
    updateDisplay(currentExpression);




}

function clearCalculator() {
    currentExpression = '';
    result = 0;
}

function resetDisplay() {
    display.textContent = "Let's Kelp-u-Late!";
}



// Listeners

window.addEventListener('keydown', handleKeyBoardInput);


function handleKeyBoardInput(event) {
    const key = event.key;

    // make sure input is a number or operator before updating display
    if (!isNaN(parseInt(key)) || ['+', '-', '/', '*', 'Enter', 'Escape'].includes(key)) {
        handleInput(key);
    }

    // otherwise do nothing
}



buttons.forEach(button => button.addEventListener('click', () => handleInput(button.id)));




