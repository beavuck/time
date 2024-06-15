const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const api = express();
api.disable('x-powered-by');

const TIME_API_KEY = 'time-api-key';

const API_PORT = process.env.API_PORT || 3000;
const API_KEY_SECRET = process.env.API_KEY;

api.use((
  req,
  res,
  next,
) => {
  const apiKey = req.header(TIME_API_KEY);
  if (apiKey !== API_KEY_SECRET) {
    return res.status(403).send();
  }
  next();
});

api.get('/now', (
  req,
  res,
) => {
  const now = new Date().toISOString();
  res.json({now});
});

const server = api.listen(API_PORT, () => {
  console.log(`Beavuck time microservice running on port ${API_PORT}`);
});

const gracefulShutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
