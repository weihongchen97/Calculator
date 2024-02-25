

const numericKeys = document.querySelectorAll(".numeric-key");
const operatorKeys = document.querySelectorAll(".operator-key");
const calcKey = document.querySelector("#calcKey");
const clearBtn = document.querySelector("#clearBtn");
const decKey = document.querySelector("#decKey");
const numberValue = document.querySelector("#numberValue");
const totalSeq = document.querySelector("#totalSeq");

let currentValue = 0;
let adjustValue = "";
let operator = "";

function handleNumericKey(value) {
    adjustValue += value;
    updateDisplay();
    updateSequence(value);
}

function handleOperatorKey(value) {
    if (adjustValue !== "") {
        if (currentValue !== 0) {
            calculate(); 
        }
        currentValue = parseFloat(adjustValue);
        adjustValue = "";
        operator = value;
        updateSequence(` ${value} `);
    }
}

function handleCalcKey() {
    if (adjustValue !== "") {
        calculate();
        operator = "";
        updateSequence("");
    }
}

function handleClear() {
    currentValue = 0;
    adjustValue = "";
    operator = "";
    updateDisplay();
    updateSequence("");
    totalSeq.innerText = "";
}

function handleDecimal() {
    if (!adjustValue.includes('.')) {
        adjustValue += '.';
        updateDisplay();
    }
}

function updateSequence(value) {
    totalSeq.innerText += value;
}

function calculate() {
    switch (operator) {
        case '+':
            currentValue += parseFloat(adjustValue);
            break;
        case '-':
            currentValue -= parseFloat(adjustValue);
            break;
        case '*':
            currentValue *= parseFloat(adjustValue);
            break;
        case '/':
            currentValue /= parseFloat(adjustValue);
            break;
        default:
            currentValue = parseFloat(adjustValue);
    }
    adjustValue = "";
    updateDisplay();
}

function updateDisplay() {
    numberValue.innerText = adjustValue === "" ? currentValue : adjustValue;
}

numericKeys.forEach((key) => {
    key.addEventListener("click", () => handleNumericKey(key.dataset.value));
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", () => handleOperatorKey(key.dataset.value));
});

calcKey.addEventListener("click", handleCalcKey);
clearBtn.addEventListener("click", handleClear);
decKey.addEventListener("click", handleDecimal);

document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;

    if (/^[0-9]$/.test(keyPressed)) {
        handleNumericKey(keyPressed);
    } else if (keyPressed === '.') {
        handleDecimal();
    } else if (['+', '-', '*', '/'].includes(keyPressed)) {
        handleOperatorKey(keyPressed);
    } else if (keyPressed === 'Enter') {
        handleCalcKey();
    } else if (keyPressed === 'Escape') {
        handleClear();
    }
});
