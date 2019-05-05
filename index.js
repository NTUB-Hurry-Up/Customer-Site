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
const addCart = require('./msg/order/addCart');
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
                console.log('q==0')
                Sta = -1;
            }else{
                for(var q = 0; q < objStatus.arrStatus.length; q++){
                    console.log("q="+q)
                    if(userId == objStatus.arrStatus[q].userid){
                        console.log('q==')
                        Sta = q;
                        break;
                    }else{
                        console.log('q!=')
                        Sta = -1;
                    }
                }
            }

            console.log("Sta-->"+Sta)
            var CartA;
            if(objCart.arrCart.length == 0){
                console.log('p==0')
                CartA = -1;
            }else{
                for(var p = 0; p < objCart.arrCart.length; p++){
                    console.log("p="+p)
                    if(userId == objCart.arrCart[p].userid){
                        console.log('p==')
                        CartA = p;
                        break;
                    }else{
                        console.log('p!=')
                        CartA = -1;
                    }
                }
            }
            console.log('CartA-->'+CartA)
            if (msg1 == "會員") {
                if (msg2 == "資訊") {
                   memInfo.memInfo(event)
                } else if (msg2 == "修改姓名") {
                    status = "進入修改姓名程序";
                    //console.log(status);
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
                            if(CartA == -1){
                                CartA = objCart.arrCart.length
                            }
                            if(objCart.arrCart[CartA].storeid == null){
                                objCart.arrCart[CartA]={
                                    'userid' : userId,
                                    'storeid' : cstoreid, 
                                    'storeName' : cstoreName,
                                    'arrfood' : []
                                }
                            }
                            if(objCart.arrCart[CartA].storeid == cstoreid){
                                objCart.arrCart[CartA].arrfood.push({
                                    'foodid' : cfoodid,
                                    'foodName' : cfoodName, 
                                    'foodPrice' : cfoodPrice
                                })

                                // status----start
                                console.log("Sta"+Sta)
                                if(Sta == -1){
                                    Sta = objStatus.arrStatus.length
                                }
                                console.log("Sta"+Sta)
                                objStatus.arrStatus[Sta]={
                                    'userid' : userId,
                                    'status' : "inputQty",
                                    'statusTime' : 2
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
                console.log("a---------------------------")
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
                }else if(ss == "arrCartQty") {

                    var isNum = /^[0-9]+$/;
                    var x = Boolean(!isNum.test(msg1)); 
                    var y = Boolean(parseInt(msg1) < 1); 
                    var z = Boolean(statusTime > 0); 
                    
                    //console.log("x-> "+x)
                    //console.log("y-> "+y)

                    if(x && z){
                        statusTime--;
                        if(statusTime==0){
                            status = ""
                            event.reply('請你閉嘴')
                        }else if(z){
                            event.reply([
                                {'type':'text', 'text':'請輸入數字 ! '},
                                {'type':'text', 'text':'你還剩'+statusTime+'機會'}]
                            );
                        }
                    }else if(y && z){
                        statusTime--;
                        if(statusTime==0){
                            status = ""
                            event.reply('請你閉嘴')
                        }else if(z){
                            event.reply([
                                {'type':'text', 'text':'請輸入大於0的數字啦 ! '},
                                {'type':'text', 'text':'你還剩'+statusTime+'機會'}]
                            );
                        }
                    }else if(z){
                        status = "";
                        var i = arrCart.length
                        //console.log("i="+i)
                        var cstoreid = arrCart[0][1]
                        var cstoreName = arrCart[0][2]
                        var cfoodid = arrCartQty[0]
                        var cfoodName = arrCartQty[1]
                        var cfoodPrice = arrCartQty[2]
                        //console.log(cstoreid+", "+cstoreName+", "+cfoodid+", "+cfoodName+", "+cfoodPrice)

                        for(var m = 0; m<i; m++){
                            //console.log("i="+i+" ,m="+m)
                            if(arrCart[m][0]==cfoodid){
                                //console.log("1->")
                                var oldQty = parseInt(arrCart[m][3]);
                                var newQty = (oldQty+parseInt(msg1)).toString();
                                arrCart[m][3]=newQty;
                                //console.log("1 "+arrCart[m][0]+", "+arrCart[m][3])
                                break;
                            }else if (m==(i-1)){
                                //console.log("2->")
                                var Qty=parseInt(msg1)+""
                                arrCart[i]=[cfoodid, cfoodName, cfoodPrice, Qty];
                                //console.log("2 "+arrCart[i][0]+", "+arrCart[i][3])
                                break;
                            }
                        }
                        i = arrCart.length
                        //console.log("i="+i)
                        arrCartQty.length="";
                        //console.log(arrCart)

                        const template = temp.temp_cart;
                        template.contents.body.contents[0].text = userName+" 的購物車";
                        template.contents.body.contents[1].contents[0].text = arrCart[0][2];
                        var arr=[];
                        arr.push(template)
                        arr[0].contents.body.contents[4].contents.length=0
                        
                        var cartTotalPrice = 0;

                        for(var k = 1; k<i; k++){
                            cartTotalPrice += arrCart[k][2]*arrCart[k][3]
                            //console.log("i="+i+" ,k="+k)

                            //console.log(arrCart)
                            //console.log(arrCart[k][0]+", "+arrCart[k][1])
                            arr[0].contents.body.contents[4].contents.push(
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "contents": [
                                    {
                                        "type": "text",
                                        "text": arrCart[k][1],
                                        "flex": 0,
                                        "margin": "sm",
                                        "size": "md",
                                        "weight": "bold"
                                    },
                                    {
                                        "type": "text",
                                        "text": arrCart[k][3],
                                        "size": "xs",
                                        "align": "center",
                                        "color": "#AAAAAA",
                                        "wrap": true
                                    },
                                    {
                                        "type": "text",
                                        "text": "$ "+arrCart[k][2]*arrCart[k][3],
                                        "size": "sm",
                                        "align": "end",
                                        "color": "#000000"
                                    }
                                    ]
                                }
                            );
                        }
                        if(arrCart[0].length>3){
                            template.contents.body.contents[6].contents[0].text = "取餐時間 : "+arrCart[0][3]+" "+arrCart[0][4];
                            template.contents.footer.contents[2].action.label = "修改取餐時間"
                            
                        }else{
                            template.contents.body.contents[6].contents[0].text = "取餐時間 : 未輸入";
                            template.contents.footer.contents[2].action.label = "輸入取餐時間"
                        }
                        //console.log(temp.temp_cart.contents.footer.contents[2].action[0])

                        // var today=new Date();
                        // Date.prototype.addDays = function(days) {
                        //     this.setDate(this.getDate() + days);
                        //     return this;
                        // }
                        //--date-time-formate---start------
                        var cHours = '';
                        if(today.getHours()+8 >= 24){
                            cHours = (today.getHours()+8-24 < 10 ? '0' : '')+(today.getHours()+8-24);
                            today.addDays(1);
                        }else{
                            cHours = (today.getHours()+8 < 10 ? '0' : '')+(today.getHours()+8);
                        }
                        var cMINMonth=(today.getMonth()+1<10 ? '0' : '')+(today.getMonth()+1)
                        var cMAXMonth=(today.getMonth()+3<10 ? '0' : '')+(today.getMonth()+3)
                        var cDay=(today.getDate()<10 ? '0' : '')+today.getDate();
                        var cMinutes = (today.getMinutes()<10 ? '0' : '')+today.getMinutes();
                        //--date-time-formate---end--------
                        var cOrderMIN =today.getFullYear()+"-"+cMINMonth+"-"+cDay+"T"+cHours+':'+cMinutes;
                        var cOrderMAX =today.getFullYear()+"-"+cMAXMonth+"-"+cDay+"T"+cHours+':'+cMinutes;
                        // var cOrderTime =cHours+':'+cMinutes;

                        //console.log(cOrderMIN);
                        //console.log(cOrderMAX);
                        cOrderMIN.toString();
                        template.contents.footer.contents[2].action.min = cOrderMIN
                        template.contents.footer.contents[2].action.max = cOrderMAX

                        template.contents.body.contents[7].contents[0].text = "總價 : $"+cartTotalPrice;
                        template.contents.footer.contents[0].action.text="購物車,清空"//清空購物車
                        template.contents.footer.contents[1].action.text="店家,查看菜單,"+arrCart[0][1];//繼續點餐
                        
                        //console.log("total "+cartTotalPrice);
                        statusTime=0;
                        event.reply(arr);
                    }
                    
                }else if(ss == "changeStore") {
                    objStatus.arrStatus[Sta].status=""
                    if(msg1 == "是"){
                        // arrCart.length = 0;
                         
                        // objCart.arrCart[CartA]={
                        //     'userid' : userId,
                        //     'storeid' : "", 
                        //     'storeName' : "",
                        //     'arrfood' : []
                        // }
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