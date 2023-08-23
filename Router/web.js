const express = require("express")
const homeController = require("../controller/homeController")
const router = express.Router()
const multer = require("multer")
const appRoot = require("app-root-path")
const path = require("path")
const MiddleWare = require("../MiddleWare/webMiddleWare")

// nghiệp vụ lưu file ảnh 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("duong link app-root-path", appRoot.path)
        cb(null, appRoot.path + '/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// check có đúng file không
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter })

// không viết dấu đóng ở ngoặc () gethomeController
router.get("/admin/v1", MiddleWare.checkadmin , homeController.gethomeController)
router.post("/admin/v1", homeController.postAdminV1 )

router.get("/details/user/:userId", homeController.getDetailPage)

router.post("/create-new-user", homeController.createNewUser)

router.post("/delete-user", homeController.deleteUser)

router.post("/edit-user/:idUser", homeController.editUser)

router.post("/updata-user", homeController.updataUser)

router.get("/upload", homeController.UploadFile)

router.post("/upload-profile-pic", upload.single('profile_pic'), homeController.handleUploadFile)

router.post("/upload-multiple-images", homeController.handleUploadMultipleFile)

// login 
router.post("/login", MiddleWare.checkLogin , homeController.postLogin)

router.get("/login" ,homeController.getLogin)

// register
router.get("/register",homeController.getRegister)
 
router.post("/register",homeController.postRegister)

// home
router.post("/home",homeController.postHome)

router.get("/home",homeController.getHome)


module.exports = router

