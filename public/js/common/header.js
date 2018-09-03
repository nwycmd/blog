// 头部对象
function Header() {
    this.createDom();
    this.load();
    this.addListener();
}
// 头部导航模板
Header.template=`<nav class="navbar navbar-default">
<div class="container-fluid">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">Piracy blog</a>
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
      <li class="active"><a href="/index.html">首页<span class="sr-only">(current)</span></a></li>
      <li><a href="/html/position.html">个人主页</a></li>
    </ul>
      <ul class="nav navbar-nav navbar-right not-login">
      <li data-toggle="modal" data-target="#loginModal" class="link-login"><a href="/html/login.html">登录</a></li>
      <li data-toggle="modal" data-target="#registerModal"  class="link-register"><a href="/html/register.html">注册</a></li>	        
    </ul>
  <ul class="nav navbar-nav navbar-right login-success hide">
    <li><a href="#"></a></li>
    <li><a href="javascript:void(0);" class="link-logout">注销</a></li>	   
  </ul>
  </div><!-- /.navbar-collapse -->
</div><!-- /.container-fluid -->
</nav>`;
// 构造函数加原型 extendjquery中扩展方法
$.extend(Header.prototype,{
    // 创建DOM元素
    createDom(){
        $(Header.template).appendTo("header");
    },
    load() {
      // 页面加载时要判断是否有用户登录过，有则显示用户信息及注销链接
      let user = sessionStorage.loginUser;
      if (user) {
        user = JSON.parse(user);
        $(".login-success")
          .removeClass("hide")
          .find("a:first").text(`你好：${user.username}`);
        $(".not-login").remove();
      }
    },
     addListener(){
      $(".link-logout").on("click",this.logoutHandler);
     },
     // 注销
     logoutHandler(){
      $.getJSON("/users/logout",(data)=>{
        if(data.res_body.status){
          sessionStorage.removeItem("loginUser");
          window.location.href = "/index.html";
        }
      })
     }
});
     
// 创建对象实例
new Header();