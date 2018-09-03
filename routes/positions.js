const express = require('express');
const router = express.Router();
const path = require("path");
const PositionService = require("../service/position_service.js");
// 引入multer中间件
const multer = require("multer");
// 配置磁盘保存
const storage = multer.diskStorage({
    // 存储目标
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/img/upload/"));
      },
      // 文件名
      filename: function (req, file, cb) {
          // 文件后缀
          const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
        cb(null, file.fieldname + '-' + Date.now() + ext);
      }
});
// multer对象实例 
const upload = multer({ storage });
// 添加blog 下面upload.single中传的是表单中name属性的值
router.post("/add",upload.single("logo"),PositionService.add);
// 按照页码查询
router.get("/list", PositionService.listByPage);
//根据id查找
router.get('/listByid',PositionService.listById);

module.exports = router;
