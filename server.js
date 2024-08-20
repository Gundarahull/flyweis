require("dotenv").config();
const express = require("express");
const db = require("./database/db");
const app = express();
const cors=require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json()) //convertig the request data into json
app.use(express.urlencoded({ extended: true })); //convertig the request data into url encoded


//integrating the routes
app.use('/',require('./routes/login.routes'))
app.use('/invest',require('./routes/investment.routes'))
app.use('/account',require('./routes/account.routes'))

//swagger Document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log("server is running on port 1111");
});
