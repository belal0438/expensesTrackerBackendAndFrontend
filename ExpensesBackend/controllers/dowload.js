const { where } = require('sequelize');
const Expenses = require('../models/expenses');
const sequelize = require('../util/database');
const S3servises = require('../services/S3services');
const DownloadedUrlData = require('../models/download')

exports.downloadExpensesData = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const getExpenses = await Expenses.findAll({ where: { userId: req.getuserdata.id } })
        // console.log(getExpenses);
        const StringifyData = JSON.stringify(getExpenses);

        const userid = req.getuserdata.id
        const filename = `Expenses${userid}/${new Date()}.txt`;

        const fileURl = await S3servises.uploadToS3(StringifyData, filename);
        //  console.log(fileURl)

        let DownloadedUrl = await DownloadedUrlData.create({
            Url: fileURl,
            userId: req.getuserdata.id
        })

        await t.commit()
        res.status(200).json({ fileURl, success: true })

    } catch (err) {
        console.log(err)
        await t.rollback()
        res.status(500).json({
           fileURl: '',
           success: false,
           Error: err
        })
    }
}


exports.GetDownloadedUrl = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        let getDownloadedUrlData = await DownloadedUrlData.findAll({ where: { userId: req.getuserdata.id } });
        await t.commit()
        return res.status(201).json(getDownloadedUrlData)
    } catch (err) {
        await t.rollback()
        return res.status(500).json({
            Error: err
        })
    }
}