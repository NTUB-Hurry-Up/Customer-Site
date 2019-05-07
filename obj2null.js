
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
        
        
var status2null = function(CartA, Sta, msg2){
    if(CartA != -1 && Sta != -1){
        if(objStatus.arrStatus[Sta].status != ""){
            objStatus.arrStatus[Sta].status="";
            objStatus.arrStatus[Sta].statusTime=0;
            objStatus.arrStatus[Sta].statusText="";
        }
        if(objCart.arrCart[CartA].arrfood.length > 0 ){
            var i = objCart.arrCart[CartA].arrfood.length;
            for(var m = 0; m<i; m++){
                if(objCart.arrCart[CartA].arrfood[m].foodQty==0){
                    objCart.arrCart[CartA].arrfood.splice(m,1)
                    console.log(".foodQty == 0--->"+msg2)
                    console.log( objCart.arrCart[CartA].arrfood)
                }
            }
        }
    }
}
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
        var i = oCart.arrfood.length;

        oCart.arrfood.splice(0, i)
    });
}


//匯出
module.exports = { status2null,cart2null,completeOrder };

