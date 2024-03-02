// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')


// Variables for Operations
let a = [];
let b = [];
let operator;
let operatorPressed = false;


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


function updateDisplay() {

    let result;

    (!operatorPressed) ? result = a : result = b;



    display.textContent = result;
}


function handleInput(input) {
    // check for clear
    if (input === "Escape") {
        clearCalculator();
        return;
    }

    // check for operator
    if (['+', '-', '*', '/'].includes(input)) {

        if (operatorPressed) {
            return; // do nothing

        } else {
            operator = input;
            return operatorPressed = true;
        }
    }
    // check for equals 
    if (input === "Enter") {

        evaluateInputs();
        return;
    }

    if (!operatorPressed) {
        a.push(input);
        updateDisplay();
        return;

    } else if (operatorPressed) {
        b.push(input);
        updateDisplay();
        return;
    }

}

function clearCalculator() {
    a = [];
    b = [];
    operatorPressed = false;
    display.textContent = "Let's Kelp-u-Late!";
}

function evaluateInputs() {
    display.textContent = "Kelp-u-lating ... ";


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




