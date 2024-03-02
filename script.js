// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')


// Variables for Operations
let userInput = [];
let currentExpression = '';
let result = 0;


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


function performOperation() {

    let result;

    const first = parseInt(a.join(''));
    const second = parseInt(b.join(''));


    switch (operator) {

        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case '*':
            result = multiply(first, second);
            break;
        case '/':
            result = divide(first, second);
            break;
        default:
            // user hit enter before an operator was provided, return first value
            console.log("Operation not supported");
            result = first;
    }

    return result;


}


function updateDisplay(currentExpression) {

    display.textContent = currentExpression;
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
        display.textContent = performOperation();
        clearCalculator();
        return;
    }


    // add user input to the current expression

    currentExpression += input;
    updateDisplay(currentExpression);




}

function clearCalculator() {
    a = [];
    b = [];
    operatorPressed = false;
    operator = undefined;

}

function resetDisplay() {
    display.textContent = "Let's Kelp-u-Late!";
}



window.addEventListener('keydown', handleKeyBoardInput);


function handleKeyBoardInput(event) {
    const key = event.key;

    // make sure input is a number or operator before updating display
    if (!isNaN(parseInt(key)) || ['+', '-', '/', '*', 'Enter', 'Escape'].includes(key)) {
        handleInput(key);


    }

}



buttons.forEach(button => button.addEventListener('click', () => handleInput(button.id)));




