const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res)=>{
    res.send("서버실행 완료");
})
app.post("/api", (req, res)=>{
    // const {email, pwd, isChecked} = req.body;
    const email = req.body.email;
    const pwd = req.body.pwd;
    const isChecked = req.body.isChecked;
    let remember;
    if(isChecked) { remember = "기억하기"} else { remember = "기억하지 않기"};
    console.log(email, pwd, remember);
    res.json({ email, pwd, remember });
})
app.listen(PORT, ()=>{
    console.log(`${PORT}에서 서버가 대기중...`);
});