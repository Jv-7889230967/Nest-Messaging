// Replace ES Modules import:
// import { QueryInterface, DataTypes } from 'sequelize';

// With CommonJS require:
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex('Users', ['user_id', 'email'], {
      name: "user_id email indexing migraion"
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('Users', ['user_id', 'email'], {
      name: "user_id email index removing migraion"
    });
  },
};