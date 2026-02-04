import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('Event', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        dateDisplay: { type: DataTypes.STRING, allowNull: false }, 
        fullDate: { type: DataTypes.DATEONLY, allowNull: false }, 
        day: { type: DataTypes.STRING },
        month: { type: DataTypes.STRING },
        year: { type: DataTypes.STRING },
        time: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING }, 
        description: { type: DataTypes.TEXT },
        location: { type: DataTypes.STRING },
        galleryImages: { 
            type: DataTypes.JSON, // Stores array like ["img1.jpg", "img2.jpg"]
            defaultValue: [] 
        }
    }, { tableName: 'events' });
};