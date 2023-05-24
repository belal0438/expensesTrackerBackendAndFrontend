const path = require('path');
const express = require('express');
app = express();

const bodyPaer = require('body-parser');
app.use(bodyPaer.json())

app.use(express.static(path.join(__dirname, 'public')))
const sequelize = require('./util/database')
const routersData = require('./routes/router');


app.use(routersData);



sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        console.log("Table created")
        app.listen(3000);
    })
    .catch(err => console.log(err));
