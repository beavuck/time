const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const api = express();

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

/**
 * GET /now
 * Returns the current time in ISO format, in UTC timezone.
 */
api.get('/now', (req, res) => {
  const currentTime = new Date().toISOString();
  res.json({currentTime});
});

api.listen(API_PORT, () => {
  console.log(`Time microservice running on port ${API_PORT}`);
});
