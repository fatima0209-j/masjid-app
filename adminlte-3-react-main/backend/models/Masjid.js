import mongoose from 'mongoose';

const masjidSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  longitude: String,
  latitude: String,
  area: String,
});

export default mongoose.model('Masjid', masjidSchema);
