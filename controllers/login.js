
const userlogin = require('../models/newuser');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}




function generateAccesKey(id, Name) {
    return jwt.sign({ userId: id, name: Name }, 'secretKey')
}


exports.GetuserDataAndlogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;

        if (IsStringInvalid(Email) || IsStringInvalid(Password)) {
            return res.status(400).json({ success: false, message: "Email id or Password is incorrect" })
        }
        // console.log("email  "+Email+"   Password   "+Password);
        let userData = await userlogin.findAll({ where: { Email } });
        if (userData.length > 0) {
            bcrypt.compare(Password, userData[0].Password, (err, result) => {
                if (err) {
                    throw new Error('somthing went wrong')
                }
                if (result == true) {
                    // console.log( "id "+ userData[0].id+" name "+ userData[0].Name);
                  return  res.status(200).json({ success: true, message: "User logged in succesfull",
                  token:generateAccesKey(userData[0].id, userData[0].Name)});
                } else {
                    return res.status(400).json({ success: false, message: "Password is incorrect" })
                }
            })
        } else {
            return res.status(404).json({ success: false, message: "User doesnot Exist" })
        }
    } catch (err) {
        res.status(500).json({
            message: err,
            success: false
        })
    }

}
