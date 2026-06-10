import { Router, Request, Response } from 'express';
import { add, subtract, multiply, divide } from '../operations';

const router = Router();

/**
 * Generic helper to parse query parameters and execute operation.
 */
function parseQuery(req: Request): { a: number; b: number } {
  const a = parseFloat(req.query.a as string);
  const b = parseFloat(req.query.b as string);
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Query parameters a and b must be valid numbers');
  }
  return { a, b };
}

router.get('/add', (req: Request, res: Response) => {
  try {
    const { a, b } = parseQuery(req);
    const result = add(a, b);
    res.json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/subtract', (req: Request, res: Response) => {
  try {
    const { a, b } = parseQuery(req);
    const result = subtract(a, b);
    res.json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/multiply', (req: Request, res: Response) => {
  try {
    const { a, b } = parseQuery(req);
    const result = multiply(a, b);
    res.json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/divide', (req: Request, res: Response) => {
  try {
    const { a, b } = parseQuery(req);
    const result = divide(a, b);
    res.json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
