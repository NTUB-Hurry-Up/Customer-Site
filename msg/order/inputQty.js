
//引用操作資料庫的物件
const obj2null = require('./../../obj2null');
const foodInfo = require('./../store/foodInfo');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var inputQty = function(event, oPsnl, msg1, lodash){
    event.source.profile().then(function (profile) {
        
        var isNum = /^[0-9]+$/;
        var x = Boolean(!isNum.test(msg1));
        var y = Boolean(parseInt(msg1) < 1);
        var z = Boolean(oPsnl.Status.statusTime > 0);
        if (z) {
            if (x) {
                oPsnl.Status.statusTime--;
                event.reply([
                    { 'type': 'text', 'text': '請輸入數字 ! ' },
                    { 'type': 'text', 'text': '你還剩' + oPsnl.Status.statusTime + '機會' }]
                );
            } else if (y) {
                oPsnl.Status.statusTime--;
                event.reply([
                    { 'type': 'text', 'text': '請輸入大於0的數字啦 ! ' },
                    { 'type': 'text', 'text': '你還剩' + oPsnl.Status.statusTime + '機會' }]
                );
            } else {
                var i = oPsnl.Cart.arrfood.length;
                console.log("i = "+i)
                // var cstoreid = objCart.arrCart[CartA].storeid;
                // var cstoreName = objCart.arrCart[CartA].storeName;

                // for (var m = 0; m < i; m++) {
                //     if (objCart.arrCart[CartA].arrfood[m].foodid == objStatus.arrStatus[Sta].statusText) {
                //         var oldQty = parseInt(objCart.arrCart[CartA].arrfood[m].foodQty);
                //         var newQty = (oldQty + parseInt(msg1)).toString();
                //         objCart.arrCart[CartA].arrfood[m].foodQty = newQty;
                //         break;
                //     }
                // }
                // console.log(objCart.arrCart[CartA].arrfood)

                // Cart.Cart(event, objCart.arrCart[CartA], userName)
                // obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
            }
        } else {
            // var i = objCart.arrCart[CartA].arrfood.length;
            // for (var m = 0; m < i; m++) {
            //     if (objCart.arrCart[CartA].arrfood[m].foodQty == 0) {

            //         objCart.arrCart[CartA].arrfood[m].length = 0
            //     }
            // }
            // objStatus.arrStatus[Sta].status = "";
            // objStatus.arrStatus[Sta].statusTime = 0;
            // objStatus.arrStatus[Sta].statusText = "";
            // event.reply('請你閉嘴')
        }
    });
}


//匯出
module.exports = {inputQty};

