import './config/env.js';   

import express from 'express';
import cors from 'cors';
import './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const panchangData = require('./utils/jain_panchang_2025.json'); 

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));
app.use('/api', adminRoutes);
app.get('/api/panchang-2025', (req, res) => {
    try {
        res.status(200).json(panchangData);
    } catch (error) {
        console.error("Error fetching panchang data:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
