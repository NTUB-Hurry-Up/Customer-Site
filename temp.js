
var temp1=
{
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
        "type": "buttons",
        "actions": [
            {
            "type": "message",
            "label": "看到的字",
            "text": "傳出的字"
            },
            {
            "type": "message",
            "label": "看到的字",
            "text": "傳出的字"
            }
        ],
        "title": "標題",
        "text": "內文"
    }
}
var temp_store=
{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [
    ]
  }
}
var temp_cart={
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
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
          "text": "購物車",
          "size": "xl",
          "align": "start",
          "weight": "bold"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "阿屎巴辣",
              "size": "lg",
              "align": "start",
              "weight": "regular"
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "餐點名稱",
              "size": "md"
            },
            {
              "type": "text",
              "text": "份量",
              "size": "md",
              "align": "center"
            },
            {
              "type": "text",
              "text": "價格",
              "size": "md",
              "align": "end"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "取餐時間 : ",
              "size": "sm",
              "align": "start",
              "weight": "regular"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "總價 : $-3,400",
              "size": "xl",
              "align": "end",
              "color": "#000000"
            }
          ]
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
            "label": "清空購物車",
            "text": "清空購物車"
          },
          "color": "#58290C"
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "繼續點餐",
            "text": "繼續點餐"
          },
          "color": "#58290C"
        },
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "輸入取餐時間",
            "data": "輸入取餐時間"
          },
          "color": "#58290C"
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "完成訂單",
            "text": "購物車,送出訂單"
          },
          "color": "#58290C"
        }
      ]
    }
  }
}

datetimepicker = {
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
      "type": "buttons",
      "title": "購物車訊息",
      "text": "請輸入取餐時間",
      "actions": [
          {
            "type": "datetimepicker",
            "label": "設定時間日期",
            "mode": "datetime",
            "data": "datetime"
          }
      ]
  }
};
// var temp_store_contents={
//   "type": "bubble",
//   "hero": {
//   "type": "image",
//   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
//   "size": "full",
//   "aspectRatio": "20:13",
//   "aspectMode": "cover",
//   "action": {
//       "type": "uri",
//       "label": "Line",
//       "uri": "https://linecorp.com/"
//   }
//   },
//   "body": {
//   "type": "box",
//   "layout": "vertical",
//   "contents": [
//       {
//       "type": "text",
//       "text": "Brown Cafe",
//       "size": "xl",
//       "weight": "bold"
//       },
//       {
//       "type": "box",
//       "layout": "vertical",
//       "spacing": "sm",
//       "margin": "lg",
//       "contents": [
//           {
//           "type": "box",
//           "layout": "baseline",
//           "spacing": "sm",
//           "contents": [
//               {
//               "type": "text",
//               "text": "Place",
//               "flex": 1,
//               "size": "sm",
//               "color": "#AAAAAA"
//               },
//               {
//               "type": "text",
//               "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
//               "flex": 5,
//               "size": "sm",
//               "color": "#666666",
//               "wrap": true
//               }
//           ]
//           },
//           {
//           "type": "box",
//           "layout": "baseline",
//           "spacing": "sm",
//           "contents": [
//               {
//               "type": "text",
//               "text": "Time",
//               "flex": 1,
//               "size": "sm",
//               "color": "#AAAAAA"
//               },
//               {
//               "type": "text",
//               "text": "10:00 - 23:00",
//               "flex": 5,
//               "size": "sm",
//               "color": "#666666",
//               "wrap": true
//               }
//           ]
//           }
//       ]
//       }
//   ]
//   },
//   "footer": {
//   "type": "box",
//   "layout": "vertical",
//   "flex": 0,
//   "spacing": "sm",
//   "contents": [
//       {
//       "type": "button",
//       "action": {
//           "type": "uri",
//           "label": "CALL",
//           "uri": "https://linecorp.com"
//       },
//       "height": "sm",
//       "style": "link"
//       },
//       {
//       "type": "button",
//       "action": {
//           "type": "uri",
//           "label": "WEBSITE",
//           "uri": "https://linecorp.com"
//       },
//       "height": "sm",
//       "style": "link"
//       },
//       {
//       "type": "spacer",
//       "size": "sm"
//       }
//   ]
//   }
// };
var temp_menu={
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "carousel",
      "contents": [
        
      ]
    }
  }
//匯出
module.exports = {temp1, temp_store, temp_menu, temp_cart, datetimepicker};