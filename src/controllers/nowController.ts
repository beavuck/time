// src/controllers/nowController.ts

import {Router} from 'express'

const nowController = Router()

nowController.get('/now', (req, res) => {
  const now = new Date().toISOString()
  res.json({now})
})

export default nowController
