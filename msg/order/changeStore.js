
//引用操作資料庫的物件
const obj2null = require('./../../obj2null');
const foodInfo = require('./../store/foodInfo');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var changeStore = function(event, oPsnll, lodash){
    event.source.profile().then(function (profile) {
        obj2null.status(oPsnll);
        if (msg1 == "是") {
            oPsnll.Cart={
                'storeid': '',
                'storeName': '',
                'storeAdd': '',
                'arrfood' : []
            }
            
            foodInfo.foodInfo(event, msg2, lodash)
        } else if (msg1 == "否") {
            foodInfo.foodInfo(event, msg2, lodash)
        }

    });
}


//匯出
module.exports = {changeStore};

