import express from 'express';
import Masjid from '../models/Masjid.js'; // create this model
const router = express.Router();

router.get('/', async (req, res) => {
  const masjids = await Masjid.find();
  res.json(masjids);
});

router.post('/', async (req, res) => {
  try {
    const masjid = new Masjid(req.body);
    await masjid.save();
    res.status(201).json(masjid);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add masjid', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const masjid = await Masjid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(masjid);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update masjid', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Masjid.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
