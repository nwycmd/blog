const express = require('express');
const router = express.Router();
const UserService = require("../service/user_service.js");


// 用户登录
router.post("/login",UserService.login
);
// 用户注册
router.post("/register",UserService.register
);
router.get("/logout",UserService.logout
);
module.exports = router;
