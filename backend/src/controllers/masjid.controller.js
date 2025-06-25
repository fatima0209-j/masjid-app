import Masjid from '../models/Masjid.js';

export const getAllMasjids = async (req, res) => {
  try {
    const masjids = await Masjid.find();
    res.json(masjids);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch masjids', error: err.message });
  }
};

export const createMasjid = async (req, res) => {
  try {
    const masjid = new Masjid(req.body);
    await masjid.save();
    res.status(201).json(masjid);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add masjid', error: err.message });
  }
};

export const updateMasjid = async (req, res) => {
  try {
    const masjid = await Masjid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(masjid);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update masjid', error: err.message });
  }
};

export const deleteMasjid = async (req, res) => {
  try {
    await Masjid.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete masjid', error: err.message });
  }
};