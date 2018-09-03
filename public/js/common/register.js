function registerModal(){
    this.addListener();
};
$.extend(registerModal.prototype,{
    // 注册事件监听
    addListener(){
        // 点击登录按钮
        $(".bb").on("click",this.registerHandler)
        $("#inputEmail3").on("blur",this.registertest)
    },
    // 注册业务处理
    registerHandler(){
        // 待传送到服务器端的数据
        const data = $(".form_register").serialize();
        console.log(data);
        if($("#inputEmail3").val()===""){
            $(".textinfo").removeClass("hide");
            return false;
        }else{
              // ajax提交登录处理
        $.post("/users/register",data,(resData)=>{
            console.log(resData);
            if (resData.res_code === 1) {
                alert("注册成功");
                window.location.href = "/html/login.html";
            }else{
                $(".reg_failed").removeClass("hide");
            }
        },"json");
        }
    },
    // 检测用户名是否存在
    registertest(){

    }
});
new registerModal();