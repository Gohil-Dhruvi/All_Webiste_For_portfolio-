class ScientificCalculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.memory = 0;
    this.isDegreeMode = true;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.resetScreen = false;
    this.updateActiveOperator();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') {
      this.currentOperand = '0';
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.resetScreen) {
      this.currentOperand = '';
      this.resetScreen = false;
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;

    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.resetScreen = true;
    this.updateActiveOperator();
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+': computation = prev + current; break;
      case '-': computation = prev - current; break;
      case '×': computation = prev * current; break;
      case '÷': computation = prev / current; break;
      case 'x^y': computation = Math.pow(prev, current); break;
      default: return;
    }

    this.currentOperand = this.formatResult(computation);
    this.operation = undefined;
    this.previousOperand = '';
    this.resetScreen = true;
    this.updateActiveOperator();
    this.updateDisplay();
  }

  percentage() {
    this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    this.updateDisplay();
  }

  toggleSign() {
    this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    this.updateDisplay();
  }

  // Scientific functions
  square() {
    this.currentOperand = this.formatResult(Math.pow(parseFloat(this.currentOperand), 2));
    this.updateDisplay();
  }

  cube() {
    this.currentOperand = this.formatResult(Math.pow(parseFloat(this.currentOperand), 3));
    this.updateDisplay();
  }

  sqrt() {
    this.currentOperand = this.formatResult(Math.sqrt(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  cbrt() {
    this.currentOperand = this.formatResult(Math.cbrt(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  inverse() {
    this.currentOperand = this.formatResult(1 / parseFloat(this.currentOperand));
    this.updateDisplay();
  }

  sin() {
    const value = parseFloat(this.currentOperand);
    const result = this.isDegreeMode ?
      Math.sin(value * Math.PI / 180) :
      Math.sin(value);
    this.currentOperand = this.formatResult(result);
    this.updateDisplay();
  }

  cos() {
    const value = parseFloat(this.currentOperand);
    const result = this.isDegreeMode ?
      Math.cos(value * Math.PI / 180) :
      Math.cos(value);
    this.currentOperand = this.formatResult(result);
    this.updateDisplay();
  }

  tan() {
    const value = parseFloat(this.currentOperand);
    const result = this.isDegreeMode ?
      Math.tan(value * Math.PI / 180) :
      Math.tan(value);
    this.currentOperand = this.formatResult(result);
    this.updateDisplay();
  }

  sinh() {
    this.currentOperand = this.formatResult(Math.sinh(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  cosh() {
    this.currentOperand = this.formatResult(Math.cosh(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  tanh() {
    this.currentOperand = this.formatResult(Math.tanh(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  log() {
    this.currentOperand = this.formatResult(Math.log10(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  ln() {
    this.currentOperand = this.formatResult(Math.log(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  exp() {
    this.currentOperand = this.formatResult(Math.exp(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  tenPow() {
    this.currentOperand = this.formatResult(Math.pow(10, parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  pi() {
    this.currentOperand = Math.PI.toString();
    this.updateDisplay();
  }

  fact() {
    let num = Math.abs(parseInt(this.currentOperand));
    if (num > 170) { // Maximum accurate factorial in JS
      this.currentOperand = "Infinity";
    } else {
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
      this.currentOperand = this.formatResult(result);
    }
    this.updateDisplay();
  }

  abs() {
    this.currentOperand = this.formatResult(Math.abs(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  floor() {
    this.currentOperand = this.formatResult(Math.floor(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  ceil() {
    this.currentOperand = this.formatResult(Math.ceil(parseFloat(this.currentOperand)));
    this.updateDisplay();
  }

  toggleDegRad() {
    this.isDegreeMode = !this.isDegreeMode;
    document.querySelector('[data-action="deg-rad"]').textContent =
      this.isDegreeMode ? 'DEG' : 'RAD';
    document.querySelector('[data-action="deg-rad"]').innerHTML =
      `<span class="secondary-fn">${this.isDegreeMode ? 'DEG' : 'RAD'}</span>${this.isDegreeMode ? 'DEG' : 'RAD'}`;
  }

  rand() {
    this.currentOperand = this.formatResult(Math.random());
    this.updateDisplay();
  }

  // Memory functions
  memClear() {
    this.memory = 0;
    this.showToast("Memory Cleared");
  }

  memRecall() {
    this.currentOperand = this.memory.toString();
    this.updateDisplay();
  }

  memAdd() {
    this.memory += parseFloat(this.currentOperand) || 0;
    this.showToast("Added to Memory");
  }

  // Helper methods
  formatResult(number) {
    // Handle very large/small numbers with scientific notation
    if (Math.abs(number) > 1e12 || (Math.abs(number) < 1e-6 && number !== 0)) {
      return number.toExponential(8).replace(/(\.\d*?[1-9])0+e/, '$1e');
    }

    // Round to 10 decimal places and remove trailing zeros
    const rounded = Math.round(number * 1e10) / 1e10;
    return rounded.toString().replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
  }

  updateActiveOperator() {
    document.querySelectorAll('.operator').forEach(btn => {
      btn.classList.remove('active');
    });

    if (this.operation) {
      const activeBtn = Array.from(document.querySelectorAll('.operator'))
        .find(btn => btn.textContent === this.operation);
      if (activeBtn) activeBtn.classList.add('active');
    }
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'absolute';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.zIndex = '100';
    toast.style.animation = 'fadeInOut 2.5s';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2500);
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);

    if (this.operation) {
      this.previousOperandElement.textContent =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }

  getDisplayNumber(number) {
    if (number === undefined || number === '') return '0';

    const [integerPart, decimalPart] = number.toString().split('.');

    let integerDisplay;
    if (isNaN(integerPart)) {
      integerDisplay = '';
    } else {
      integerDisplay = parseFloat(integerPart).toLocaleString('en');
    }

    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`;
    }
    return integerDisplay;
  }
}

// Initialize calculator
const calculator = new ScientificCalculator(
  document.getElementById('previous-operand'),
  document.getElementById('current-operand')
);

// Button event handlers
const setupButtonListeners = () => {
  // Number buttons
  document.querySelectorAll('[data-action="number"]').forEach(button => {
    button.addEventListener('click', () => calculator.appendNumber(button.textContent));
  });

  // Operation buttons
  document.querySelectorAll('[data-action="operation"]').forEach(button => {
    button.addEventListener('click', () => calculator.chooseOperation(button.textContent));
  });

  // Function buttons
  document.querySelectorAll('[data-action]').forEach(button => {
    const action = button.getAttribute('data-action');

    if (['number', 'operation', 'equals', 'clear', 'delete'].includes(action)) return;

    button.addEventListener('click', () => {
      switch (action) {
        case 'equals': calculator.compute(); break;
        case 'clear': calculator.clear(); break;
        case 'delete': calculator.delete(); break;
        case 'percentage': calculator.percentage(); break;
        case 'toggle-sign': calculator.toggleSign(); break;
        case 'square': calculator.square(); break;
        case 'cube': calculator.cube(); break;
        case 'sqrt': calculator.sqrt(); break;
        case 'cbrt': calculator.cbrt(); break;
        case 'pow': calculator.chooseOperation('x^y'); break;
        case 'inverse': calculator.inverse(); break;
        case 'sin': calculator.sin(); break;
        case 'cos': calculator.cos(); break;
        case 'tan': calculator.tan(); break;
        case 'sinh': calculator.sinh(); break;
        case 'cosh': calculator.cosh(); break;
        case 'tanh': calculator.tanh(); break;
        case 'log': calculator.log(); break;
        case 'ln': calculator.ln(); break;
        case 'exp': calculator.exp(); break;
        case 'ten-pow': calculator.tenPow(); break;
        case 'pi': calculator.pi(); break;
        case 'fact': calculator.fact(); break;
        case 'abs': calculator.abs(); break;
        case 'floor': calculator.floor(); break;
        case 'ceil': calculator.ceil(); break;
        case 'deg-rad': calculator.toggleDegRad(); break;
        case 'rand': calculator.rand(); break;
        case 'mem-clear': calculator.memClear(); break;
        case 'mem-recall': calculator.memRecall(); break;
        case 'mem-add': calculator.memAdd(); break;
      }
    });
  });
};

// Toggle between standard and scientific modes
document.getElementById('mode-toggle').addEventListener('click', () => {
  const scientificPanel = document.getElementById('scientific-buttons');
  const standardPanel = document.getElementById('standard-buttons');
  const toggleBtn = document.getElementById('mode-toggle');

  scientificPanel.classList.toggle('hidden');
  standardPanel.classList.toggle('hidden');

  toggleBtn.textContent = scientificPanel.classList.contains('hidden') ?
    'Scientific' : 'Standard';
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    calculator.appendNumber(e.key);
  } else if (e.key === '.') {
    calculator.appendNumber('.');
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    calculator.chooseOperation(
      e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key
    );
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculator.compute();
  } else if (e.key === 'Escape') {
    calculator.clear();
  } else if (e.key === 'Backspace') {
    calculator.delete();
  } else if (e.key === '%') {
    calculator.percentage();
  }
});

// Initialize button listeners
setupButtonListeners();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
document.head.appendChild(style);