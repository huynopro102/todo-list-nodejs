const express = require("express")
const  router = express.Router()
const cookie = require("cookie")
const homeController = require("../controller/homeController")
const jwt = require("jsonwebtoken")


function handleLogin(app){
    app.use('/home',(req,res,next)=>{
        try {
            const token = req.cookies.token1
            console.log("đây là token lấy đc ",token)
            const result = jwt.verify(token , "matkhau123")
            console.log("giải mã  ",result)
            if(result){
                next()
            }else{
                res.json("lỗi token")
            }
                
        } catch (error) {
            res.redirect("/login")
        }
    } , homeController.getHome)


}

module.exports = handleLogin