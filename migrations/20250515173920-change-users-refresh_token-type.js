const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn('Users', 'refresh_token', {
      type: DataTypes.STRING(1000),
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