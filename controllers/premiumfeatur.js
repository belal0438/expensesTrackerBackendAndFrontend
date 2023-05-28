
const UserData = require('../models/newuser');
const ExpensesData = require('../models/expenses');
const sequelize = require('../util/database');


exports.getUserLeaderBoard = async (req, res) => {
    try {
        const Userdata = await UserData.findAll();
        const Expensesdata = await ExpensesData.findAll();
        const UserAggregatedExpens = {};
        Expensesdata.forEach(element => {
            // console.log(element.userId);
            if (UserAggregatedExpens[element.userId]) {
                UserAggregatedExpens[element.userId] = UserAggregatedExpens[element.userId] + element.amount
            } else {
                UserAggregatedExpens[element.userId] = element.amount
            }

        });

        UserLeaderBoardArray = [];
        Userdata.forEach((userElem) =>{
        // console.log(userElem.Name)
        UserLeaderBoardArray.push({name:userElem.Name, total_cost: UserAggregatedExpens[userElem.id]})
        })
        // console.log(UserLeaderBoardArray)
        UserLeaderBoardArray.sort((a,b)=> b.total_cost-a.total_cost)
        res.status(201).json(UserLeaderBoardArray);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}