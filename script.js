// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*')


// Variables for Operations
let a = [];
let b = [];
let operator = undefined;
let operatorPressed = false;


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
            console.log("Operation not supported");
            result = 0;
    }

    return result;


}


function updateDisplay() {

    // concat array elements into a string with no seperation
    const result = (!operatorPressed) ? a.join('') : b.join('');

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

        console.log(performOperation());
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
    operator = undefined;
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




