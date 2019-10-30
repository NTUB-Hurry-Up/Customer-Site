//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
const { LineClient } = require('messaging-api-line');
var express = require('express');
var lodash = require('lodash');
const temp = require('./cus/temp');
const obj2null = require('./obj2null');
const obj2addin = require('./obj2addin');
const member = require('./cus/route/member');
const memInfo = require('./cus/view/member/memInfo');
const storeInfo = require('./cus/view/store/storeInfo');
const foodInfo = require('./cus/view/store/foodInfo');
const addFood2Cart = require('./cus/view/order/addFood2Cart');
const changeStore = require('./cus/view/order/changeStore');
const inputQty = require('./cus/view/order/inputQty');
const Cart = require('./cus/view/order/Cart');
const sendOrder = require('./cus/view/order/sendOrder');
const orderRecord = require('./cus/view/order/orderRecord');
const modCart = require('./cus/view/order/modCart');
const pay_LP = require('./cus/view/pay/pay_LP');
const store_orderRecord = require('./store/view/order/store_orderRecord');
const store_updateOrder = require('./store/view/order/store_updateOrder');
//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553827455',
    channelSecret: '633baa5dafd610ad5bb69a495df003a0',
    channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});

// get accessToken and channelSecret from LINE developers website
const client = LineClient.connect({
    channelSecret: '633baa5dafd610ad5bb69a495df003a0',
    accessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});
