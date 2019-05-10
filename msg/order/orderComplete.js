
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');
const obj2null = require('./../../obj2null');
const sendOrder = require('./sendOrder');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var orderComplete = function (event, oCart) {
    event.source.profile().then(function (profile) {
        
    });
}


//匯出
module.exports = { orderComplete };

