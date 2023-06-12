const sequelize = require('../util/database');
const userlogin = require('../models/newuser');
const bcrypt = require("bcrypt");


// it is used to check oure input value from frontend is valid or not
function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


exports.PostNewUserData = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        // console.log(req.body);
        const Name = req.body.Name;
        const Email = req.body.Email;
        const Phone = req.body.Phone;
        const Password = req.body.Password;
        if (IsStringInvalid(Name) || IsStringInvalid(Email) || IsStringInvalid(Phone) || IsStringInvalid(Password)) {
            return res.status(400).json({ err: ".somthing is missing" })
        }
        const saltrounds = 10;
        bcrypt.hash(Password, saltrounds, async (err, hash) => {
            if (err) {
                console.log(err)
            }
            let NewuserdataPost = await userlogin.create({
                Name: Name,
                Email: Email,
                Phone: Phone,
                Password: hash
            })
            // res.status(201).json(NewuserdataPost);
            await t.commit()
            res.status(201).json({ message: 'succesfully created' });
        })

    } catch (err) {
        await t.rollback()
        res.status(500).json(err);
    }

}




exports.GetUserData = async (req, res, next) => {
    try {
        let getUserData = await userlogin.findAll({ where: { Password: req.getuserdata.Password }})
        // console.log(getUserData);
        res.status(201).json(getUserData)
    } catch (err) {
        res.status(500).json({
            Error: err
        })
    }
}




