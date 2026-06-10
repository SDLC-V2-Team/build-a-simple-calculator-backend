import express from 'express';
import request from 'supertest';
import router from './arithmetic';

// Mock the operations module
jest.mock('../operations', () => ({
  add: jest.fn(),
  subtract: jest.fn(),
  multiply: jest.fn(),
  divide: jest.fn(),
}));

import { add, subtract, multiply, divide } from '../operations';

const app = express();
app.use('/', router);

describe('Arithmetic Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupAdd = (a: number, b: number, result: number) => {
    (add as jest.Mock).mockReturnValue(result);
  };

  const setupSubtract = (a: number, b: number, result: number) => {
    (subtract as jest.Mock).mockReturnValue(result);
  };

  const setupMultiply = (a: number, b: number, result: number) => {
    (multiply as jest.Mock).mockReturnValue(result);
  };

  const setupDivide = (a: number, b: number, result: number) => {
    (divide as jest.Mock).mockReturnValue(result);
  };

  test('GET /add returns sum', async () => {
    setupAdd(2, 3, 5);
    const res = await request(app).get('/add').query({ a: '2', b: '3' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
    expect(add).toHaveBeenCalledWith(2, 3);
  });

  test('GET /subtract returns difference', async () => {
    setupSubtract(10, 4, 6);
    const res = await request(app).get('/subtract').query({ a: '10', b: '4' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 6 });
    expect(subtract).toHaveBeenCalledWith(10, 4);
  });

  test('GET /multiply returns product', async () => {
    setupMultiply(3, 5, 15);
    const res = await request(app).get('/multiply').query({ a: '3', b: '5' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 15 });
    expect(multiply).toHaveBeenCalledWith(3, 5);
  });

  test('GET /divide returns quotient', async () => {
    setupDivide(8, 2, 4);
    const res = await request(app).get('/divide').query({ a: '8', b: '2' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 4 });
    expect(divide).toHaveBeenCalledWith(8, 2);
  });

  test('GET /divide returns 400 on division by zero', async () => {
    const error = new Error('Division by zero is not allowed');
    (divide as jest.Mock).mockImplementation(() => {
      throw error;
    });
    const res = await request(app).get('/divide').query({ a: '10', b: '0' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: error.message });
    expect(divide).toHaveBeenCalledWith(10, 0);
  });

  test('GET /add returns 400 for non-numeric parameters', async () => {
    const res = await request(app).get('/add').query({ a: 'abc', b: '2' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: 'Query parameters a and b must be valid numbers',
    });
  });
});