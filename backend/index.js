import './config/env.js';   

import express from 'express';
import cors from 'cors';
import './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));
app.use('/api', adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
