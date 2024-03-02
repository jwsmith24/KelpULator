// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')


// Variables for Operations
let a;
let b;
let operator;

// Operations
// All operations take 2 numbers as an argument

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


function performOperation(operator, a, b) {

    let result;

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            console.log("Operation not supported");
            result = 0;
    }

    return result;


}

function updateDisplay(result) {

    display.textContent = result;
}

function handleInput(input) {

    // general logic:
    //  accept a value for A until an operator button is pressed
    // (if equals button is pressed just return the A  value and reset)

    // after operator button is pressed, accept a value for b until equals button is pressed
    // (if a second operator button is pressed, reset)



}

window.addEventListener('keydown', handleKeyBoardInput);


function handleKeyBoardInput(event) {
    const key = event.key;

    // make sure input is a number or operator before updating display
    if (!isNaN(parseInt(key)) || key === '+' || key === '-' || key === '*' || key === '/') {
        updateDisplay(key);
    }

    if (key === 'Escape') {
        clearDisplay();
    }

}

function clearDisplay() {
    display.textContent = "0";
}

buttons.forEach(button => button.addEventListener('click', () => updateDisplay(button.id)));




