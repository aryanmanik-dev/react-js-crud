require('dotenv').config();
const express = require('express');
const app = express();
require('./DB/conn');

const apiCors = require ('cors');


const router = require('./routes/scheduleRoutes.js');


const port = 8080;


app.use(apiCors());


app.use(express.json());
// api pages 

app.use(router);

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.listen(port,()=>{
    console.log(`Server is started , port number is ${port}`);
}) 