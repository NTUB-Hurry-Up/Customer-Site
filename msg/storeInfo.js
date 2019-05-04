
//引用操作資料庫的物件
const temp = require('./../temp');

const store = require('./../store');
//------------------------------------------
// 新增會員資料
//------------------------------------------
var storeInfo = function(event){
    //存放結果
        event.source.profile().then(function (profile) {
            store.fetchStore().then(data => {
                if (data == -1) {
                    event.reply('找不到資料');
                } else if (data == -9) {
                    event.reply('執行錯誤');
                } else {
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
          });
        
    //新增會員資料
    
   

    //回傳執行結果
}


//匯出
module.exports = {storeInfo};


            