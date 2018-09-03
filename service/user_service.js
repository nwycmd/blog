
const UserData  = require("../database/user_data.js");
const bcrypt = require("bcrypt");

const UserService={
    login(req, res, next) {
        // 获取登录时的用户名与密码
        const {username, password} = req.body;
        // 根据用户名查询用户信息
        UserData
            .find({username}) // 查询出用户信息
            .then(data=>{
                if (data.length === 1) { // 存在该用户
                    // 获取数据库中所保存的用户加密后的密码
                    const _pass = data[0].password;
                    // 比较密码是否正确
                    if (bcrypt.compareSync(password, _pass)) { // 正确
                        // 在session中保存登录成功的用户信息
                        req.session.loginUser = username;
                        // 返回响应
                        res.json({res_code:1, res_error:"", res_body: data[0]});
                    } else { // 错误
                        res.json({res_code:0, res_error:"not exist", res_body:{}});
                    }
                } else {
                    res.json({res_code:0, res_error:"not exis", res_body:{}});
                }
            })
            .catch(err=>{
                res.json({res_code: -1, res_error: err, res_body: {}});
            });
    },

    logout(req,res,next){
        req.session.loginUser = null;
        res.json({res_code:1,res_err:"",res_body:{status:true}})
    },

    register(req,res,next){
        // 获取在请求中的注册信息
        const {username,password} = req.body;
        // 密码加密
        const passCrypt = bcrypt.hashSync(password, 5);
		console.log(passCrypt)
        // 保存用户对象
        UserData
        .sava({username,password:passCrypt})
        .then((data)=>{
            res.json({res_code:1,res_err:"",res_body:data});
        })
        .catch((err)=>{
            res.json({res_code:-1,res_err:err,res_body:{}});
        });
    }
};
// 导出
module.exports=UserService;