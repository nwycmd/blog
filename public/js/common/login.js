function loginModal(){
    this.addListener();
};
$.extend(loginModal.prototype,{
    // 注册事件监听
    addListener(){
        // 点击登录按钮
        $(".bb").on("click",this.loginHandler)
    },
    // 登录业务处理
    loginHandler(){
        // 待传送到服务器端的数据
        const data = $(".login_form").serialize();
        console.log(data);
        // ajax提交登录处理
        $.post("/users/login",data,(resData)=>{
            console.log(resData);
            // 将登录成功的数据存起来
            if(resData.res_code==1){
                alert("登录成功！")
                window.location.href="/html/position.html";
             sessionStorage.loginUser = JSON.stringify(resData.res_body);
            }else{
                $(".log_failed").removeClass("hide");
            }
        })
    }
});
new loginModal();