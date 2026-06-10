import { add, subtract, multiply, divide } from './operations';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add a negative and a positive number', () => {
    expect(add(-2, 3)).toBe(1);
  });
});

describe('subtract', () => {
  it('should subtract two positive numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

describe('multiply', () => {
  it('should multiply two positive numbers', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});

describe('divide', () => {
  it('should divide two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
});