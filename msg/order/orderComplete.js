
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');
const obj2null = require('./../../obj2null');
const sendOrder = require('./sendOrder');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var orderComplete = function (event, oCart, cOrderid) {
    event.source.profile().then(function (profile) {
        console.log(cOrderid)
        var i = oCart.arrfood.length;
        for (var k = 0; k < i; k++) {
            var Afood=oCart.arrfood[k]
            var cfoodid = Afood.foodid;
            var cfoodPrice = Afood.foodPrice;
            var cfoodQty = Afood.foodQty;
            var foodAmt = cfoodPrice * cfoodQty;
            console.log(cfoodid+", "+cfoodPrice+", "+cfoodQty+", "+foodAmt)
        }
    });
}


//匯出
module.exports = { orderComplete };

