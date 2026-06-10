import { add, subtract, multiply, divide } from '../src/operations';

describe('Arithmetic operations', () => {
  describe('add', () => {
    it('should return sum of two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('should handle negative numbers', () => {
      expect(add(-1, -2)).toBe(-3);
    });
    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract second from first', () => {
      expect(subtract(5, 3)).toBe(2);
    });
    it('should handle negative result', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(4, 3)).toBe(12);
    });
    it('should return zero when multiplying by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide first by second', () => {
      expect(divide(10, 2)).toBe(5);
    });
    it('should throw error on division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });
});
