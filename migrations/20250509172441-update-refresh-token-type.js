// Replace ES Modules import:
// import { QueryInterface, DataTypes } from 'sequelize';

// With CommonJS require:
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn('Users', 'refresh_token', {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn('Users', 'refresh_token', {
      type: DataTypes.STRING(255),
      allowNull: true
    });
  }
};