import express from 'express';
import { isAdmin } from '../middleware/authMiddleware.js';
import {
  // getAllMasjids,
  // createMasjid,
  // updateMasjid,
  // deleteMasjid,
  masjidController
} from '../controllers';

const router = express.Router();

router.get('/',isAdmin, masjidController.getAllMasjids);
router.post('/',isAdmin, masjidController.createMasjid);
router.put('/:id',isAdmin, masjidController.updateMasjid);
router.delete('/:id', isAdmin,masjidController.deleteMasjid);

export default router;