const express = require("express")
const app = express()
const path = require("path")
const configeFileStatic = require("./confige/staticFile")
const configeViewEngine = require("./confige/configeViewEngine")
const initApiRouter = require("./Router/API")
const initWebRouter = require("./Router/web")

require('dotenv').config()
const port = process.env.PORT || 8082
// body-parser
const bodyParser = require("body-parser")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// cấu hình fileStatic
configeFileStatic(app,path,__dirname)
// cấu hình views
configeViewEngine(app,path,__dirname)


// init web router
app.use("/",initWebRouter)


// init api router
app.use("/api/v1/",initApiRouter)




app.listen(port, ()=>{
    console.log("server listening ...",port)
})