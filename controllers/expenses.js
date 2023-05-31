

const { where } = require('sequelize');
const Expenses = require('../models/expenses');
const User = require('../models/newuser');
const sequelize = require('../util/database');
const Aws = require('aws-sdk')






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




function uploadToS3(data, filename) {
    const BUCKET_NAME = 'expensetrackerappnodjs01';
    const IAM_USER_KEY = 'AKIARCVYQ3W7WNP6VISI';
    const IAM_USER_SECRET = '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';


    let s3bucket = new Aws.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        // Bucket: BUCKET_NAME
    })

    s3bucket.createBucket(() => {
        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: data,
        }
        s3bucket.upload(params, (err, s3respons) => {
            if (err) {
                console.log("somthing went wrong", err)
            }else{
                console.log("sucess",s3respons)
            }
        })
    })


}





exports.downloadExpensesData = async (req, res) => {
    try {
        const getExpenses = await Expenses.findAll({ where: { userId: req.getuserdata.id } })
        // console.log(getExpenses);
        const StringifyData = JSON.stringify(getExpenses);
        const filename = 'Expense.txt';
        const fileURl = uploadToS3(StringifyData, filename);
        res.status(200).json({ fileURl, success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err
        })
    }
}





