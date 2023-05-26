const path = require('path');
const express = require('express');
const cors = require('cors')


const user = require('./models/newuser');
const expenses = require('./models/expenses');

app = express();

const bodyPaer = require('body-parser');

app.use(bodyPaer.json())
app.use(cors())




const sequelize = require('./util/database')
const routersData = require('./routes/router');


app.use(routersData);

user.hasMany(expenses);
expenses.belongsTo(user)



sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        console.log("Table created")
        app.listen(3000);
    })
    .catch(err => console.log(err));