// {"richMenuId": "richmenu-70f1291d871d2dfbc30ba43c04553ff2"}//cus
// {"richMenuId": "richmenu-fa2df501cd1a455e79d804b5f4bfb9b2"}//store
//--------------------------------
// 使用者加入群組或解除封鎖
//--------------------------------
bot.on('follow', function (event) {
    event.source.profile().then(
        function (profile) {
            //呼叫API, 將使用者資料寫入資料庫
            memInfo.memFirstIn(event, lodash);
        }
    );
});
setTimeout(function () {
    var userId = 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8';
    var sendMsg = "online";
    bot.push(userId, [sendMsg]);
    console.log('userId: ' + userId);
    console.log('send: ' + sendMsg);
}, 1);
// --------------------------------
// 機器人接受訊息的處理
// --------------------------------
var obj = {
    arrPsnl: []//personal
}
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            const userName = profile.displayName;
            const userId = profile.userId;
            const msg = event.message.text;
            var NewArray = new Array();
            NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            var msg4 = NewArray[3];
            console.log("arrPsnl->")
            console.log(obj.arrPsnl)
            var objLoc;
            if (obj.arrPsnl.length == 0) {
                obj.arrPsnl.push({
                    'userid': userId,
                    'Cart': { 'storeid': "" },
                    'Status': { 'status': "" }
                })
            }
            for (var q = 0; q < obj.arrPsnl.length; q++) {
                if (userId == obj.arrPsnl[q].userid) {
                    objLoc = q;
                    break;
                } else if (q == obj.arrPsnl.length - 1) {
                    objLoc = obj.arrPsnl.length
                    obj.arrPsnl[objLoc] = {
                        'userid': userId,
                        'Cart': { 'storeid': "" },
                        'Status': { 'status': "" }
                    }
                }
            }

            console.log(objLoc)
            console.log(obj.arrPsnl[objLoc].Status.status == '')
            if (msg1 == "會員") {
                obj2null.status(obj.arrPsnl[objLoc])
                if (msg2 == "資訊") {
                    memInfo.memInfo(event, lodash)
                } else if (msg2 == "編輯姓名") {
                    obj2addin.StatusAddin(obj.arrPsnl[objLoc], "編輯姓名", 1, '')
                    event.reply('請輸入您的姓名');
                    console.log(obj.arrPsnl[objLoc].Status)
                } else if (msg2 == "編輯電話") {
                    obj2addin.StatusAddin(obj.arrPsnl[objLoc], "編輯電話", 2, '')
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            } else if (msg1 == "店家") {
                obj2null.status(obj.arrPsnl[objLoc])
                if (msg2 == "資訊") {
                    storeInfo.storeInfo(event, lodash)
                } else if (msg2 == "查看菜單") {
                    foodInfo.foodInfo(event, msg3, lodash)
                } else if (msg2 == "聯絡店家") {
                    storeInfo.storeTel(event, msg3)
                } else if (msg2 == "加入購物車") {
                    addFood2Cart.addFood2Cart(event, obj.arrPsnl[objLoc], msg3, msg4, lodash);
                }
            } else if (msg1 == "購物車") {
                obj2null.status(obj.arrPsnl[objLoc])
                if (msg2 == "查詢") {
                    if (obj.arrPsnl[objLoc].Cart.storeid == "" || obj.arrPsnl[objLoc].Cart.arrfood.length < 1 || obj.arrPsnl[objLoc].Cart.arrfood[0].foodQty == 0) {
                        event.reply("請先點餐(cart)")
                    } else {
                        Cart.Cart(event, obj.arrPsnl[objLoc].Cart)
                    }
                } else if (msg2 == "清空") {
                    obj2null.cart(obj.arrPsnl[objLoc])
                    event.reply([
                        { 'type': 'text', 'text': '已清空' },
                        { 'type': 'text', 'text': '請重新點餐' }]
                    );
                } else if (msg2 == "修改餐點") {
                    if (obj.arrPsnl[objLoc].Cart.storeid == "" || obj.arrPsnl[objLoc].Cart.arrfood.length < 1 || obj.arrPsnl[objLoc].Cart.arrfood[0].foodQty == 0) {
                        event.reply('購物車是空的 !');
                    } else {
                        modCart.modCart(event, obj.arrPsnl[objLoc].Cart)
                    }
                } else if (msg2 == "修改餐點數量" || msg2 == "刪除餐點") {
                    if (obj.arrPsnl[objLoc].Cart.storeid == "" || obj.arrPsnl[objLoc].Cart.arrfood.length < 1 || obj.arrPsnl[objLoc].Cart.arrfood[0].foodQty == 0) {
                        event.reply('購物車是空的 !');
                    } else {
                        if (msg3 != "" && msg3 != null) {
                            modCart.modFood(event, obj.arrPsnl[objLoc], msg2, msg3)
                        }
                    }

                } else if (msg2 == "送出訂單") {
                    if (obj.arrPsnl[objLoc].Cart.storeid == "" || obj.arrPsnl[objLoc].Cart.arrfood.length < 1 || obj.arrPsnl[objLoc].Cart.arrfood[0].foodQty == 0) {
                        event.reply('購物車是空的 !');
                    } else if (obj.arrPsnl[objLoc].Cart.takeDate == "") {
                        event.reply('請先輸入取餐時間')
                    } else {
                        sendOrder.sendOrder(event, lodash.cloneDeep(obj.arrPsnl[objLoc].Cart), userId)
                        obj2null.cart(obj.arrPsnl[objLoc])
                    }
                }
            } else if (msg1 == "訂單查詢") {
                orderRecord.orderRecord(event, lodash);
            } else if (msg1 == "付款") {
                if (msg2 == "LP") {
                    pay_LP.pay_LP(event);
                }
            } else if (obj.arrPsnl[objLoc].Status.status != "") {
                var s = obj.arrPsnl[objLoc].Status.status
                if (s == "編輯姓名" || s == "編輯電話") {
                    memInfo.changeMemInfo(event, obj.arrPsnl[objLoc], s, msg, lodash)
                } else if (s == "inputQty" || s == "changeQty") {
                    inputQty.inputQty(event, obj.arrPsnl[objLoc], msg1, s)
                } else if (s == "changeStore") {
                    changeStore.changeStore(event, obj.arrPsnl[objLoc], msg1, msg2, lodash)
                }
            } else if (msg1 == "圖文選單") {
                if (msg2 == "切換至店家") { client.linkRichMenu(userId, "richmenu-fa2df501cd1a455e79d804b5f4bfb9b2"); }//圖文選單,切換至店家
                else if (msg2 == "切換至顧客") { client.linkRichMenu(userId, "richmenu-70f1291d871d2dfbc30ba43c04553ff2"); }//圖文選單,切換至顧客
            } if (msg1 == "訂單") {
                if (msg2 == "查詢") {
                    if (msg3 == "未接受") { store_orderRecord.orderRecord(event, userId, "未接單", lodash) }
                    else if (msg3 == "製作中") { store_orderRecord.orderRecord(event, userId, "製作中", lodash) }
                    else if (msg3 == "等待取餐") { store_orderRecord.orderRecord(event, userId, "等待取餐", lodash) }
                    else if (msg3 == "已取餐") { store_orderRecord.orderRecord(event, userId, "已取餐", lodash) }
                    else if (msg3 == "已拒絕") { store_orderRecord.orderRecord(event, userId, "已拒絕", lodash) }
                    else if (msg3 == "今日訂單") { store_orderRecord.orderRecord(event, userId, "今日訂單", lodash) }
                } else if (msg2 == "更新進度") {
                    if (msg3 == "接單" || msg3 == "拒絕" || msg3 == "等待取餐" || msg3 == "已取餐" || msg3 == "逾時未取餐") {
                        var orderid = msg4
                        var new_status = msg3
                        store_updateOrder.updateOrder(event, userId, new_status, orderid, lodash)
                    }
                }
            } else {
                //
                if (userId == 'Ub2fc9e2d0a4932b9d814bacb8df44565') {
                    event.reply(["e04,工三小", "好好講話"]);
                }
                //
                event.reply('我不太懂你在說什麼 ?')
            }

            //
            if (userId != 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8') {
                var user1 = 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8';
                var sendMsg1 = userName + ", " + msg;
                bot.push(user1, sendMsg1);
            }
            if (userId == 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8' && msg1 == "y") {
                if (msg1 == "y") {
                    var user1 = 'Ub2fc9e2d0a4932b9d814bacb8df44565';
                } else if (msg1 == "joe") {
                    var user1 = 'U39d8ae7745e822bb3296f4d2d288e80b';
                }
                bot.push(user1, msg2);
            }
            //
        }
    );
});
bot.on('postback', function (event) {
    event.source.profile().then(
        function (profile) {
            let data = event.postback.data;
            const userId = profile.userId;
            var objLoc = -1;
            if (obj.arrPsnl.length == 0) {
                event.reply("請先點餐(p1)")
            }
            for (var q = 0; q < obj.arrPsnl.length; q++) {
                console.log("q=" + q)
                if (userId == obj.arrPsnl[q].userid && obj.arrPsnl[q].Cart.arrfood.length > 0) {
                    objLoc = q;
                    break;
                } else if (q == obj.arrPsnl.length - 1) {
                    event.reply("請先點餐(p2)")
                }
            }
            if (data === "datetime" && objLoc != -1) {
                data += `${JSON.stringify(event.postback.params)}`;
                var NewArray = data.split("\"");
                var cdatetime = NewArray[3].split("T");
                var takedate = cdatetime[0];
                var taketime = cdatetime[1];
                obj.arrPsnl[objLoc].Cart.takeDate = takedate
                obj.arrPsnl[objLoc].Cart.takeTime = taketime
                Cart.Cart(event, obj.arrPsnl[objLoc].Cart)
                // event.reply(`Got postback: ${data}`);
            }
        }
    );
});
//--------------------------------
// 使用者封鎖群組
// //--------------------------------
bot.on('unfollow', function (event) {
    //取得使用者資料
    const userId = event.source.userId;

    //呼叫API, 將使用者資料刪除
    member.editMember(userId, 'N').then(data => {
        if (data == -9) {
            event.reply('執行錯誤');    //會員已封鎖群組, 本訊息無法送達
        } else {
            event.reply('已退出會員');  //會員已封鎖群組, 本訊息無法送達
        }
    });
});


//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);


//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));


//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function () {
    const port = server.address().port;
    //console.log("正在監聽埠號:", port);
});
