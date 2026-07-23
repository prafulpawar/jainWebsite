import { Admin, Event, Darshan ,EventType , Article, Video  } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const checkIfEventIsPast = (dateString, timeString) => {
  if (!dateString) return false;

  try {
    const now = new Date();
    
    if (!timeString) {
      const eventDate = new Date(dateString);
      return eventDate < new Date(now.toDateString());
    }

    const eventDateTimeString = `${dateString}T${timeString}:00`;
    const eventDate = new Date(eventDateTimeString);

    if (isNaN(eventDate.getTime())) {
      console.error("Invalid Date/Time:", eventDateTimeString);
      return false; 
    }

    return eventDate < now;
  } catch (error) {
    console.error("Time parsing error:", error);
    return false; 
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    console.log("Login attempt for user:", userName,userPassword);

    const admin = await Admin.findOne({ where: { userName } });
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(userPassword, admin.userPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.userID },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: admin.userName
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const adminLogout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['fullDate', 'ASC']] 
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { fullDate, time } = req.body;
    let eventData = { ...req.body };

    const isPast = checkIfEventIsPast(fullDate, time);

    if (isPast && req.files && req.files.length > 0) {
      // FIX: Sirf folder name aur file name save karo database me
      const images = req.files.map(file => 'uploads/' + file.filename); 
      eventData.galleryImages = JSON.stringify(images); 
    } else {
      eventData.galleryImages = JSON.stringify([]);
    }

    const event = await Event.create(eventData);
    res.status(201).json({ message: 'Event added', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullDate, time } = req.body;

    const existingEvent = await Event.findOne({ where: { id } });
    if (!existingEvent) return res.status(404).json({ message: 'Event not found' });

    let updateData = { ...req.body };

    const dateToCheck = fullDate || existingEvent.fullDate;
    const timeToCheck = time || existingEvent.time;

    const isPast = checkIfEventIsPast(dateToCheck, timeToCheck);

    if (req.files && req.files.length > 0) {
        if(isPast) {
            // FIX: Sirf folder name aur file name save karo database me
            const newImages = req.files.map(file => 'uploads/' + file.filename);
            let currentImages = [];
            try {
                currentImages = existingEvent.galleryImages ? JSON.parse(existingEvent.galleryImages) : [];
                if (!Array.isArray(currentImages)) currentImages = [];
            } catch (e) { currentImages = []; }

            updateData.galleryImages = JSON.stringify([...currentImages, ...newImages]);
        } else {
             delete updateData.galleryImages; 
        }
    }

    await Event.update(updateData, { where: { id } });
    const updatedEvent = await Event.findByPk(id);
    
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.destroy({ where: { id } }); 
    if (deleted) res.status(200).json({ message: 'Event deleted successfully' });
    else res.status(404).json({ message: 'Event not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addDarshanTiming = async (req, res) => {
  try {
    const timing = await Darshan.create(req.body);
    res.status(201).json({ message: 'Timing added', timing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDarshanTimings = async (req, res) => {
  try {
    const timings = await Darshan.findAll();
    res.json(timings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDarshanTiming = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Darshan.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'Timing deleted successfully' });
    } else {
      res.status(404).json({ message: 'Timing not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDarshanTiming = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Darshan.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedTiming = await Darshan.findOne({ where: { id: id } });
      res.status(200).json({ message: 'Timing updated successfully', timing: updatedTiming });
    } else {
      res.status(404).json({ message: 'Timing not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventTypes = async (req, res) => {
  try {
    let types = await EventType.findAll();
    
    if (types.length === 0) {
      const defaults = [
        { name: "Festival" }, { name: "Puja" }, { name: "Education" },
        { name: "Celebration" }, { name: "Community" }
      ];
      await EventType.bulkCreate(defaults);
      types = await EventType.findAll();
    }
    
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addEventType = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await EventType.findOne({ where: { name } });
    if (existing) return res.status(400).json({ message: "Type already exists" });

    const newType = await EventType.create({ name });
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= ARTICLES =================

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [['createdAt', 'DESC']] });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addArticle = async (req, res) => {
  try {
    const { title, author, date, excerpt, externalLink } = req.body;
    
    let imagePath = null;
    if (req.file) {
      // FIX: Sirf folder name aur file name save karo database me
      imagePath = 'uploads/' + req.file.filename; 
    }

    const newArticle = await Article.create({
      title,
      author,
      date,
      excerpt,
      externalLink,
      image: imagePath 
    });

    res.status(201).json({ message: 'Article added successfully', article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleArticleFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) return res.status(404).json({ error: "Article not found" });

    if (!article.isFeatured) {
      const count = await Article.count({ where: { isFeatured: true } });
      if (count >= 3) {
        return res.status(400).json({ error: "Maximum 3 articles can be featured." });
      }
    }

    article.isFeatured = !article.isFeatured;
    await article.save();
    res.json({ message: "Status updated", article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.destroy({ where: { id } });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= VIDEOS =================

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({ order: [['createdAt', 'DESC']] });
    res.json(videos);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const addVideo = async (req, res) => {
  try {
    const { title, speaker, duration, videoLink } = req.body;

    let thumbnailPath = null;
    if (req.file) {
      // FIX: Sirf folder name aur file name save karo database me
      thumbnailPath = 'uploads/' + req.file.filename;
    }

    const newVideo = await Video.create({
      title,
      speaker,
      videoLink,
      thumbnail: thumbnailPath
    });

    res.status(201).json({ message: 'Video resource added', video: newVideo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleVideoFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);

    if (!video) return res.status(404).json({ error: "Video not found" });

    if (!video.isFeatured) {
      const count = await Video.count({ where: { isFeatured: true } });
      if (count >= 3) {
        return res.status(400).json({ error: "Maximum 3 videos can be featured." });
      }
    }

    video.isFeatured = !video.isFeatured;
    await video.save();
    res.json({ message: "Status updated", video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.destroy({ where: { id } });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};