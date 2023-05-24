
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userlogin = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    Name: Sequelize.STRING,
    Email: Sequelize.STRING,
    Phone: Sequelize.DOUBLE,
    Password: Sequelize.STRING
})

module.exports = userlogin