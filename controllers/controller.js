
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
        // res.status(201).json(NewuserdataPost);
        res.status(201).json({massage: 'succesfully created'});

    } catch (err) {
        res.status(500).json(err);
    }

}



