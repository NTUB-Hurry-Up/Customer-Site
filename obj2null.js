
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
        
        
var status2null = function(oCart, oStatus, CartA, Sta){
    if(Sta != -1){
        if(oStatus.status != ""){
            oStatus.status="";
            oStatus.statusTime=0;
            oStatus.statusText="";
        }
    }
    if(CartA != -1){
        if(oCart.arrfood.length > 0 ){
            var i = oCart.arrfood.length;
            for(var m = 0; m<i; m++){
                if(oCart.arrfood[m].foodQty==0){
                    oCart.arrfood.splice(m,1)
                }
            }
        }
    }
}
var cart2null = function (oCart, oStatus, CartA, Sta) {
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
//匯出
module.exports = { status2null,cart2null };

