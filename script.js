// Selecting elements
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

// Variables to store values
let currentInput = '0';
let previousInput = '';
let operator = null;
let resetDisplay = false;

// Function to handle calculations based on operator
function operate(value1, value2, operator) {
    switch (operator) {
        case 'add':
            return value1 + value2;
        case 'subtract':
            return value1 - value2;
        case 'multiply':
            return value1 * value2;
        case 'divide':
            return value2 !== 0 ? value1 / value2 : 'Error';
        default:
            return 0;
    }
}

// Update the display function
function updateDisplay() {
    display.textContent = currentInput;
}

// Clear the calculator
function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resetDisplay = false;
    updateDisplay();
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Check if button is a digit
        if (button.classList.contains('digit')) {
            if (resetDisplay || currentInput === '0') {
                currentInput = value; // Replace '0' with the new number
                resetDisplay = false;
            } else {
                currentInput += value; // Append the digit
            }
            updateDisplay();
        }

        // Handle operators
        else if (button.classList.contains('operator')) {
            if (operator && previousInput) {
                currentInput = operate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                updateDisplay();
            }
            operator = value === '+' ? 'add' :
                       value === '-' ? 'subtract' :
                       value === '*' ? 'multiply' : 'divide';
            previousInput = currentInput;
            currentInput = '0';
            resetDisplay = true;
        }

        // Handle decimal point
        else if (value === '.' && !currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }

        // Handle equals button
        else if (button.classList.contains('equal')) {
            if (operator && previousInput) {
                currentInput = operate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                operator = null;
                resetDisplay = true;
                updateDisplay();
            }
        }

        // Handle clear button
        else if (button.classList.contains('clear')) {
            clearCalculator();
        }
    });
});

// Initialize display on load
clearCalculator();
