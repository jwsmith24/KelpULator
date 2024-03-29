// Elements
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.buttons>*');
const funFactText = document.querySelector('#fact');
const kelpButton = document.querySelector('#kelp');
const operatorButtons = document.querySelectorAll('.operator-buttons>*');

const operators = ['+', '-', '/', '*'];
const MAX_LENGTH = 16;

// Variables for Operations
let currentExpression = '';
let result = 0;
let operatorEntered = false;


// Operations
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

    // check for backspace
    if (input === "Backspace") {
        applyBackspace();
        return;
    }

    // check for equals 
    if (input === "Enter") {
        funFactText.textContent = pickFunFact();
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

    console.log("existing expression: " + currentExpression);
    const backspacedExpression = currentExpression.slice(0, -1);
    console.log("backspaced expression: " + backspacedExpression);
    currentExpression = backspacedExpression;
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
    if (!isNaN(parseInt(key)) || ['+', '-', '/', '*', 'Enter', 'Escape', 'Backspace'].includes(key)) {
        handleInput(key);
    }
}

function pickFunFact() {

    const facts = funFacts.length - 1;
    const randomNumber = Math.floor(Math.random() * facts);


    return funFacts[randomNumber];
}

function provideKelp() {
    alert("If you'd like to avoid math, just keep hitting enter to get a fun fact!");
}

const funFacts = [
    "Kelp forests harbor a greater variety and higher diversity of plants and animals than almost any other ocean community. Many organisms use the thick blades as a safe shelter for their young from predators or even rough storms.",
    "Among the many mammals and birds that use kelp forests for protection or feeding are seals, sea lions, whales, sea otters, gulls, terns, snowy egrets, great blue herons, cormorants, and shore birds.",
    "These dense canopies of algae generally occur in cold, nutrient-rich waters. Because of their dependency upon light for photosynthesis, kelp forests form in shallow open waters and are rarely found deeper than 49-131 feet.",
    "NOAA scientists study kelp forests by visiting the same locations over and over to assess the presence and abundance of a variety of organisms. Monitoring allows marine scientists to determine if the kelp forest is changing over time and to identify the cause of those changes, whether natural or human.",
    "Kelp forests can be seen along much of the west coast of North America.",
    "Kelp are large brown algae that live in cool, relatively shallow waters close to the shore. They grow in dense groupings much like a forest on land. These underwater towers of kelp provide food and shelter for thousands of fish, invertebrates, and marine mammal species.",
    "Kelp can grow up to 18 inches per day!",
    "Like a terrestrial forest, kelp forests experience seasonal changes. Storms and large weather events, like El Niño, can tear and dislodge the kelp, leaving a tattered winter forest to begin its growth again each spring.",
    "Kelp ash was used to make gunpowder in the 16th and 17th centuries. When Germany placed an embargo on the potassium compounds derived from the kelp ash, called potash, the Americans industrialized kelp harvesting in southern California leading to kelp forest research that cotinues today.",
    "The term “kelp” originated in Europe and was used to describe the ash of burnt seaweeds."
];

// Listeners

window.addEventListener('keydown', handleKeyBoardInput);

kelpButton.addEventListener('click', provideKelp);

buttons.forEach(button => button.addEventListener('click', () => {
    handleInput(button.id)
})
);

operatorButtons.forEach(opButton => opButton.addEventListener('click', () => {
    handleInput(opButton.id)
})
);
