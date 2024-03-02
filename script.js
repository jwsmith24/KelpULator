// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')

const operators = ['+', '-', '/', '*'];

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
    currentExpression.replace(/[+*/-]/, newOperator);

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
        result = evaluateExpression();
        return;
    }

    // don't evaluate if expression only has one value
    if (operators.includes(input) && currentExpression.length > 1) {

        if (!isPrevInputOperator) {
            result = evaluateExpression();
        } else {
            // overwrite last operator
            overwriteOperator(input);
            return;

        }

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
