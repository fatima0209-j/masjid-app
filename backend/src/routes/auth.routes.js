import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  authController
} from '../controllers';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/auth/me', authController.getCurrentUser);

export default router;