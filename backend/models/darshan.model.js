import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('Darshan', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dayRange: { type: DataTypes.STRING, allowNull: false }, 
        startTime: { type: DataTypes.STRING, allowNull: false }, // Changed from morningTiming
        endTime: { type: DataTypes.STRING, allowNull: false },   // Changed from eveningTiming
    }, { tableName: 'darshan_timings' });
};