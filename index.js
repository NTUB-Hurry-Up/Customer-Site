//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
var lodash = require('lodash');
const member = require('./member');
const temp = require('./temp');
const order = require('./order');
const obj2null = require('./obj2null');
const obj2addin = require('./obj2addin');
const memInfo = require('./msg/member/memInfo');
const storeInfo = require('./msg/store/storeInfo');
const foodInfo = require('./msg/store/foodInfo');
const addFood2Cart = require('./msg/order/addFood2Cart');
const changeStore = require('./msg/order/changeStore');
const inputQty = require('./msg/order/inputQty');
const Cart = require('./msg/order/Cart');
const sendOrder = require('./msg/order/sendOrder');
const orderRecord = require('./msg/order/orderRecord');
//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553827455',
    channelSecret: '633baa5dafd610ad5bb69a495df003a0',
    channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});


//--------------------------------
// 使用者加入群組或解除封鎖
//--------------------------------
bot.on('follow', function (event) {
    event.source.profile().then(
        function (profile) {
            //取得使用者資料
            const userId = profile.userId;
            const userName = profile.displayName;
            //呼叫API, 將使用者資料寫入資料庫
            member.addMember(userId, userName).then(data => {
                if (data == -9) {
                    event.reply('執行錯誤');
                } else {
                    event.reply('已加入會員, Hi !');
                }
            })
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
var objStatus = {
    arrStatus: []
}
var objCart = {
    arrCart: []
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
                    'Cart': {
                        'storeid': ""
                    },
                    'Status': {}
                })
                console.log("==0")
            }
            for (var q = 0; q < obj.arrPsnl.length; q++) {
                console.log("q=" + q)
                if (userId == obj.arrPsnl[q].userid) {
                    objLoc = q;
                    console.log("qqqqqqqqqqqqqqqqqqq")
                    break;
                } else if (q == obj.arrPsnl.length - 1) {
                    objLoc = obj.arrPsnl.length
                    obj.arrPsnl[objLoc] = {
                        'userid': userId,
                        'Cart': {
                            'storeid': ""
                        },
                        'Status': {}
                    }
                }
            }


            console.log(objLoc)

            var Sta;
            if (objStatus.arrStatus.length == 0) {
                Sta = -1;
            } else {
                for (var q = 0; q < objStatus.arrStatus.length; q++) {
                    if (userId == objStatus.arrStatus[q].userid) {
                        Sta = q;
                        break;
                    } else {
                        Sta = -1;
                    }
                }
            }

            var CartA;
            if (objCart.arrCart.length == 0) {
                CartA = -1;
            } else {
                for (var p = 0; p < objCart.arrCart.length; p++) {
                    if (userId == objCart.arrCart[p].userid) {
                        CartA = p;
                        break;
                    } else {
                        CartA = -1;
                    }
                }
            }
            if (msg1 == "會員") {
                obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                if (msg2 == "資訊") {
                    memInfo.memInfo(event, lodash)
                } else if (msg2 == "修改姓名") {
                    obj2addin.StatusAddin(obj.arrPsnl[objLoc], "修改姓名", 1, '')
                    event.reply('請輸入您的姓名');
                    console.log(obj.arrPsnl[objLoc].Status)
                } else if (msg2 == "修改電話") {
                    obj2addin.StatusAddin(obj.arrPsnl[objLoc], "修改電話", 1, '')
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            } else if (msg1 == "店家") {
                obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                if (msg2 == "資訊") {
                    storeInfo.storeInfo(event, lodash)
                } else if (msg2 == "查看菜單") {
                    foodInfo.foodInfo(event, msg3, lodash)
                } else if (msg2 == "聯絡店家") {
                    storeInfo.storeTel(event, msg3)
                } else if (msg2 == "加入購物車") {
                    var cstoreid = msg3;
                    var cfoodid = msg4;
                    addFood2Cart.addFood2Cart(event, obj.arrPsnl[objLoc], cstoreid, cfoodid, lodash);
                }
            } else if (msg1 == "購物車") {
                obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                if (msg2 == "查詢") {
                    if (CartA == -1 || objCart.arrCart[CartA].arrfood.length < 1 || objCart.arrCart[CartA].arrfood[0].foodQty == 0) {
                        event.reply("閉嘴 ! , 請先點餐(cart)")
                    } else {
                        Cart.Cart(event, objCart.arrCart[CartA], userName)
                    }
                } else if (msg2 == "清空") {
                    obj2null.cart2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                    event.reply([
                        { 'type': 'text', 'text': '已清空' },
                        { 'type': 'text', 'text': '請重新點餐' }]
                    );
                } else if (msg2 == "送出訂單") {
                    if (CartA == -1 || objCart.arrCart[CartA].arrfood.length < 1 || objCart.arrCart[CartA].arrfood[0].foodQty == 0) {
                        event.reply('購物車是空的 !');
                    } else if (objCart.arrCart[CartA].takeDate == "") {
                        event.reply('請先輸入取餐時間')
                    } else {
                        sendOrder.sendOrder(event, lodash.cloneDeep(objCart.arrCart[CartA]), userName)
                        obj2null.cart2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                    }
                }
            } else if (msg1 == "訂單查詢") {
                orderRecord.orderRecord(event, lodash);
            } else if ((obj.arrPsnl[objLoc].Status.status != "") || (Sta != -1 && objStatus.arrStatus[Sta].status != "")) {
                var ss = 0// objStatus.arrStatus[Sta].status
                var s = obj.arrPsnl[objLoc].Status.status
                if (s == "修改電話" || s == "修改姓名") {
                    obj2null.status(obj.arrPsnl[objLoc])
                    memInfo.changeMemInfo(event, obj.arrPsnl[objLoc], s, msg, userId)
                } else if (s == "inputQty") {//work
                    inputQty.inputQty(event, obj.arrPsnl[objLoc], msg1)
                } else if (s == "changeStore") {
                    changeStore.changeStore(event, obj.arrPsnl[objLoc], msg1, msg2, lodash)
                }
            } else {
                event.reply('e04, 工三小')
            }
            // if(userId == 'Uf39d8816611fb683a2ed16d81c1b8067'){
            //     var user1 = 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8';
            //     var sendMsg1 = "@潘, "+msg;

            //     test2.push1(bot, user1, sendMsg1)
            // }
            // if(userId == 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8' && msg1 == "C"){
            //     var user1 = 'Uf39d8816611fb683a2ed16d81c1b8067';
            //     // var sendMsg1 = "push hands up ";
            //     test2.push1(bot, user1, msg2)
            // }
            // if(userId == 'Uadfb1e88125823625a1303ccf629e549'){
            //     var user1 = 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8';
            //     var sendMsg1 = "LPL, "+msg;

            //     test2.push1(bot, user1, sendMsg1)
            // }
            // if(userId == 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8' && msg1 == "LPL"){
            //     var user1 = 'Uadfb1e88125823625a1303ccf629e549';
            //     // var sendMsg1 = "push hands up ";
            //     test2.push1(bot, user1, msg2)
            // }
        }
    );
});
bot.on('postback', function (event) {
    event.source.profile().then(
        function (profile) {
            let data = event.postback.data;
            const userId = profile.userId;
            // var objLoc
            // if (obj.arrPsnl[objLoc].Cart.arrfood.length == 0) {
            //     event.reply("閉嘴 ! , 請先點餐(p1)")
            // } else {
            //     for (var p = 0; p < objCart.arrCart.length; p++) {
            //         if (userId == objCart.arrCart[p].userid) {
            //             CartA = p;
            //             break;
            //         } else if (p == objCart.arrCart.length - 1) {
            //             event.reply("閉嘴 ! , 請先點餐(p2)")
            //         }
            //     }
            // }
            var objLoc = -1;
            if (obj.arrPsnl.length == 0) {
                event.reply("閉嘴 ! , 請先點餐(p1)")
            }
            for (var q = 0; q < obj.arrPsnl.length; q++) {
                console.log("q=" + q)
                if (userId == obj.arrPsnl[q].userid) {
                    objLoc = q;
                    break;
                } else if (q == obj.arrPsnl.length - 1) {
                    event.reply("閉嘴 ! , 請先點餐(p2)")
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
//Employee.A.splice(0,1);
//--------------------------------
// 使用者封鎖群組
//--------------------------------
bot.on('unfollow', function (event) {
    //取得使用者資料
    const userId = event.source.userId;

    //呼叫API, 將使用者資料刪除
    member.deleteMember(userId).then(data => {
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
