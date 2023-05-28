
const UserData = require('../models/newuser');
const expensesData = require('../models/expenses');
const sequelize = require('../util/database');
const Expense = require('../models/expenses');


exports.getUserLeaderBoard = async (req, res) => {
    try {
        const leaderBoardForUser = await UserData.findAll({
            order: [['totalexpenses', 'DESC']]
        });
        res.status(201).json(leaderBoardForUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}