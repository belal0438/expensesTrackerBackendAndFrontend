const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expenses', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    amount: Sequelize.DOUBLE,
    descript: Sequelize.STRING,
    select: Sequelize.STRING
})

module.exports = Expense
