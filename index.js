//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

const member = require('./member');
const store = require('./store');
const temp = require('./temp');
const order = require('./order');
const memInfo = require('./msg/member/memInfo');
const storeInfo = require('./msg/store/storeInfo');
const foodInfo = require('./msg/store/foodInfo');
const inputQtyCart = require('./msg/order/inputQtyCart');
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

var status = "";
var statusTime = 0;
var arrCart = [];
var arrCartQty = [];
var objStatus={
    arrStatus:[]
}
var objCart={
    arrCart:[]
}
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            var today=new Date();
            Date.prototype.addDays = function(days) {
                this.setDate(this.getDate() + days);
                return this;
            }
            const userName = profile.displayName;
            const userId = profile.userId;
            const phone = event.message.text;
            const msg = event.message.text;
            var NewArray = new Array();
            var NewArray = msg.split(",");
            var msg1 = NewArray[0];
            var msg2 = NewArray[1];
            var msg3 = NewArray[2];
            var msg4 = NewArray[3];
            var msg5 = NewArray[4];
            var msg6 = NewArray[5];
            var msg7 = NewArray[6];
            console.log("Cart->")
            console.log(objCart.arrCart)
            console.log("Status->"+objStatus.arrStatus.length)
            console.log(objStatus.arrStatus)
            
            var Sta;
            if(objStatus.arrStatus.length == 0){
                Sta = -1;
            }else{
                for(var q = 0; q < objStatus.arrStatus.length; q++){
                    if(userId == objStatus.arrStatus[q].userid){
                        Sta = q;
                        break;
                    }else{
                        Sta = -1;
                    }
                }
            }

            var CartA;
            if(objCart.arrCart.length == 0){
                CartA = -1;
            }else{
                for(var p = 0; p < objCart.arrCart.length; p++){
                    if(userId == objCart.arrCart[p].userid){
                        CartA = p;
                        break;
                    }else{
                        CartA = -1;
                    }
                }
            }
            if (msg1 == "會員") {
                if (msg2 == "資訊") {
                   memInfo.memInfo(event)
                } else if (msg2 == "修改姓名") {
                    status = "進入修改姓名程序";
                    event.reply('請輸入您的姓名');

                } else if (msg2 == "修改電話") {
                    status = "進入修改電話程序";
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            }else if(msg1 == "店家") {
                if(msg2 == "資訊") {
                    storeInfo.storeInfo(event)
                }else if(msg2 == "查看菜單") {
                    foodInfo.foodInfo(event, msg3)
                }else if(msg2 == "聯絡店家") {
                    store.fetchStoreTel(msg3).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply([
                                {'type':'text', 'text':'連絡電話 :'},
                                {'type':'text', 'text':data.storeTel}]
                            );  
                        }
                    })
                }else if(msg2 == "加入購物車"){
                    var cstoreid = msg3;
                    var cfoodid = msg4;
                    order.Cartfetchfood(cfoodid).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            cstoreName = data.storeName;
                            cfoodName = data.foodName;
                            cfoodPrice = data.foodPrice;
                            if(CartA == -1 || objCart.arrCart[CartA].storeid == null){
                                if(CartA == -1){CartA = objCart.arrCart.length}
                                objCart.arrCart[CartA]={
                                    'userid' : userId,
                                    'storeid' : cstoreid, 
                                    'storeName' : cstoreName,
                                    'orderDate' : null,
                                    'orderTime' : null,
                                    'arrfood' : []
                                }
                            }
                            
                            if(objCart.arrCart[CartA].storeid == cstoreid){
                                var i = objCart.arrCart[CartA].arrfood.length
                                if(i!=0){
                                    for(var m = 0; m<i; m++){
                                        if(objCart.arrCart[CartA].arrfood[m].foodid != cfoodid){
                                            objCart.arrCart[CartA].arrfood.push({
                                                'foodid' : cfoodid,
                                                'foodName' : cfoodName, 
                                                'foodPrice' : cfoodPrice,
                                                'foodQty' : 0
                                            })
                                        }
                                    }
                                }else{
                                    objCart.arrCart[CartA].arrfood.push({
                                        'foodid' : cfoodid,
                                        'foodName' : cfoodName, 
                                        'foodPrice' : cfoodPrice,
                                        'foodQty' : 0
                                    })
                                }
                                
                                console.log("arrfood")
                                console.log(objCart.arrCart[CartA].arrfood)
                                // status----start
                                console.log("Sta"+Sta)
                                if(Sta == -1){
                                    Sta = objStatus.arrStatus.length
                                }
                                console.log("Sta"+Sta)
                                objStatus.arrStatus[Sta]={
                                    'userid' : userId,
                                    'status' : "inputQty",
                                    'statusTime' : 2,
                                    'statusText' : cfoodid
                                }
                                // status----end
                                event.reply("數量?");
                            }else{
                                const template = temp.temp1.template;
                                template.actions[0].type = "message";
                                template.actions[0].label = "是";
                                template.actions[0].text = "是,"+cstoreid;

                                template.actions[1].type = "message";
                                template.actions[1].label = "否";
                                template.actions[1].text = "否,"+objCart.arrCart[CartA].storeid;
                                template.title = "購物車訊息"
                                template.text = "要改下訂這家店嗎 ?"
                                objStatus.arrStatus[Sta]={
                                    'userid' : userId,
                                    'status' : "changeStore",
                                    'statusTime' : 1
                                }
                                event.reply(temp.temp1);
                            }
                        }
                    })
                }
            }else if(msg1 == "購物車"){
                if(msg2 == "清空"){
                    status = "";
                    statusTime = 0;
                    arrCart.length = 0;
                    arrCartQty.length = 0;
                    event.reply([
                        {'type':'text', 'text':'已清空'},
                        {'type':'text', 'text':'請重新點餐'}]
                    );
                }else if(msg2 == "送出訂單"){
                    if(arrCart.length > 1 && arrCart[0].length>3){
                        var cUserid = arrCart[0][0]
                        var cStoreid = arrCart[0][1]
                        //--cOrderDate-cOrderTime--end--------
                        //--date-time-formate---start------
                        var cHours = '';
                        if(today.getHours()+8 >= 24){
                            cHours = (today.getHours()+8-24 < 10 ? '0' : '')+(today.getHours()+8-24);
                            today.addDays(1);
                        }else{
                            cHours = (today.getHours()+8 < 10 ? '0' : '')+(today.getHours()+8);
                        }
                        var cMonth=(today.getMonth()+1<10 ? '0' : '')+(today.getMonth()+1)
                        var cDay=(today.getDate()<10 ? '0' : '')+today.getDate();

                        // var cHours = (today.getHours()+8 < 10 ? '0' : '')+(today.getHours()+8);
                        var cMinutes = (today.getMinutes()<10 ? '0' : '')+today.getMinutes();
                        //--date-time-formate---end--------
                        var cOrderDate =today.getFullYear()+"-"+cMonth+"-"+cDay;
                        var cOrderTime =cHours+':'+cMinutes;
                        

                        //--cOrderDate-cOrderTime--end--------

                        var cTakeDate = arrCart[0][3];
                        var cTakeTime = arrCart[0][4];
                        order.addOrder(cUserid, cStoreid, cOrderDate, cOrderTime, cTakeDate, cTakeTime).then(data => {
                            //console.log(cUserid+"-"+cStoreid+"-"+cOrderDate+"-"+cOrderTime+"-"+cTakeDate+"-"+cTakeTime);
                            if (data == -9) {
                                event.reply('執行錯誤a');
                            } else {
                                var cOrderid = "";
                                var i = arrCart.length;
                                
                                for(var k = 1; k<i; k++){
                                    var cfoodid = arrCart[k][0];
                                    var cfoodPrice = arrCart[k][2];
                                    var cfoodQty = arrCart[k][3];
                                    var foodAmt = cfoodPrice*cfoodQty;
                                    cOrderid = data.orderid
                                    order.addOrderDetail(data.orderid, cfoodid, cfoodPrice, cfoodQty, foodAmt).then(data => {
                                        if (data == -9) {
                                            event.reply("執行錯誤b");
                                        } else {
                                            event.reply("訂單已送出 ! "+cOrderid);
                                        }
                                    })
                                }
                                arrCart.length = 0;
                                arrCartQty.length = 0;
                                //console.log(arrCart);
                                //console.log(arrCartQty);
                            }
                        })
                    }else if(arrCart.length > 1 && arrCart[1].length >= 1){
                        event.reply('請先輸入取餐時間')
                    }else{
                        event.reply('購物車是空的 !'); 
                    }
                }
            }else if(objStatus.arrStatus[Sta].status != "") {
                var ss = objStatus.arrStatus[Sta].status
                if (ss == "進入修改電話程序") {
                    status = "";
                    member.UpdatePhone(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply('電話已修改完成');
                        }
                    })
                }else if(ss == "進入修改姓名程序") {
                    
                    //console.log(status);
                    status = "";
                    
                    //console.log(status);
                    member.UpdateName(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply('姓名已修改完成');
                        }
                    })
                }else if(ss == "inputQty") {

                    var isNum = /^[0-9]+$/;
                    var x = Boolean(!isNum.test(msg1)); 
                    var y = Boolean(parseInt(msg1) < 1); 
                    var z = Boolean(objStatus.arrStatus[Sta].statusTime > 0); 
                    
                    if(z){
                        if(x){
                            objStatus.arrStatus[Sta].statusTime--;
                            event.reply([
                                {'type':'text', 'text':'請輸入數字 ! '},
                                {'type':'text', 'text':'你還剩'+objStatus.arrStatus[Sta].statusTime+'機會'}]
                            );
                        }else if(y){
                            objStatus.arrStatus[Sta].statusTime--;
                            event.reply([
                                {'type':'text', 'text':'請輸入大於0的數字啦 ! '},
                                {'type':'text', 'text':'你還剩'+objStatus.arrStatus[Sta].statusTime+'機會'}]
                            );
                        }else{
                            var i = objCart.arrCart[CartA].arrfood.length;
                            var cstoreid = objCart.arrCart[CartA].storeid;
                            var cstoreName = objCart.arrCart[CartA].storeName;

                            for(var m = 0; m<i; m++){
                                if(objCart.arrCart[CartA].arrfood[m].foodid==objStatus.arrStatus[Sta].statusText){
                                    var oldQty = parseInt(objCart.arrCart[CartA].arrfood[m].foodQty);
                                    var newQty = (oldQty+parseInt(msg1)).toString();
                                    objCart.arrCart[CartA].arrfood[m].foodQty=newQty;
                                    break;
                                }
                            }
                            console.log(objCart.arrCart[CartA].arrfood)
                            
                            inputQtyCart.inputQtyCart(event, objCart)
                            
                            objStatus.arrStatus[Sta].statusTime=0;
                        }
                    }else{
                        event.reply('請你閉嘴')
                    }
                    
                    
                }else if(ss == "changeStore") {
                    objStatus.arrStatus[Sta].status=""
                    objStatus.arrStatus[Sta].statusTime=0
                    if(msg1 == "是"){
                        console.log("b---------------------------")
                        objCart.arrCart[CartA].storeid = null
                        objCart.arrCart[CartA].storeName = null
                        objCart.arrCart[CartA].arrfood = null
                        foodInfo.foodInfo(event, msg2)
                    }else if(msg1 == "否"){
                        foodInfo.foodInfo(event, msg2)
                    }

                }
            }
        }
    );
});
bot.on('postback', function (event) {
    event.source.profile().then(
        function (profile) {
            
            let data = event.postback.data;
            
            /*if(data === "輸入取餐時間"){
                //console.log("輸入取餐時間")
                var today=new Date();
                //--date-time-formate---start------
                var cMINMonth=(today.getMonth()+1<10 ? '0' : '')+(today.getMonth()+1)
                var cMAXMonth=(today.getMonth()+3<10 ? '0' : '')+(today.getMonth()+3)
                var cDay=(today.getDate()<10 ? '0' : '')+today.getDate();

                var cHours = (today.getHours()+8 < 10 ? '0' : '')+(today.getHours()+8);
                var cMinutes = (today.getMinutes()<10 ? '0' : '')+today.getMinutes();
                //--date-time-formate---end--------
                var cOrderMINDate =today.getFullYear()+"-"+cMINMonth+"-"+cDay;
                var cOrderMAXDate =today.getFullYear()+"-"+cMAXMonth+"-"+cDay;
                var cOrderTime =cHours+':'+cMinutes;

                temp.datetimepicker.template.actions[0].min = cOrderMINDate+"t"+cOrderTime
                temp.datetimepicker.template.actions[0].max = cOrderMAXDate+"t"+cOrderTime

                //console.log(cOrderMINDate+"t"+cOrderTime);
                //console.log(cOrderMAXDate+"t"+cOrderTime);
                event.reply(temp.datetimepicker)

            } */
            if(data === "datetime"){
                data += `${JSON.stringify(event.postback.params)}`;                
                var NewArray = data.split("\"");
                var cdatetime = NewArray[3].split("T");
                var takedate = cdatetime[0];
                var taketime = cdatetime[1];
                //console.log(takedate+", "+taketime)
                arrCart[0][3]=takedate
                arrCart[0][4]=taketime
                //console.log(arrCart)
                event.reply(arrCart[0][0]+", "+arrCart[0][1]+", "+arrCart[0][2]+", "+arrCart[0][3]+", "+arrCart[0][4]);


                // event.reply(`Got postback: ${data}`);
            }
        }
    );
});
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

//匯出
module.exports = {objCart};