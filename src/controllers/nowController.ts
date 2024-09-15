// src/controllers/nowController.ts

import {Router} from 'express'

const nowController = Router()

nowController.get('/now', (req, res) => {
  res.json({now: new Date().toISOString()})
})

export default nowController
