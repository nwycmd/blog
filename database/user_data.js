
const {User} = require("./model.js");

const UserData = {
    // 大部分对象返回的是promise对象
    sava(userinfo){
        const user = new User(userinfo);
        return user.save();
    },
    find(userinfo){
        return User.find(userinfo);
    },
    update(){},
    delete(){}
};

// 导出
module.exports=UserData;