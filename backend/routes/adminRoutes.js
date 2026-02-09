import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path'; // Make sure path is imported for file extension logic

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
     getVisitorTimings,
    addVisitorTiming,
    updateVisitorTiming,
    deleteVisitorTiming
} from '../controllers/admin.authcontroller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `event-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// --- Routes ---

// Public Routes
router.get('/events', getEvents);
router.get('/darshan', getDarshanTimings);

// Auth Routes
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protected Admin Routes

// 1. FIXED: Added upload.array(...) here
// Even if no images are uploaded, this is required to parse req.body when using FormData
router.post('/add-event', verifyToken, upload.array('images', 10), addEvent);

router.post('/add-darshan', verifyToken, addDarshanTiming);

// 2. FIXED: Removed duplicate update-event route. Keep only the one with upload.
router.put('/update-event/:id', verifyToken, upload.array('images', 10), updateEvent);

router.put('/update-darshan/:id', verifyToken, updateDarshanTiming);

router.delete('/delete-event/:id', verifyToken, deleteEvent);
router.delete('/delete-darshan/:id', verifyToken, deleteDarshanTiming);

router.get('/event-types', getEventTypes);
router.post('/add-event-type', verifyToken, addEventType);


// 1. ARTICLES
router.get('/articles', getArticles);
// Uses 'image' as the form-data key for the file
router.post('/add-article', verifyToken, upload.single('image'), addArticle);
router.delete('/delete-article/:id', verifyToken, deleteArticle);
router.put('/toggle-featured-article/:id', verifyToken, toggleArticleFeature); 


// 2. VIDEOS
router.get('/videos', getVideos);
// Uses 'thumbnail' as the form-data key for the file
router.post('/add-video', verifyToken, upload.single('thumbnail'), addVideo);
router.delete('/delete-video/:id', verifyToken, deleteVideo);
router.put('/toggle-featured-video/:id', verifyToken, toggleVideoFeature);

// --- VISITOR ROUTES ---
router.get('/visitors', getVisitorTimings);
router.post('/add-visitor', verifyToken, addVisitorTiming);
router.put('/update-visitor/:id', verifyToken, updateVisitorTiming);
router.delete('/delete-visitor/:id', verifyToken, deleteVisitorTiming);
export default router;