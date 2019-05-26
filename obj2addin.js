
//------------------------------------------
// 查詢所有的店家
//------------------------------------------


var statusAddin = function (objStatus, Sta, userId, status, statusTime) {

    if (Sta == -1) {
        Sta = objStatus.arrStatus.length
    }
    objStatus.arrStatus[Sta] = {
        'userid': userId,
        'status': status,
        'statusTime': statusTime
    }
}
var cartAddin = function (oCart, oStatus, CartA, Sta) {
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
            oCart.storeAdd = ""
            oCart.arrfood.splice(0, i)
        }
    }
}
var objStatusAddin = function (obj, objLoc, userId, status, statusTime) {

    if (objLoc == -1) {
        objLoc = obj.arrPsnl.length
    }
    obj.arrPsnl[objLoc].Status = {
        'userid': userId,
        'status': status,
        'statusTime': statusTime,
        'statusText': ''
    }
}
//匯出
module.exports = { objStatusAddin, statusAddin, cartAddin };

