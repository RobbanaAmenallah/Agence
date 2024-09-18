const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('./config/db');

const categoriesController = require('./controllers/categories.controller');
const propertiesController = require('./controllers/properties.controller'); 
const userController = require('./controllers/user.controller'); 


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/categories', categoriesController);
app.use('/properties', propertiesController);
app.use('/user', userController);


app.listen(port, () => {
    console.log(`Server started at Port ${port}`);
});
