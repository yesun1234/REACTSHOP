const mysql = require('mysql');
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20001109',
    database: 'mydb'
});

