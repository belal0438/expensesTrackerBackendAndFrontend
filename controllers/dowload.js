const { where } = require('sequelize');
const Expenses = require('../models/expenses');
const Aws = require('aws-sdk');




function uploadToS3(data, filename) {

    const BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_USER_KEY
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET



    let s3bucket = new Aws.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {

        s3bucket.upload(params, (err, s3respons) => {
            if (err) {
                console.log("somthing went wrong", err)
                reject(err);
            } else {
                console.log("sucess", s3respons)
                resolve(s3respons.Location)
            }
        })

    })

}





exports.downloadExpensesData = async (req, res) => {
    try {
        const getExpenses = await Expenses.findAll({ where: { userId: req.getuserdata.id } })
        // console.log(getExpenses);
        const StringifyData = JSON.stringify(getExpenses);

        //  when user1 download this file and get downloaded but rewrite the filename that why newUser get user1 data, that why we updat the file name as userid or name
        // const filename = 'Expense.txt';

        const userid = req.getuserdata.id
        const filename = `Expenses${userid}/${new Date()}.txt`;

        const fileURl = await uploadToS3(StringifyData, filename);
        res.status(200).json({ fileURl, success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err
        })
    }
}