// 引入mongoose
const mongoose = require("mongoose");
// 连接数据库
 mongoose.connect('mongodb://localhost/pro1804');
 
//  用户模型
const User = mongoose.model("user",{
    username: String,
	password: String
});

const Position = mongoose.model("position",{
    name:String,
    logo:String,
    cont:String,
    date:String,
    author:String
});

// 导出
module.exports={User,Position};