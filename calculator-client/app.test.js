describe('Calculator client', () => {
  beforeAll(() => {
    // Set up the DOM structure expected by the script
    document.body.innerHTML = `
      <form>
        <input id="num1" type="number" />
        <input id="num2" type="number" />
        <select id="operation">
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <button id="calculateBtn">Calculate</button>
        <div id="result"></div>
        <div id="error"></div>
      </form>
    `;

    // Load the client script (it registers a DOMContentLoaded listener)
    require('./app.js');

    // Simulate page load so the listener is triggered and elements are bound
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  beforeEach(() => {
    // Reset DOM state
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('operation').value = 'add';
    document.getElementById('result').textContent = '';
    document.getElementById('error').textContent = '';

    // Reset fetch mock
    global.fetch = jest.fn();
  });

  test('happy path: displays result when fetch succeeds', async () => {
    const num1 = '10';
    const num2 = '32';
    const mockResult = 42;

    document.getElementById('num1').value = num1;
    document.getElementById('num2').value = num2;
    document.getElementById('operation').value = 'add';

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: mockResult }),
    });

    document.getElementById('calculateBtn').click();

    // Fetch is async; we must await the next microtask(s)
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.getElementById('result').textContent).toBe(`= ${mockResult}`);
    expect(document.getElementById('error').textContent).toBe('');
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/add?a=${num1}&b=${num2}`
    );
  });

  test('edge case: empty input shows validation error', () => {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '5';
    document.getElementById('operation').value = 'add';

    document.getElementById('calculateBtn').click();

    expect(document.getElementById('error').textContent).toBe('Please enter both numbers.');
    expect(document.getElementById('result').textContent).toBe('');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('error path: non-ok response displays service error message', async () => {
    const errorMessage = 'Division by zero';

    document.getElementById('num1').value = '10';
    document.getElementById('num2').value = '0';
    document.getElementById('operation').value = 'divide';

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: errorMessage }),
    });

    document.getElementById('calculateBtn').click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.getElementById('error').textContent).toBe(errorMessage);
    expect(document.getElementById('result').textContent).toBe('');
  });

  test('error path: network failure shows generic network error message', async () => {
    document.getElementById('num1').value = '5';
    document.getElementById('num2').value = '2';
    document.getElementById('operation').value = 'multiply';

    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    document.getElementById('calculateBtn').click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.getElementById('error').textContent).toBe('Network error: could not reach the service.');
    expect(document.getElementById('result').textContent).toBe('');
  });

  test('edge case: pressing Enter key triggers calculation', async () => {
    const mockResult = 99;

    document.getElementById('num1').value = '7';
    document.getElementById('num2').value = '3';
    document.getElementById('operation').value = 'subtract';

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: mockResult }),
    });

    // Dispatch Enter keypress on the document
    document.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.getElementById('result').textContent).toBe(`= ${mockResult}`);
    expect(global.fetch).toHaveBeenCalled();
  });
});