
//引用操作資料庫的物件
const temp = require('./../../temp');
const order = require('./../../order');
const obj2addin = require('./../../obj2addin');
const memInfo = require('./../member/memInfo');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var addFood2Cart = function(event, oPsnl, cstoreid, cfoodid, lodash){
    event.source.profile().then(function (profile) {
        console.log(oPsnl.Cart);
        order.Cartfetchfood(cfoodid).then(data => {
            if (data == -1) {
                event.reply('找不到資料');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                cstoreName = data.storeName;
                cstoreAdd = data.storeAdd;
                cfoodName = data.foodName;
                cfoodPrice = data.foodPrice;
                //----------------------------------------------------------------
                // if (CartA == -1 || objCart.arrCart[CartA].storeid == "") {
                //     if (CartA == -1) { CartA = objCart.arrCart.length }
                //     objCart.arrCart[CartA] = {
                //         'userid': userId,
                //         'userName': '',
                //         'storeid': cstoreid,
                //         'storeName': cstoreName,
                //         'storeAdd': cstoreAdd,
                //         'takeDate': '',
                //         'takeTime': '',
                //         'arrfood': []
                //     }
                //     memInfo.fetchMemName(userId, objCart.arrCart[CartA])
                //     console.log("date.length " + objCart.arrCart[CartA].takeDate.length);
                // }

                // if (objCart.arrCart[CartA].storeid == cstoreid) {
                //     var i = objCart.arrCart[CartA].arrfood.length
                //     if (i != 0) {
                //         for (var m = 0; m < i; m++) {
                //             if (objCart.arrCart[CartA].arrfood[m].foodid == cfoodid) {
                //                 break;
                //             } else if (m == i - 1) {
                //                 objCart.arrCart[CartA].arrfood.push({
                //                     'foodid': cfoodid,
                //                     'foodName': cfoodName,
                //                     'foodPrice': cfoodPrice,
                //                     'foodQty': 0
                //                 })
                //             }
                //         }
                //     } else {
                //         objCart.arrCart[CartA].arrfood.push({
                //             'foodid': cfoodid,
                //             'foodName': cfoodName,
                //             'foodPrice': cfoodPrice,
                //             'foodQty': 0
                //         })
                //     }

                //     console.log("arrfood")
                //     console.log(objCart.arrCart[CartA].arrfood)
                //     // status----start
                //     console.log("Sta" + Sta)
                //     if (Sta == -1) {
                //         Sta = objStatus.arrStatus.length
                //     }
                //     console.log("Sta" + Sta)
                //     objStatus.arrStatus[Sta] = {
                //         'userid': userId,
                //         'status': "inputQty",
                //         'statusTime': 2,
                //         'statusText': cfoodid
                //     }
                //     // status----end
                //     event.reply("數量?");
                // } else {
                //     const template = temp.temp1.template;
                //     template.actions[0].type = "message";
                //     template.actions[0].label = "是";
                //     template.actions[0].text = "是," + cstoreid;

                //     template.actions[1].type = "message";
                //     template.actions[1].label = "否";
                //     template.actions[1].text = "否," + objCart.arrCart[CartA].storeid;
                //     template.title = "購物車訊息"
                //     template.text = "要改下訂這家店嗎 ?"
                //     obj2addin.statusAddin(objStatus, Sta, userId, "changeStore", 1)
                //     event.reply(temp.temp1);
                // }
                //----------------------------------------------------------------
                if(oPsnl.Cart.storeid == ""){
                    oPsnl.Cart = {
                        'userName': '',
                        'userPhone': '',
                        'storeid': cstoreid,
                        'storeName': cstoreName,
                        'storeAdd': cstoreAdd,
                        'takeDate': '',
                        'takeTime': '',
                        'arrfood': []
                    }
                    memInfo.fetchMemInfo(oPsnl.userId, oPsnl.Cart)
                }
                if(oPsnl.Cart.storeid == cstoreid ){
                    var i = oPsnl.Cart.arrfood.length
                    if (i != 0) {
                        for (var m = 0; m < i; m++) {
                            if (oPsnl.Cart.arrfood[m].foodid == cfoodid) {
                                break;
                            } else if (m == i - 1) {
                                oPsnl.Cart.arrfood.push({
                                    'foodid': cfoodid,
                                    'foodName': cfoodName,
                                    'foodPrice': cfoodPrice,
                                    'foodQty': 0
                                })
                            }
                        }
                    } else {
                        oPsnl.Cart.arrfood.push({
                            'foodid': cfoodid,
                            'foodName': cfoodName,
                            'foodPrice': cfoodPrice,
                            'foodQty': 0
                        })
                    }
                }else {
                    var arr = []
                    arr.push(lodash.cloneDeep(temp.temp_memInfo))
                    arr[0].template.actions[0].label = "是";
                    arr[0].template.actions[0].text = "是," + cstoreid;
                    arr[0].template.actions[1].label = "否";
                    arr[0].template.actions[1].text = "否," + objCart.arrCart[CartA].storeid;
                    arr[0].template.title = "購物車訊息"
                    arr[0].template.text = "要改下訂這家店嗎 ?"
                    obj2addin.StatusAddin(oPsnl, "changeStore", 1,'')
                    event.reply(arr[0]);
                }
                console.log("arrfood")
                console.log(oPsnl.Cart.arrfood)
                obj2addin.StatusAddin(oPsnl, "inputQty", 2, cfoodid)

                event.reply("數量?");
            }
        })
    });
}


//匯出
module.exports = {addFood2Cart};

