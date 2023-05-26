

const { where } = require('sequelize');
const Expenses = require('../models/expenses');

// it is used to check oure input value from frontend is valid or not
function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


exports.PostExpensesData = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const descript = req.body.descript;
        const select = req.body.select;

        if (IsStringInvalid(amount) || IsStringInvalid(descript) || IsStringInvalid(select)) {
            return res.status(400).json({ err: ".somthing is missing" })
        }
        let ExpnsesdataPost = await Expenses.create({
            amount: amount,
            descript: descript,
            select: select,
            userId: req.getuserdata.id
        })
        // res.status(201).json(ExpnsesdataPost);
        res.status(201).json({ message: 'succesfully Added' });
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.DeleteExpenses = async (req, res, next) => {
    try {
        const ProdId = req.params.id;
        Expenses.destroy({ where: { id: ProdId, userId: req.getuserdata.id } })
        res.status(200).json({ data: 'data hase deleted succesfull' });
    } catch (err) {
        res.status(500).json({
            Error: err
        })
    }
}



exports.GetExpensesData = async (req, res, next) => {
    try {
        let getexpensesData = await Expenses.findAll({ where: { userId: req.getuserdata.id } })
        res.status(201).json(getexpensesData)
    } catch (err) {
        res.status(500).json({
            Error: err
        })
    }
}
