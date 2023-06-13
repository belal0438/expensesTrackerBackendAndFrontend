
const path = require('path');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const user = require('./models/newuser');
const expenses = require('./models/expenses');
const Order = require('./models/orders');
const forgotpassword = require('./models/forgotpassword');
const downloadedUrl = require('./models/download');


app = express();

const bodyPaer = require('body-parser');

app.use(bodyPaer.json())
app.use(cors())

const sequelize = require('./util/database')
const usersData = require('./routes/Sign');
const ExpenseRouter = require('./routes/expenses');
const premiumFeature = require('./routes/premiumfeatur')
const forgetpassword = require('./routes/password');
const dowloadRout = require('./routes/download');
const { Stream } = require('stream');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/expenses', ExpenseRouter);
app.use('/user', usersData);
app.use('/premiumfeatur', premiumFeature);
app.use('/password', forgetpassword);
app.use('/download', dowloadRout);


app.use((req, res) => {
    res.sendFile(path.join(__dirname, `public/${req.url}`))
})

user.hasMany(expenses);
expenses.belongsTo(user)

user.hasMany(Order)
Order.belongsTo(user)

user.hasMany(forgotpassword)
forgotpassword.belongsTo(user)


user.hasMany(downloadedUrl)
downloadedUrl.belongsTo(user)

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        // console.log("Table created")
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));
