
//引用操作資料庫的物件
const temp = require('./../../temp');
const obj2addin = require('./../../../obj2addin');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------

var modCart = function (event, oCart) {
    event.source.profile().then(function (profile) {

        // var arr = [];
        // arr.push(lodash.cloneDeep(temp.temp_menu));
        for (var i = 0; i < oCart.arrfood.length; i++) {
            console.log(oCart.arrfood[i])
            // console.log(data[i].foodid + " " + data[i].foodPrice + " " + data[i].foodName)
            // arr[0].contents.contents[i] = lodash.cloneDeep(temp.temp_menu_repeat)
            // if (data[i].foodimg != null) { arr[0].contents.contents[i].hero.url = data[i].foodimg }
            // arr[0].contents.contents[i].body.contents[0].text = data[i].foodName
            // arr[0].contents.contents[i].body.contents[1].contents[0].contents[1].text = "NT$" + data[i].foodPrice
            // arr[0].contents.contents[i].footer.contents[0].action.text = "店家,加入購物車," + data[i].storeid + "," + data[i].foodid
        }
        // event.reply(arr[0]);
    });
}

var modFood = function (event, oPsnl, mod_foodid) {
    event.source.profile().then(function (profile) {
        var m = oPsnl.Cart.arrfood.length;
        for (var i = 0; i < m; i++) {
            console.log("m = "+m+" i = "+i)
            if (oPsnl.Cart.arrfood[i].foodid == mod_foodid) {

                obj2addin.StatusAddin(oPsnl, "changeQty", 2, mod_foodid)
                event.reply("數量?");

            } else if (i == m - 1) {
                event.reply('您的購物車沒有此餐點');

            }

        }
    });
}
//匯出
module.exports = { modCart, modFood };


