//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
var lodash = require('lodash');
const member = require('./member');
const store = require('./store');
const temp = require('./temp');
const order = require('./order');
const record = require('./record');
const obj2null = require('./obj2null');
const obj2addin = require('./obj2addin');
const test2 = require('./test2');
const memInfo = require('./msg/member/memInfo');
const storeInfo = require('./msg/store/storeInfo');
const foodInfo = require('./msg/store/foodInfo');
const Cart = require('./msg/order/Cart');
const sendOrder = require('./msg/order/sendOrder');
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
// --------------------------------
// 機器人接受訊息的處理
// --------------------------------
var objStatus = {
    arrStatus: []
}
var objCart = {
    arrCart: []
}
// setTimeout(function () {
//     var userId = 'Uf39d8816611fb683a2ed16d81c1b8067';
//     var sendMsg = "你科成為喔";
//     bot.push(userId, [sendMsg]);
//     console.log('userId: ' + userId);
//     console.log('send: ' + sendMsg);
// }, 100);
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            const userName = profile.displayName;
            const userId = profile.userId;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            var msg4 = NewArray[3];
            console.log("Cart->")
            console.log(objCart.arrCart)
            console.log("Status->" + objStatus.arrStatus.length)
            console.log(objStatus.arrStatus)

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
                    memInfo.memInfo(event)
                } else if (msg2 == "修改姓名") {
                    obj2addin.statusAddin(objStatus, Sta, userId, "修改姓名", 1)
                    event.reply('請輸入您的姓名');

                } else if (msg2 == "修改電話") {
                    obj2addin.statusAddin(objStatus, Sta, userId, "修改電話", 1)
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            } else if (msg1 == "店家") {
                obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                if (msg2 == "資訊") {
                    storeInfo.storeInfo(event)
                } else if (msg2 == "查看菜單") {
                    foodInfo.foodInfo(event, msg3)
                } else if (msg2 == "聯絡店家") {
                    store.fetchStoreTel(msg3).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply([
                                { 'type': 'text', 'text': '連絡電話 :' },
                                { 'type': 'text', 'text': data.storeTel }]
                            );
                        }
                    })
                } else if (msg2 == "加入購物車") {
                    var cstoreid = msg3;
                    var cfoodid = msg4;
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
                            if (CartA == -1 || objCart.arrCart[CartA].storeid == "") {
                                if (CartA == -1) { CartA = objCart.arrCart.length }
                                objCart.arrCart[CartA] = {
                                    'userid': userId,
                                    'userName' : '',
                                    'storeid': cstoreid,
                                    'storeName': cstoreName,
                                    'storeAdd': cstoreAdd,
                                    'takeDate': '',
                                    'takeTime': '',
                                    'arrfood': []
                                }
                                memInfo.fetchMemName(userId, objCart.arrCart[CartA])
                                console.log("date.length " + objCart.arrCart[CartA].takeDate.length);
                            }

                            if (objCart.arrCart[CartA].storeid == cstoreid) {
                                var i = objCart.arrCart[CartA].arrfood.length
                                if (i != 0) {
                                    for (var m = 0; m < i; m++) {
                                        if (objCart.arrCart[CartA].arrfood[m].foodid == cfoodid) {
                                            break;
                                        } else if (m == i - 1) {
                                            objCart.arrCart[CartA].arrfood.push({
                                                'foodid': cfoodid,
                                                'foodName': cfoodName,
                                                'foodPrice': cfoodPrice,
                                                'foodQty': 0
                                            })
                                        }
                                    }
                                } else {
                                    objCart.arrCart[CartA].arrfood.push({
                                        'foodid': cfoodid,
                                        'foodName': cfoodName,
                                        'foodPrice': cfoodPrice,
                                        'foodQty': 0
                                    })
                                }

                                console.log("arrfood")
                                console.log(objCart.arrCart[CartA].arrfood)
                                // status----start
                                console.log("Sta" + Sta)
                                if (Sta == -1) {
                                    Sta = objStatus.arrStatus.length
                                }
                                console.log("Sta" + Sta)
                                objStatus.arrStatus[Sta] = {
                                    'userid': userId,
                                    'status': "inputQty",
                                    'statusTime': 2,
                                    'statusText': cfoodid
                                }
                                // status----end
                                event.reply("數量?");
                            } else {
                                const template = temp.temp1.template;
                                template.actions[0].type = "message";
                                template.actions[0].label = "是";
                                template.actions[0].text = "是," + cstoreid;

                                template.actions[1].type = "message";
                                template.actions[1].label = "否";
                                template.actions[1].text = "否," + objCart.arrCart[CartA].storeid;
                                template.title = "購物車訊息"
                                template.text = "要改下訂這家店嗎 ?"
                                obj2addin.statusAddin(objStatus, Sta, userId, "changeStore", 1)
                                event.reply(temp.temp1);
                            }
                        }
                    })
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
                record.fetchOrder(userId).then(data => {
                    if (data == -1) {
                        event.reply('沒有紀錄');
                    } else if (data == -9) {
                        event.reply('執行錯誤');
                    } else {
                        var s=""
                        var scnt = -1
                        var fcnt = 0
                        var arr=[]
                        arr.push(lodash.cloneDeep(temp.fetchOrder))
                        console.log("data.length = "+data.length)
                        for(var i = 0; i<data.length; i++){

                            // console.log("i = "+i)
                            // console.log(s+"?= "+data[i].orderid)
                            if(s != data[i].orderid){
                                scnt++;
                                fcnt = 0
                                s = data[i].orderid
                                console.log(data[i].orderid)
                                // console.log("scnt = "+scnt)
                                arr[0].contents.contents[scnt] = lodash.cloneDeep(temp.orderComplete.contents)
                                arr[0].contents.contents[scnt].body.contents[0].text = data[i].orderid
                                arr[0].contents.contents[scnt].body.contents[1].contents[1].text = data[i].storeName
                            }
                            var tempRe = lodash.cloneDeep(temp.orderCompleteRepeat)
                            arr[0].contents.contents[scnt].body.contents[5].contents[fcnt+2]=tempRe
                            
                            console.log(fcnt)
                            fcnt++;
                            // console.log("i = "+i+"scnt = "+scnt)
                            // console.log(data[i].foodName)
                        }
                        event.reply(arr);
                    }
                })
               
            } else if (msg1 == "A") {
                var arr=[]
                arr.push(lodash.cloneDeep(temp.fetchOrder))
                arr[0].contents.contents[0] = lodash.cloneDeep(temp.orderComplete.contents)
                var tempRe = lodash.cloneDeep(temp.orderCompleteRepeat)
                arr[0].contents.contents[0].body.contents[5].contents[2]=tempRe
                event.reply(arr);
            } else if (msg1 == "B") {
                var user1 = 'Ud7d55fbcfc8d4c4a86a35ff8ec60e2b8';
                var sendMsg1 = "push hands up ";
                test2.push1(bot, user1, sendMsg1)
            } else if (Sta != -1 && objStatus.arrStatus[Sta].status != "") {
                var ss = objStatus.arrStatus[Sta].status
                if (ss == "修改電話") {
                    obj2null.status2null(null, objStatus.arrStatus[Sta], -1, Sta)
                    member.UpdatePhone(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply('電話已修改完成');
                        }
                    })
                } else if (ss == "修改姓名") {
                    obj2null.status2null(null, objStatus.arrStatus[Sta], -1, Sta)
                    member.UpdateName(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            if(CartA != -1){
                                objCart.arrCart[CartA].userName = msg
                                event.reply('姓名已修改完成');
                            }
                        }
                    })
                } else if (ss == "inputQty") {

                    var isNum = /^[0-9]+$/;
                    var x = Boolean(!isNum.test(msg1));
                    var y = Boolean(parseInt(msg1) < 1);
                    var z = Boolean(objStatus.arrStatus[Sta].statusTime > 0);
                    if (z) {
                        if (x) {
                            objStatus.arrStatus[Sta].statusTime--;
                            event.reply([
                                { 'type': 'text', 'text': '請輸入數字 ! ' },
                                { 'type': 'text', 'text': '你還剩' + objStatus.arrStatus[Sta].statusTime + '機會' }]
                            );
                        } else if (y) {
                            objStatus.arrStatus[Sta].statusTime--;
                            event.reply([
                                { 'type': 'text', 'text': '請輸入大於0的數字啦 ! ' },
                                { 'type': 'text', 'text': '你還剩' + objStatus.arrStatus[Sta].statusTime + '機會' }]
                            );
                        } else {
                            var i = objCart.arrCart[CartA].arrfood.length;
                            var cstoreid = objCart.arrCart[CartA].storeid;
                            var cstoreName = objCart.arrCart[CartA].storeName;

                            for (var m = 0; m < i; m++) {
                                if (objCart.arrCart[CartA].arrfood[m].foodid == objStatus.arrStatus[Sta].statusText) {
                                    var oldQty = parseInt(objCart.arrCart[CartA].arrfood[m].foodQty);
                                    var newQty = (oldQty + parseInt(msg1)).toString();
                                    objCart.arrCart[CartA].arrfood[m].foodQty = newQty;
                                    break;
                                }
                            }
                            console.log(objCart.arrCart[CartA].arrfood)

                            Cart.Cart(event, objCart.arrCart[CartA], userName)
                            obj2null.status2null(objCart.arrCart[CartA], objStatus.arrStatus[Sta], CartA, Sta)
                        }
                    } else {
                        var i = objCart.arrCart[CartA].arrfood.length;
                        for (var m = 0; m < i; m++) {
                            if (objCart.arrCart[CartA].arrfood[m].foodQty == 0) {

                                objCart.arrCart[CartA].arrfood[m].length = 0
                            }
                        }
                        objStatus.arrStatus[Sta].status = "";
                        objStatus.arrStatus[Sta].statusTime = 0;
                        objStatus.arrStatus[Sta].statusText = "";
                        event.reply('請你閉嘴')
                    }


                } else if (ss == "changeStore") {
                    objStatus.arrStatus[Sta].status = ""
                    objStatus.arrStatus[Sta].statusTime = 0
                    if (msg1 == "是") {
                        objCart.arrCart[CartA].storeid = ''
                        objCart.arrCart[CartA].storeName = ''
                        objCart.arrCart[CartA].storeAdd = ''
                        objCart.arrCart[CartA].arrfood = ''
                        foodInfo.foodInfo(event, msg2)
                    } else if (msg1 == "否") {
                        foodInfo.foodInfo(event, msg2)
                    }

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
            const userName = profile.displayName;
            var CartA;
            if (objCart.arrCart.length == 0) {
                CartA = -1;
                event.reply("閉嘴 ! , 請先點餐(p1)")
            } else {
                for (var p = 0; p < objCart.arrCart.length; p++) {
                    if (userId == objCart.arrCart[p].userid) {
                        CartA = p;
                        break;
                    } else if (p == objCart.arrCart.length - 1) {
                        event.reply("閉嘴 ! , 請先點餐(p2)")
                    }
                }
            }
            if (data === "datetime" && CartA != -1) {
                data += `${JSON.stringify(event.postback.params)}`;
                var NewArray = data.split("\"");
                var cdatetime = NewArray[3].split("T");
                var takedate = cdatetime[0];
                var taketime = cdatetime[1];
                objCart.arrCart[CartA].takeDate = takedate
                objCart.arrCart[CartA].takeTime = taketime
                Cart.Cart(event, objCart.arrCart[CartA], userName)
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
