
//引用操作資料庫的物件
var lodash = require('lodash');
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
        var arr = [];
        arr.push(lodash.cloneDeep(temp.orderComplete))
        for (var k = 0; k < i; k++) {
            var tempRe = lodash.cloneDeep(temp.orderCompleteRepeat)
            var Afood=oCart.arrfood[k]
            var cfoodid = Afood.foodid;
            var cfoodName = Afood.foodName;
            var cfoodPrice = Afood.foodPrice;
            var cfoodQty = Afood.foodQty;
            var foodAmt = cfoodPrice * cfoodQty;
            tempRe.contents[0].contents[0].text=cfoodName
            tempRe.contents[1].contents[0].text=cfoodQty
            tempRe.contents[2].contents[0].text=cfoodPrice
            arr[0].contents.body.contents[5].contents[2].push(tempRe)
            console.log(cfoodid+", "+cfoodPrice+", "+cfoodQty+", "+foodAmt)
        }
        event.reply(arr[0]);
        
    });
}


//匯出
module.exports = { orderComplete };

