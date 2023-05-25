
const userlogin = require('../models/newuser');
const bcrypt = require("bcrypt");
const Expenses = require('../models/expenses');

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
            res.status(201).json({ message: 'succesfully created' });
        })

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
            bcrypt.compare(Password, userData[0].Password, (err, result) => {
                if (err) {
                    throw new Error('somthing went wrong')
                }
                if (result == true) {
                    res.status(200).json({ success: true, message: "User logged in succesfull" })
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




exports.PostExpensesData = async (req, res, next) => {
    try {
        // console.log(req.body);
        const amount = req.body.amount;
        const descript = req.body.descript;
        const select = req.body.select;

        if (IsStringInvalid(amount) || IsStringInvalid(descript) || IsStringInvalid(select)) {
            return res.status(400).json({ err: ".somthing is missing" })
        }
        let ExpnsesdataPost = await Expenses.create({
            amount: amount,
            descript: descript,
            select: select
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
        let DelExpens = Expenses.findByPk(ProdId);
        Expenses.destroy({ where: { id: ProdId } })
        res.status(200).json(DelExpens);
    } catch (err) {
        res.status(500).json({
            Error: err
        })
    }
}




exports.GetExpensesData = async (req, res, next) => {
    try {
        let getexpensesData = await Expenses.findAll()
        res.status(201).json(getexpensesData)
    } catch (err) {
        res.status(500).json({
            Error: err
        })
    }
}
