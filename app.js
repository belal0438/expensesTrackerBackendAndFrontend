const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
dotenv.config();

const user = require('./models/newuser');
const expenses = require('./models/expenses');
const Order = require('./models/orders');
const forgotpassword = require('./models/forgotpassword');
const downloadedUrl = require('./models/download');


const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);





app = express();

const bodyPaer = require('body-parser');

app.use(bodyPaer.json())
app.use(cors())
app.use(helmet());
app.use(morgan('combined', {stream:accessLogStream}));

const sequelize = require('./util/database')
const routersData = require('./routes/router');
const ExpenseRouter = require('./routes/expenses');
const premiumFeature = require('./routes/premiumfeatur')
const forgetpassword = require('./routes/password');
const dowloadRout = require('./routes/download');
const { Stream } = require('stream');



app.use(ExpenseRouter);
app.use(routersData);
app.use(premiumFeature);
app.use(forgetpassword);
app.use(dowloadRout);



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
        console.log("Table created")
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));
