
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      'CREATE TABLE profile (id SERIAL PRIMARY KEY,owner INTEGER NOT NULL, FOREIGN KEY (owner) REFERENCES "Users"(user_id) ON DELETE CASCADE,image_url VARCHAR(1000),profile_name VARCHAR(20))'
    )
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS profile'
    )
  }
}
