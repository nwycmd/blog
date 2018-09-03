
const {Position} = require("./model.js");

const positionData={
    save(positioninfo){
         return new Position(positioninfo).save();
    },
    update(){},
    delete(){},
    // 根据id查找数据
    findById(id){
        return Position.findById(id);
    },
    // 按照页码查找
    findByPage(page){
        const pageSize = 5;
		// 查询
		return Position.find().skip((page-1)*pageSize).limit(pageSize);
        // 查询
        // const query = Position.find();
        // const count = query.count();
        // const totalPages =Math.ceil(count/pageSize);
        // const positions = Position.find().ship((page-1)*pageSize).limit(pageSize);
        // return {count,totalPages,positions};
    },
    count(){
        return Position.find().count();
    }
};
module.exports=positionData;