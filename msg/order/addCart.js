
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');
const index = require('./../../order');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var addCart = function(event, CartA, CartQ, cstoreid, cfoodid){
    event.source.profile().then(function (profile) {
        order.Cartfetchfood(cfoodid).then(data => {
            if (data == -1) {
                event.reply('找不到資料');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                cstoreName = data.storeName;
                cfoodName = data.foodName;
                cfoodPrice = data.foodPrice;
                if(CartA == -1){
                    CartA = objCart.arrCart.length
                    objCart.arrCart[CartA]={
                        'userid' : userId,
                        'storeid' : cstoreid, 
                        'storeName' : cstoreName,
                        'arrfood' : []
                    }
                }
            }
        })
    });
}


//匯出
module.exports = {addCart};


// order.Cartfetchfood(cfoodid).then(data => {
//     if (data == -1) {
//         event.reply('找不到資料');
//     } else if (data == -9) {
//         event.reply('執行錯誤');
//     } else {
//         cstoreName = data.storeName;
//         cfoodName = data.foodName;
//         cfoodPrice = data.foodPrice;

//         //console.log("foodName->"+data.foodName+", storeName->"+data.storeName+", foodPrice->"+data.foodPrice)
//         if(CartA == -1){
//             arrCart[0]=[userId,cstoreid,cstoreName];
//             if(CartA == -1){
//                 CartA = objCart.arrCart.length
//                 console.log("CartA->"+CartA+", objCart.arrCart.length->"+objCart.arrCart.length)
//             }
//             index.objCart.arrCart[CartA]={
//                 'userid' : userId,
//                 'storeid' : cstoreid, 
//                 'storeName' : cstoreName,
//                 'arrfood' : []
//             }
//         }
//         console.log("objCart.arrCart[CartA].storeid-->"+objCart.arrCart[CartA].storeid)
//         console.log("cstoreid-->"+cstoreid)
//         if(objCart.arrCart[CartA].storeid == cstoreid){
//             arrCartQty=[cfoodid, cfoodName, cfoodPrice];
//             if(CartQ == -1){
//                 CartQ = objCartQty.arrQty.length
//             }
//             objCartQty.arrQty[CartQ]={
//                 'userid' : userId,
//                 'foodid' : cfoodid, 
//                 'foodName' : cfoodName, 
//                 'foodPrice' : cfoodPrice
//             }
//             console.log(objCartQty.arrQty[CartQ])

            
            
//             status = "arrCartQty";
//             statusTime = 2;
//             event.reply("數量 ?");
//         }else{
//             const template = temp.temp1.template;
//             template.actions[0].type = "message";
//             template.actions[0].label = "是";
//             template.actions[0].text = msg1+",查看菜單,"+cstoreid+",是";

//             template.actions[1].type = "message";
//             template.actions[1].label = "否";
//             template.actions[1].text = msg1+",查看菜單,"+objCart.arrCart[CartA].storeid+",否";
//             template.title = "購物車訊息"
//             template.text = "要改下訂這家店嗎 ?"
//             status = "changeStore";
//             event.reply(temp.temp1);
            
//         }

//     }
// })