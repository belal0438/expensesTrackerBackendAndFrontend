

const { where } = require('sequelize');
const Expenses = require('../models/expenses');
const User = require('../models/newuser');
const sequelize = require('../util/database');







// it is used to check oure input value from frontend is valid or not
function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


exports.PostExpensesData = async (req, res, next) => {
    const t = await sequelize.transaction()
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
        }, { transaction: t })

        // console.log(ExpnsesdataPost.amount)
        totalExpesesAmount = Number(req.getuserdata.totalexpenses) + Number(ExpnsesdataPost.amount);
        const updateUserData = await User.update({
            totalexpenses: totalExpesesAmount
        }, {
            where: { id: req.getuserdata.id },
            transaction: t
        });
        // console.log(totalExpesesAmount)
        // res.status(201).json(ExpnsesdataPost);

        await t.commit()
        res.status(201).json({ message: 'succesfully Added' });
    } catch (err) {
        await t.rollback()
        res.status(500).json(err);
    }
}

exports.DeleteExpenses = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const ProdId = req.params.id;

        const expansesData = await Expenses.findByPk(ProdId);
        // console.log(expansesData.amount);

        totalExpesesAmount = Number(req.getuserdata.totalexpenses) - Number(expansesData.amount);
        const updateUserData = await User.update({
            totalexpenses: totalExpesesAmount
        }, {
            where: { id: req.getuserdata.id },
            transaction: t
        });
        await Expenses.destroy({ where: { id: ProdId, userId: req.getuserdata.id } })

        await t.commit()
        res.status(200).json({ data: 'data hase deleted succesfull' });
    } catch (err) {
        await t.rollback()
        res.status(500).json({
            Error: err
        })
    }
}



exports.GetExpensesData = async (req, res, next) => {
    try {
        let getexpensesData = await Expenses.findAll({ where: { userId: req.getuserdata.id } })
        return res.status(201).json(getexpensesData)
    } catch (err) {
        return res.status(500).json({
            Error: err
        })
    }
}




async function countExpenses() {
    try {
        let totalExpenses = 0;
        Allexpenses = await Expenses.findAll()
        Allexpenses.forEach(element => {
            totalExpenses++;
            element.id;
        })
        return totalExpenses
    } catch (error) {

        return error
    }

}

// countExpenses()





exports.paginateData = async (req, res, next) => {
    try {
        page = +req.query.page || 1;
        const pageSize = +req.query.pageSize || 3;
        totalexpenses = await countExpenses()
        // console.log("total Expenses>>> ", totalexpenses)
        let getData = await Expenses.findAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'DESC']]
        });
        // console.log(getData);
        res.status(200).json({
            allExpense: getData,
            currentPage: page,
            hasNextPage: pageSize * page < totalexpenses,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalexpenses / pageSize)
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, Error: error.message })
    }

}