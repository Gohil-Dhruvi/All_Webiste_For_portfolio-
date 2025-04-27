
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let lastInput = '';
let operatorPressed = false;

function updateDisplay(value) {
  if (value === '' || value === undefined) {
    display.textContent = '0';
  } else {
    display.textContent = value;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      currentInput = '';
      lastInput = '';
      operatorPressed = false;
      updateDisplay('');
    } else if (value === '=') {
      try {
        const result = eval(currentInput);
        currentInput = result.toString();
        updateDisplay(currentInput);
      } catch (error) {
        updateDisplay('Error');
        currentInput = '';
      }
    } else if (button.classList.contains('operator')) {
      if (!operatorPressed) {
        currentInput += ` ${value} `;
        operatorPressed = true;
        updateDisplay(currentInput);
      }
    } else {
      if (operatorPressed) {
        operatorPressed = false;
      }
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const operators = ['+', '-', '*', '/'];

  if (!isNaN(key) || key === '.') {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (operators.includes(key)) {
    if (!operatorPressed) {
      currentInput += ` ${key} `;
      operatorPressed = true;
      updateDisplay(currentInput);
    }
  } else if (key === 'Enter' || key === '=') {
    try {
      const result = eval(currentInput);
      currentInput = result.toString();
      updateDisplay(currentInput);
    } catch (error) {
      updateDisplay('Error');
      currentInput = '';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.trim();
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key === 'Escape') {
    currentInput = '';
    lastInput = '';
    operatorPressed = false;
    updateDisplay('');
  }
});







