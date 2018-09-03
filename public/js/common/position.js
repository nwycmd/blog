function Position(){
    this.addListener();
    this.load();
}
// 模板
Position.listInfoTemplate = `
<% for (var i = 0; i < positions.length; i++) { %> 
    <div class="list_ct">
        <h3><%=positions[i].name%></h3>
        <hr>
        <div>
            <div class="col-md-3 blog_item_img"><img src="../img/upload/<%= positions[i].logo %>" alt="" class="img-responsive"></div>
            <div class="col-md-9 blog_item_con">
                <p><%=positions[i].cont%></p>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="dateView" style="margin-top:25px;">
            <a href="javascript:void(0)" class="readAll" style="float: right">阅读全文>></a>
            <small><span class="glyphicon glyphicon-time"></span><%=positions[i].date%></small>&nbsp;&nbsp;
            <small>作者:<span class="nameinfo1"><%=positions[i].author%></span></small> &nbsp;&nbsp; 
            <small>个人博客：[<a href="javascript:void(0)">默认分类</a>]</small>&nbsp;&nbsp;
            <small><span style="color:#ff8986;">编辑blog</span>:[<a href="javascript:void(0)" data-toggle="modal" data-target="#updateModal" id="updata1">修改</a>]/[<a href="javascript:void(0)">删除</a>]</small>
        </div>
    </div>
    <% }　%>`;

    Position.listTemplate=`
    <% for (var i = 0; i < positions.length; i++) { %> 
        <h5><li><a href="#"><%= positions[i].name %></a></li></h5>
        <% } %>`;
    Position.liTemplate=`
    <% for (var i = 1; i < positions.length; i++) { %> 
       <h5> <li><span class="badge" style="background: red;""><%=i%></span><%=positions[i].name%></li></h5>
        <% } %>
    `;
    Position.paginTemplate=`
        <% for (var i = 1; i <= totalPages; i++) { %> 
        <li class="<%=currentPage==i?'active':'' %>"><a href="#"><%=i %></a></li>
        <% } %>
   `;

$.extend(Position.prototype,{
    // 注册事件监听
    addListener(){
        $(".btn-add-pos").on("click", this.addPositionblog);
        // 翻页
        $(".pagination").on("click","li",this.loadByPage);
        $(".updata1").on("click","a",this.updatasj);
    },
    load(){
        // 让个人管理界面选中
        $("#bs-example-navbar-collapse-1 ul:first li:last").addClass("active").siblings("li").removeClass("active");
        this. loadByPage(1);
        // 右边数据渲染
        $.getJSON("/positions/list?page=1", data=>{
		const positions = data.res_body.data;
		const html = ejs.render(Position.listTemplate, {positions});
			// 显示
        $(".item_nt").html(html);
        });
        $.getJSON("/positions/list?page=1", data=>{
            const positions = data.res_body.data;
            const html = ejs.render( Position.liTemplate, {positions});
                // 显示
            $(".item_nt1").html(html);
            });
        // 自动填充作者数据
        let user = sessionStorage.loginUser;
        if (user) {
            user = JSON.parse(user);
            $("#author").val(`${user.username}`);
        };
    },
    // 按页加载
    loadByPage(event){
        let page;
        if(typeof event ==="number")
            page = event;
        else
        // 获取待加载的页码
        page = $(event.target).text();
       // 读取指定页码
        $.getJSON("/positions/list?page="+page, data=>{
            // 显示职位数据
            // 待渲染的数据
        const positions = data.res_body.data;
            // EJS渲染模板
        const html = ejs.render(Position.listInfoTemplate, {positions});
            // 显示
        $(".moban").html(html);
          // 显示页码
             // EJS渲染模板
        const pagin = ejs.render(Position.paginTemplate,{totalPages:data.res_body.totalPages,currentPage:page})
            // 显示
        $(".pagination").html(pagin);
        });
    },
    // 添加blog
    addPositionblog(){
        // const data = $(".add_position_form").serialize();
        // $.post("/positions/add",data,(resData)=>{
        //     console.log(resData);
        // },"json")
        // 上面这种方法得不到数据不满足文件传输的文件域问题
        // 创建 FormData 对象：包装待上传表单的数据 FormDate中传的是DOM对象
		const formData = new FormData($(".add_position_form").get(0));
		// 使用 $.ajax() 方法
		$.ajax({
			type: "post",
			url: "/positions/add",
			data: formData,
			processData: false, // 禁止将 data 转换为查询字符串
			contentType: false, // 不设置contentType
			success: function(data){
                console.log(data);
				if(data.res_code==1){
                    $(".btn-add-pos").modal("hide");
                    window.location.reload();
                }
			},
			dataType: "json"
        });
    },
    updatasj(){
         $.getJSON("/positions/listByid", data=>{
            console.log(data);
         })
    }
});

new Position();