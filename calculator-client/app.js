document.addEventListener('DOMContentLoaded', () => {
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operationSelect = document.getElementById('operation');
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  const SERVICE_URL = 'http://localhost:3001/api';

  async function calculate() {
    const a = num1Input.value;
    const b = num2Input.value;
    const op = operationSelect.value;

    // Clear previous messages
    resultDiv.textContent = '';
    errorDiv.textContent = '';

    if (a === '' || b === '') {
      errorDiv.textContent = 'Please enter both numbers.';
      return;
    }

    try {
      const response = await fetch(`${SERVICE_URL}/${op}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
      const data = await response.json();

      if (!response.ok) {
        errorDiv.textContent = data.error || 'An error occurred.';
        return;
      }

      resultDiv.textContent = `= ${data.result}`;
    } catch (err) {
      errorDiv.textContent = 'Network error: could not reach the service.';
    }
  }

  calculateBtn.addEventListener('click', calculate);

  // Allow Enter key to trigger calculation
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculate();
    }
  });
});
