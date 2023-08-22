const express = require("express")

const APIcontroller = require("../controller/APIcontroller")

const  router = express.Router()

        router.get("/users",APIcontroller.getAllusers)

        router.get("/users/:id",APIcontroller.getOneUser)

        router.post("/create-user",APIcontroller.CreateUser)

        router.put("/update-user/:id",APIcontroller.UpdateUser)

        router.delete("/delete-user/:id",APIcontroller.DeleteUser)
    
    
module.exports = router