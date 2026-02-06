import { DataTypes } from 'sequelize';

export const ArticleModel = (sequelize) => {
  return sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false }, // Keeping as string for "Dec 15, 2024" format, or use DATEONLY
    excerpt: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING }, // Stores "/uploads/filename.jpg"
    externalLink: { type: DataTypes.STRING }, // Optional: link to full article
     isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  }, { tableName: 'articles' });
  
};

export const VideoModel = (sequelize) => {
  return sequelize.define('Video', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    speaker: { type: DataTypes.STRING },
    duration: { type: DataTypes.STRING }, // e.g. "45:30"
    views: { type: DataTypes.STRING }, // e.g. "12.5K" (Stored as string as requested)
    thumbnail: { type: DataTypes.STRING }, // Stores "/uploads/filename.jpg"
    videoLink: { type: DataTypes.STRING } ,// The actual YouTube/Video URL
     isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  }, { tableName: 'videos' });
};