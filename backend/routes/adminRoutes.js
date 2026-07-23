import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken } from '../middlewares/authMiddleware.js';

import { 
    adminLogin, 
    adminLogout, 
    addEvent, 
    getEvents, 
    addDarshanTiming,
    getDarshanTimings,
    deleteEvent,
    deleteDarshanTiming,
    updateEvent,         
    updateDarshanTiming,
    getEventTypes,
    addEventType,
    getArticles,
    addArticle,
    deleteArticle,
    getVideos,
    addVideo,
    deleteVideo,
    toggleArticleFeature,
    toggleVideoFeature,
} from '../controllers/admin.authcontroller.js';

const router = express.Router();

const uploadDir = path.join(process.cwd(), '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Saves to the root 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Creates a unique filename to prevent overwriting
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize Multer with Local Storage (No Cloudinary!)
const upload = multer({ storage: storage });

// --- Routes ---

// Public Routes
router.get('/events', getEvents);
router.get('/darshan', getDarshanTimings);

// Auth Routes
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protected Admin Routes

// 1. EVENTS: Uses upload.array for multiple images
router.post('/add-event', verifyToken, upload.array('images', 10), addEvent);
router.put('/update-event/:id', verifyToken, upload.array('images', 10), updateEvent);
router.delete('/delete-event/:id', verifyToken, deleteEvent);

// Darshan
router.post('/add-darshan', verifyToken, addDarshanTiming);
router.put('/update-darshan/:id', verifyToken, updateDarshanTiming);
router.delete('/delete-darshan/:id', verifyToken, deleteDarshanTiming);

// Event Types
router.get('/event-types', getEventTypes);
router.post('/add-event-type', verifyToken, addEventType);

// 2. ARTICLES: Uses upload.single for one image
router.get('/articles', getArticles);
router.post('/add-article', verifyToken, upload.single('image'), addArticle);
router.delete('/delete-article/:id', verifyToken, deleteArticle);
router.put('/toggle-featured-article/:id', verifyToken, toggleArticleFeature); 

// 3. VIDEOS: Uses upload.single for thumbnail
router.get('/videos', getVideos);
router.post('/add-video', verifyToken, upload.single('thumbnail'), addVideo);
router.delete('/delete-video/:id', verifyToken, deleteVideo);
router.put('/toggle-featured-video/:id', verifyToken, toggleVideoFeature);

export default router;





