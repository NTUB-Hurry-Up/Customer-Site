//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

const member = require('./member');
const store = require('./store');
const temp = require('./temp');
const order = require('./order');
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
                    event.reply('已加入會員, 廢物 !');
                }
            })
        }
    );
});
// --------------------------------
// 機器人接受訊息的處理
// --------------------------------

var status = "";
var postStatus = "";
var statusTime = 0;
var arrCart = [];
var arrCartQty = [];
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
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

            if (msg1 == "會員") {
                console.log("if1 status: " + status);
                if (msg2 == "資訊") {
                    member.fetchMember(userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            const template = temp.temp1.template;
                            template.actions[0].type = "message";
                            template.actions[0].label = "修改姓名";
                            template.actions[0].text = "會員,修改姓名";

                            template.actions[1].type = "message";
                            template.actions[1].label = "修改電話";
                            template.actions[1].text = "會員,修改電話";
                            template.title = "會員資訊"
                            template.text = "姓名 : " + data.name + "\n電話 : " + data.phone
                            event.reply(temp.temp1);
                        }
                    })
                } else if (msg2 == "修改姓名") {
                    status = "進入修改姓名程序";
                    event.reply('請輸入您的姓名');

                } else if (msg2 == "修改電話") {
                    status = "進入修改電話程序";
                    event.reply('請輸入您的電話\nex: 09xxxxxxxx');
                }
            }else if(msg1 == "店家") {
                if(msg2 == "資訊") {
                    store.fetchStore().then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            console.log("fuction ff");
                            var arrStoreList = [];
                            // var o = temp.temp_store_contents
                            arrStoreList.push(temp.temp_store);
                            // console.log("first-> arr: " + arr.length)
                
                            for (var i = 0; i < data.length; i++) {
                                // (function(o){
                                //     o.body.contents[0].text=data[i].storeName;
                                //     o.body.contents[1].contents[0].contents[1].text=data[i].storeAdd;
                                //     o.body.contents[1].contents[1].contents[1].text=data[i].storeTel;
                                //     arr[0].contents.contents.push(o);
                                // })(Object.assign({}, o));
                
                                arrStoreList[0].contents.contents.push(
                                    {
                                        "type": "bubble",
                                        "hero": {
                                            "type": "image",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                                            "size": "full",
                                            "aspectRatio": "20:13",
                                            "aspectMode": "cover",
                                            "action": {
                                                "type": "uri",
                                                "label": "Line",
                                                "uri": "https://linecorp.com/"
                                            }
                                        },
                                        "body": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": data[i].storeName,
                                                    "size": "xl",
                                                    "weight": "bold"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "spacing": "sm",
                                                    "margin": "lg",
                                                    "contents": [
                                                        {
                                                            "type": "box",
                                                            "layout": "baseline",
                                                            "spacing": "sm",
                                                            "contents": [
                                                                {
                                                                    "type": "text",
                                                                    "text": "Place",
                                                                    "flex": 1,
                                                                    "size": "sm",
                                                                    "color": "#AAAAAA"
                                                                },
                                                                {
                                                                    "type": "text",
                                                                    "text": data[i].storeAdd,
                                                                    "flex": 5,
                                                                    "size": "sm",
                                                                    "color": "#666666",
                                                                    "wrap": true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type": "box",
                                                            "layout": "baseline",
                                                            "spacing": "sm",
                                                            "contents": [
                                                                {
                                                                    "type": "text",
                                                                    "text": "Tel",
                                                                    "flex": 1,
                                                                    "size": "sm",
                                                                    "color": "#AAAAAA"
                                                                },
                                                                {
                                                                    "type": "text",
                                                                    "text": data[i].storeTel,
                                                                    "flex": 5,
                                                                    "size": "sm",
                                                                    "color": "#666666",
                                                                    "wrap": true
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        "footer": {
                                            "type": "box",
                                            "layout": "vertical",
                                            "flex": 0,
                                            "spacing": "sm",
                                            "contents": [
                                                {
                                                    "type": "button",
                                                    "action": {
                                                        "type": "message",
                                                        "label": "查看菜單",
                                                        "text": "店家,查看菜單," + data[i].storeid
                                                    },
                                                    "height": "sm",
                                                    "style": "link"
                                                },
                                                {
                                                    "type": "button",
                                                    "action": {
                                                        "type": "message",
                                                        "label": "聯絡店家",
                                                        "text": "店家,聯絡店家," + data[i].storeid
                                                    },
                                                    "height": "sm",
                                                    "style": "link"
                                                },
                                                {
                                                    "type": "spacer",
                                                    "size": "sm"
                                                }
                                            ]
                                        }
                
                                    }
                                );
                
                            }
                            console.log(arrStoreList[0])
                            event.reply(arrStoreList[0]);
                            arrStoreList[0].contents.contents.length = 0;
                            arrStoreList.length = 0;
                            data.length = 0;
                        }
                    })
                    
                }else if(msg2 == "查看菜單") {
                    store.fetchStorefood(msg3).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            var arr2 = [];
                            arr2.push(temp.temp_menu);
                            for (var i = 0; i < data.length; i++) {
                                console.log(data[i].foodid + " " + data[i].foodPrice + " " + data[i].foodName)
                                arr2[0].contents.contents.push({

                                    "type": "bubble",
                                    "hero": {
                                        "type": "image",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
                                        "size": "full",
                                        "aspectRatio": "20:13",
                                        "aspectMode": "cover",
                                        "action": {
                                            "type": "uri",
                                            "label": "Action",
                                            "uri": "https://linecorp.com"
                                        }
                                    },
                                    "body": {
                                        "type": "box",
                                        "layout": "vertical",
                                        "spacing": "md",
                                        "action": {
                                            "type": "uri",
                                            "label": "Action",
                                            "uri": "https://linecorp.com"
                                        },
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": data[i].foodName,
                                                "size": "xl",
                                                "weight": "bold"
                                            },
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "box",
                                                        "layout": "baseline",
                                                        "contents": [
                                                            {
                                                                "type": "text",
                                                                "text": "Price",
                                                                "flex": 1,
                                                                "size": "lg",
                                                                "color": "#AAAAAA"
                                                            },
                                                            {
                                                                "type": "text",
                                                                "text": "NT$"+data[i].foodPrice,
                                                                "flex": 0,
                                                                "margin": "lg",
                                                                "size": "lg",
                                                                "align": "end",
                                                                "weight": "regular"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                                                "size": "xs",
                                                "color": "#AAAAAA",
                                                "wrap": true
                                            }
                                        ]
                                    },
                                    "footer": {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "button",
                                                "action": {
                                                    "type": "message",
                                                    "label": "Add to Cart",
                                                    "text": "店家,加入購物車,"+data[i].storeid+","+data[i].foodid
                                                },
                                                "color": "#905C44",
                                                "style": "primary"
                                            }
                                        ]
                                    }

                                })
                            }
                            event.reply(arr2[0]);
                            arr2[0].contents.contents.length = 0;
                            arr2.length = 0;
                            data.length = 0;
                        }
                    })
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
                    var cstoreName = "";
                    var cfoodName = "";
                    var cfoodPrice = "";
                    order.Cartfetchfood(cfoodid).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            cstoreName = data.storeName;
                            cfoodName = data.foodName;
                            cfoodPrice = data.foodPrice;

                            console.log("foodName->"+data.foodName+", storeName->"+data.storeName+", foodPrice->"+data.foodPrice)
                            if(arrCart.length == 0){ 
                                arrCart[0]=[userId,cstoreid,cstoreName];
                            }
                            if(arrCart[0][1] == cstoreid){
                                arrCartQty=[cfoodid, cfoodName, cfoodPrice];
                                status = "arrCartQty";
                                statusTime = 2;
                                event.reply("數量 ?");
                            }else{
                                const template = temp.temp1.template;
                                template.actions[0].type = "message";
                                template.actions[0].label = "是";
                                template.actions[0].text = msg1+",查看菜單,"+cstoreid+",是";
    
                                template.actions[1].type = "message";
                                template.actions[1].label = "否";
                                template.actions[1].text = msg1+",查看菜單,"+arrCart[0][1]+",否";
                                template.title = "購物車訊息"
                                template.text = "要改下訂這家店嗎 ?\n你科成為喔 ?"
                                status = "changeStore";
                                event.reply(temp.temp1);
                                
                            }

                            console.log(arrCart.length);
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
                        var today=new Date();
                        var cOrderDate =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
                        var cOrderTime =(today.getHours()+8)+':'+today.getMinutes();
                        order.addOrder(cUserid, cStoreid, cOrderDate, cOrderTime).then(data => {
                            if (data == -9) {
                                event.reply('執行錯誤');
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
                                            event.reply("執行錯誤");
                                        } else {
                                            event.reply("訂單已送出, 廢物 !, "+cOrderid);
                                        }
                                    })
                                }
                                arrCart.length = 0;
                                arrCartQty.length = 0;
                                console.log(arrCart);
                                console.log(arrCartQty);
                            }
                        })
                    }else if(arrCart.length > 1 && arrCart[1].length >= 1){
                        postStatus = "setDateTime"
                        event.reply(temp.datetimepicker)
                    }else{
                        event.reply([
                            {'type':'text', 'text':'購物車是空的 !'},
                            {'type':'text', 'text':'幹 ! 你科成為喔 ?'}]
                        ); 
                    }
                }
            }else if(msg1 == "A"){
                const messageObject = {
                    "type": "template",
                    "altText": "this is a buttons template",
                    "template": {
                        "type": "buttons",
                        "title": "時間日期",
                        "text": "Please select",
                        "actions": [
                            {
                              "type": "datetimepicker",
                              "label": "時間日期",
                              "mode": "datetime",
                              "data": "datetime"
                            }
                        ]
                    }
                };
                event.reply(messageObject);
            }
            if(status != "") {
                if (status == "進入修改電話程序") {
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
                }else if(status == "進入修改姓名程序") {
                    status = "";
                    member.UpdateName(msg, userId).then(data => {
                        if (data == -1) {
                            event.reply('找不到資料');
                        } else if (data == -9) {
                            event.reply('執行錯誤');
                        } else {
                            event.reply('姓名已修改完成');
                        }
                    })
                }else if(status == "arrCartQty") {

                    var isNum = /^[0-9]+$/;
                    var x = Boolean(!isNum.test(msg1)); 
                    var y = Boolean(parseInt(msg1) < 1); 
                    var z = Boolean(statusTime > 0); 
                    
                    console.log("x-> "+x)
                    console.log("y-> "+y)

                    if(x && z){
                        statusTime--;
                        if(statusTime==0){
                            status = ""
                            event.reply('請你閉嘴')
                        }else if(z){
                            event.reply([
                                {'type':'text', 'text':'輸入數字啦 ! 幹, 你科成為喔 ?'},
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
                                {'type':'text', 'text':'輸入大於0的數字啦 ! 幹, 你科成為喔 ?'},
                                {'type':'text', 'text':'你還剩'+statusTime+'機會'}]
                            );
                        }
                    }else if(z){
                        status = "";
                        var i = arrCart.length
                        console.log("i="+i)
                        var cstoreid = arrCart[0][1]
                        var cstoreName = arrCart[0][2]
                        var cfoodid = arrCartQty[0]
                        var cfoodName = arrCartQty[1]
                        var cfoodPrice = arrCartQty[2]
                        console.log(cstoreid+", "+cstoreName+", "+cfoodid+", "+cfoodName+", "+cfoodPrice)

                        for(var m = 0; m<i; m++){
                            console.log("i="+i+" ,m="+m)
                            if(arrCart[m][0]==cfoodid){
                                console.log("1->")
                                var oldQty = parseInt(arrCart[m][3]);
                                var newQty = (oldQty+parseInt(msg1)).toString();
                                arrCart[m][3]=newQty;
                                console.log("1 "+arrCart[m][0]+", "+arrCart[m][3])
                                break;
                            }else if (m==(i-1)){
                                console.log("2->")
                                var Qty=parseInt(msg1)+""
                                arrCart[i]=[cfoodid, cfoodName, cfoodPrice, Qty];
                                console.log("2 "+arrCart[i][0]+", "+arrCart[i][3])
                                break;
                            }
                        }
                        i = arrCart.length
                        console.log("i="+i)
                        arrCartQty.length="";
                        console.log(arrCart)

                        const template = temp.temp_cart;
                        template.contents.body.contents[0].text = userName+" 的購物車";
                        template.contents.body.contents[1].contents[0].text = arrCart[0][2];
                        var arr=[];
                        arr.push(template)
                        arr[0].contents.body.contents[4].contents.length=0
                        
                        var cartTotalPrice = 0;

                        for(var k = 1; k<i; k++){
                            cartTotalPrice += arrCart[k][2]*arrCart[k][3]
                            console.log("i="+i+" ,k="+k)

                            console.log(arrCart)
                            console.log(arrCart[k][0]+", "+arrCart[k][1])
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
                        }else{
                            template.contents.body.contents[6].contents[0].text = "取餐時間 : 未輸入";
                        }
                        
                        template.contents.body.contents[7].contents[0].text = "總價 : $"+cartTotalPrice;
                        template.contents.footer.contents[0].action.text="購物車,清空"
                        template.contents.footer.contents[1].action.text="店家,查看菜單,"+arrCart[0][1];
                        // template.contents.footer.contents[2].action.text="購物車,送出訂單"
                        console.log("total "+cartTotalPrice);
                        statusTime=0;
                        event.reply(arr);
                    }
                    
                }else if(status == "changeStore") {
                    status=""
                    if(msg4 == "是"){
                        arrCart.length = 0;
                    }else if(msg4 == "否"){
                        arrCartQty.length = 0;
                    }
                    console.log(arrCart)
                    console.log(arrCartQty)

                }
            }
        }
    );
});
bot.on('postback', function (event) {
    event.source.profile().then(
        function (profile) {
            
            let data = event.postback.data;
            // for(var i =0; i<20; i++){
                console.log(`${event.postback.params.date}`);
            // }
            if(data === "輸入取餐時間"){
                console.log("輸入取餐時間")
            }else if(data === "datetime" && postStatus == "setDateTime"){
                setDateTime="";
                data += `${JSON.stringify(event.postback.params)}`;                
                var NewArray = data.split("\"");
                var cdatetime = NewArray[3].split("T");
                var takedate = cdatetime[0];
                var taketime = cdatetime[1];
                console.log(takedate+", "+taketime)
                arrCart[0][3]=takedate
                arrCart[0][4]=taketime
                console.log(arrCart)
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
    console.log("正在監聽埠號:", port);
});