const jwt = require('jsonwebtoken');

const userData = require('../models/newuser');

exports.Authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log(token)
        const tokenVarify = jwt.verify(token, 'secretKey');
        // console.log(tokenVarify);
        if (tokenVarify.userId == null || tokenVarify.name == null) {
            throw new Error('somthing went wrong')
        }
        getuserdata = await userData.findByPk(tokenVarify.userId);
        // console.log(JSON.stringify(getuserdata));
        req.getuserdata = getuserdata
        next()
    } catch (err) {
        // console.log(err)
        return res.status(401).json({ success: false, message: 'User doesnot Exist' })
    }
}