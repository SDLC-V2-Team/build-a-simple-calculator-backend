import express from 'express';
import cors from 'cors';
import arithmeticRouter from './routes/arithmetic';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for the client
app.use(cors());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Arithmetic routes
app.use('/api', arithmeticRouter);

app.listen(port, () => {
  console.log(`Calculator service listening on port ${port}`);
});

export default app;
