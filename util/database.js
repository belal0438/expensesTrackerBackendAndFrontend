

const Sequelize= require('sequelize');

const sequelize = new Sequelize('expeses_app_project_nodejs', 'root', 'B#5266@belal', {
    host: 'localhost',
    dialect:'mysql'
  });

  module.exports = sequelize;