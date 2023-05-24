
const userlogin = require('../models/newuser');

// it is used to check oure input value from frontend is valid or not
function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


exports.PostNewUserData = async (req, res, next) => {
    try {
        const Name = req.body.Name;
        const Email = req.body.Email;
        const Phone = req.body.Phone;
        const Password = req.body.Password;


        if (IsStringInvalid(Name) || IsStringInvalid(Email) || IsStringInvalid(Phone) || IsStringInvalid(Password)) {
            return res.status(400).json({ err: ".somthing is missing" })
        }

        let NewuserdataPost = await userlogin.create({
            Name: Name,
            Email: Email,
            Phone: Phone,
            Password: Password
        })
        res.redirect('/views/login')
        res.status(201).json(NewuserdataPost);
        // res.status(201).json({massage: 'succesfully created'});
    } catch (err) {
        res.status(500).json(err);
    }

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
            // console.log(userData[0].Password);
            if (userData[0].Password === Password) {
                res.status(200).json({ success: true, message: "User logged in succesfull" })
            } else {
                return res.status(400).json({ success: false, message: "Password is incorrect" })
            }
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

