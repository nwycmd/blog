const PositionData = require("../database/position_data.js");
var window=window;

const PositionService={
//    添加数据
add(req, res, next) {
    // 从请求主体中解构文本数据
    const {name,cont,author} = req.body;
    // 将上传文件的logo文件名保存
    let logo = "";
    if (req.file)
        logo = req.file.filename;
    let oDate = new Date(); 
        var year = oDate.getFullYear();
        var month = oDate.getMonth()+1;
        var day = oDate.getDate();
        var hour = oDate.getHours();
        var minute = oDate.getMinutes();
        var second = oDate.getSeconds();
    let date = (year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second);
    // 保存到数据库
    PositionData
        .save({name, logo, cont,date,author})
        .then(data=>{
            res.json({res_code:1, res_error:"", res_body: data})
        })
        .catch(err=>{
            res.json({res_code:-1, res_error:err, res_body: {}})
        });
    },
//    按页码查询
    listByPage(req, res, next) {
		// 获取待查询的页码
		let {page} = req.query;
		page = page || 1;
		// 调用数据库查询方法
		PositionData
			.count()
			.then((data)=>{
				PositionData
				.findByPage(page)
				.then(pageData=>{
					// 总页数
				const totalPages = Math.ceil(data/5);
					res.json({res_code:1, res_error:"", res_body: {data:pageData,count:data,totalPages}});
			}).catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}});
			});
			}).catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}});
            });
    },
    // 查找id
    listById(req,res,next){
        const {id} =req.query;
        PositionData.findById(id,function(data){
            res.json({res_code:1,res_error:"",res_body:{data}});
        });
    }
};
module.exports=PositionService;