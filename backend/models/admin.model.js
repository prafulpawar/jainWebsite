import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Admin = sequelize.define(
    'Admin',
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'admin',
      timestamps: true
    }
  );

  return Admin;
};
