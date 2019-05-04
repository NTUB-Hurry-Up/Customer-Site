
//引用操作資料庫的物件
const temp = require('./../../temp');
const store = require('./../../store');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------

var foodInfo = function(event,storeid){
    event.source.profile().then(function (profile) {
        store.fetchStorefood(storeid).then(data => {
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
    });
}
//匯出
module.exports = {foodInfo};


            