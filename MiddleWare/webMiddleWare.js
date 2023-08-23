const jwt = require("jsonwebtoken")

const pool = require("../model/connectDB");

let checkadmin = (req, res, next) => {
    
        const token = req.cookies.tokenAdmin
       
        if (token === undefined)  return res.json("đây là quyền admin phải đăng nhập")
       
        const result = jwt.verify(token, "matkhau1234" ,function(err , decoded){
            console.log("lỗi verify token ",err)
        })
        
        next()
    
}

let checkLogin = async (req, res, next) => {
    console.log("check login")
    const username = req.body.UserName
    const password = req.body.Password
    const [rows, fields] = await pool.execute('SELECT * FROM `datausers` where username = ? and password = ? '
        , [username, password])
    if (rows[0].admin === 0) {
        console.log("thannh cong user")
       return next()
    } if (rows[0].admin === 1) {
        console.log("thannh cong admin")
        return next()
    }
    else {
       return res.json("ko tim thay tài khoản này ")
    }
}

module.exports = { checkadmin, checkLogin }