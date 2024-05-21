const conn = require('./db');

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql 접속성공');
});

const select = (req, res) => {
    const sql = "select * from guestbbs order by id desc";
    conn.query(sql, (err, result)=> {
        if(err) throw err;
        res.send(result);
    });
}

module.exports.select = select;