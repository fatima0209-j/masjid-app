import express from 'express';
import {
  getAllMasjids,
  createMasjid,
  updateMasjid,
  deleteMasjid,
  masjidController
} from '../controllers';

const router = express.Router();

router.get('/', masjidController.getAllMasjids);
router.post('/', masjidController.createMasjid);
router.put('/:id', masjidController.updateMasjid);
router.delete('/:id', masjidController.deleteMasjid);

export default router;