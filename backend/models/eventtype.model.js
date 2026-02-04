import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('EventType', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, { tableName: 'event_types', timestamps: false });
};