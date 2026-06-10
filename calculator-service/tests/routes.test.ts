import request from 'supertest';
import app from '../src/server';

describe('API routes', () => {
  describe('/api/add', () => {
    it('should return correct sum', async () => {
      const res = await request(app).get('/api/add?a=2&b=3');
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });
    it('should return 400 for invalid query', async () => {
      const res = await request(app).get('/api/add?a=abc&b=3');
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('/api/subtract', () => {
    it('should return correct difference', async () => {
      const res = await request(app).get('/api/subtract?a=10&b=4');
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(6);
    });
  });

  describe('/api/multiply', () => {
    it('should return correct product', async () => {
      const res = await request(app).get('/api/multiply?a=3&b=7');
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(21);
    });
  });

  describe('/api/divide', () => {
    it('should return correct quotient', async () => {
      const res = await request(app).get('/api/divide?a=20&b=4');
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });
    it('should return 400 on division by zero', async () => {
      const res = await request(app).get('/api/divide?a=5&b=0');
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('zero');
    });
  });

  describe('/health', () => {
    it('should return ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });
});
