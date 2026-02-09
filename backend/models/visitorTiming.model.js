import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('VisitorTiming', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        dayRange: { type: DataTypes.STRING, allowNull: false }, 
        startTime: { type: DataTypes.STRING, allowNull: false }, 
        endTime: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'visitor_timings' });
};