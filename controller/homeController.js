const pool = require("../model/connectDB");
const multer = require("multer")
const path = require("path")

let gethomeController = async(req, res) => {
    const [rows, fields] = await pool.execute( 'SELECT * FROM `users`')
const check = await pool.execute( 'SELECT * FROM `users`')
// await pool.execute( 'SELECT * FROM `users`') sẽ trả về 1 mảng các phần tử trong db , 2 là trả về fields 
    res.render("index.ejs", { dataUser: rows , test : "huy nguyen " });
}

let getDetailPage = async (req,res) =>{
    const idUser = req.params.userId
    const users = await pool.execute( 'SELECT * FROM `users` WHERE id = ?',[idUser])
    res.send(JSON.stringify(users[0]))
}

let createNewUser = async(req,res) =>{

   let firstName = req.body.firstname
   let lastName = req.body.lastname
   let email = req.body.email
   let address = req.body.address

   const [rows, fields] = await pool.execute( 'INSERT INTO users(firstName,lastName,email,address) VALUES(?,?,?,?)'
   ,[firstName,lastName,email,address]  )
   res.redirect("/")
}

let deleteUser = async(req,res)=>{
    const idUser = req.body.userId
    const [rows, fields] = await pool.execute( 'delete from users where id = ?',[idUser])
    res.redirect('/')
}

let editUser = async(req,res) =>{
    const idUser = req.body.userId
    const [users , fields] = await pool.execute( 'SELECT * FROM `users` WHERE id = ?',[idUser])
    res.render("updataUser.ejs",{data : users})
}

let updataUser = async(req,res)=>{
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let email = req.body.email
    let address = req.body.address
    let ID  = req.body.id
    const [rows, fields] = await pool.execute("UPDATE users SET firstName = ? , lastName = ? , email = ? , address = ? WHERE id = ?",[firstName,lastName,email,address,ID])
    res.redirect("/")
}

let UploadFile = async(req,res)=>{
    res.render("uploadFile.ejs")
}
// ///      upload single file
const upload = multer().single("profile_pic")

let handleUploadFile = async(req,res)=>{
    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            // tức là req.file sẽ bị undefined
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }

        console.log(req.file.filename)
        console.log("file : ",req.file,'\n')
        console.log(err)
        res.send(`You have uploaded this image: <hr/><img src="\\congkhai\\images\\${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}
//    upload multiple files

let handleUploadMultipleFile = async(req,res)=>{
    res.json("upload multiple file")
}
module.exports = {
    gethomeController , getDetailPage , createNewUser ,deleteUser , editUser , updataUser ,
    UploadFile , handleUploadFile ,handleUploadMultipleFile
}