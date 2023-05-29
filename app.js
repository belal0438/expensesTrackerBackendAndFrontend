const path = require('path');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const user = require('./models/newuser');
const expenses = require('./models/expenses');
const Order = require('./models/orders');
const forgotpassword = require('./models/forgotpassword')

app = express();
dotenv.config();
const bodyPaer = require('body-parser');

app.use(bodyPaer.json())
app.use(cors())


const sequelize = require('./util/database')
const routersData = require('./routes/router');
const ExpenseRouter = require('./routes/expenses');
const premiumFeature = require('./routes/premiumfeatur')
const forgetpassword = require('./routes/password');


app.use(ExpenseRouter);
app.use(routersData);
app.use(premiumFeature);
app.use(forgetpassword);




user.hasMany(expenses);
expenses.belongsTo(user)
user.hasMany(Order)
Order.belongsTo(user)
user.hasMany(forgotpassword)
forgotpassword.belongsTo(user)

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        console.log("Table created")
        app.listen(3000);
    })
    .catch(err => console.log(err));
