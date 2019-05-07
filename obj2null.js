
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var cart2null = function (event, oCart, oStatus) {
    event.source.profile().then(function (profile) {
        if (CartA != -1 && Sta != -1) {
            if (oStatus.status != "") {
                oStatus.status = "";
                oStatus.statusTime = 0;
                oStatus.statusText = "";
            }
            if (oCart.arrfood.length > 0) {
                var i = oCart.arrfood.length;
                oCart.storeid = ""
                oCart.storeName = ""

                oCart.arrfood.splice(0, i)
                console.log(oCart.arrfood)
            }
        }
    });
}
var completeOrder = function (event, oCart) {
    event.source.profile().then(function (profile) {
        oCart.storeid = ""
        oCart.storeName = ""

        oCart.arrfood.splice(0, i)
    });
}


//匯出
module.exports = { cart2null,completeOrder };

