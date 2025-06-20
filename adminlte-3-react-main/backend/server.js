import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import masjidRoutes from './routes/masjids.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/masjids', masjidRoutes);
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/adminlteauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));


