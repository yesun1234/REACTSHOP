const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const http = require('http');

const PORT = 5000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));

// mysql 접속
const mysql = require('mysql');
const db = require('./db/db');
const { select } = require('./db/dbquery');

app.get('/', select);

//미들웨어로 bodyParser로 들어온 값을 미리 셋팅해서 검증함
const postMiddleWare = (req, res, next) => {
    const { username, userpass, title, contents } = req.body;
    if(!username || !userpass || !title || !contents) {
        return res.status(400).json({ message: '모든 필드를 입력 하시오.'});
    } 
    next();
}

app.post('/api', postMiddleWare, (req, res)=>{
    const { username, userpass, title, contents } = req.body;
    res.json({ message: { username, userpass, title, contents }});
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});