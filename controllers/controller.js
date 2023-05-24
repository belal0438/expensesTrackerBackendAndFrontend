
const userlogin = require('../models/userlogin');



// Name: Name.value,
// Email: Email.value,
// Phone: Phone.value,
// Password: Password.value


exports.PostUserloginData = async (req, res, next) => {

    try {
        const Name = req.body.Name;
        const Email = req.body.Email;
        const Phone = req.body.Phone;
        const Password = req.body.Password;

      let userlogindataPost =  await userlogin.create({
            Name: Name,
            Email: Email,
            Phone: Phone,
            Password: Password
        })

    res.status(201).json(userlogindataPost);

    } catch(err){
      res.status(500).json(err);
    }
    
}