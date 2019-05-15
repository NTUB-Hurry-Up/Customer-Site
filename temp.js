
var temp1 =
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
var temp_store =
{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [
    ]
  }
}
var temp_cart = {
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
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "food.foodName",
                  "flex": 0,
                  "margin": "sm",
                  "size": "md",
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": "567",
                  "size": "xs",
                  "align": "center",
                  "color": "#AAAAAA",
                  "wrap": true
                },
                {
                  "type": "text",
                  "text": "$ 123",
                  "size": "sm",
                  "align": "end",
                  "color": "#000000"
                }
              ]
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
            "type": "datetimepicker",
            "label": "設定取餐時間",
            "mode": "datetime",
            "data": "datetime",
            "max": "2019-05-07T23:59",
            "min": "2019-04-29T00:00"
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
        "data": "datetime",
        "max": "2020-01-24t23:59",
        "min": "2019-04-29t14:33"
      }
    ]
  }
};
var orderComplete = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "contents": [
        {
          "type": "text",
          "text": "您已完成下訂",
          "size": "xl",
          "align": "center",
          "weight": "bold"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "店家 : ",
              "size": "md",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "青島早餐店",
              "size": "md",
              "align": "start"
            },
            {
              "type": "filler"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "編號 :",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "AXXXXXXX",
              "size": "sm",
              "align": "start"
            },
            {
              "type": "filler"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "訂單狀況 :",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "未接單"
            },
            {
              "type": "filler"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "取餐日期 :",
              "margin": "none",
              "align": "start",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "2019/12/31",
              "size": "sm",
              "align": "center"
            },
            {
              "type": "text",
              "text": "12:59",
              "margin": "sm",
              "size": "sm"
            }
          ]
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "取餐日期 :",
              "margin": "none",
              "align": "start",
              "weight": "bold"
            },
            {
              "type": "text",
              "text": "2019/12/31",
              "size": "sm",
              "align": "center"
            },
            {
              "type": "text",
              "text": "12:59",
              "margin": "sm",
              "size": "sm"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "separator"
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "餐點名稱",
                  "align": "start"
                },
                {
                  "type": "text",
                  "text": "份量",
                  "align": "center"
                },
                {
                  "type": "text",
                  "text": "單價",
                  "align": "end"
                }
              ]
            }//
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "總價:",
              "size": "xl",
              "align": "end"
            },
            {
              "type": "text",
              "text": "地址 : 不告訴你"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "備註 :"
                }
              ]
            }
          ]
        },
        {
          "type": "text",
          "text": "顆顆顆顆顆",
          "size": "xs",
          "align": "start",
          "color": "#CCCCCC",
          "wrap": true
        }
      ]
    }
  }
}
var orderCompleteRepeat = {
  "type": "box",
  "layout": "horizontal",
  "spacing": "xxl",
  "contents": [
    {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "阿屎芭樂",
          "flex": 0,
          "size": "md",
          "align": "start",
          "weight": "bold",
          "wrap": true
        }
      ]
    },
    {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "999",
          "size": "md",
          "align": "center",
          "color": "#AAAAAA"
        }
      ]
    },
    {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "$100",
          "margin": "xxl",
          "size": "sm",
          "align": "end",
          "color": "#AAAAAA",
          "wrap": false
        }
      ]
    }
  ]
}
// {
//   "type": "button",
//   "action": {
//     "type": "postback",
//     "label": "輸入取餐時間",
//     "data": "輸入取餐時間"
//   },
//   "color": "#58290C"
// }


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
var temp_menu = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [

    ]
  }
}
var fetchOrder = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": []
  }
}
//匯出
module.exports = { temp1, temp_store, temp_menu, temp_cart, datetimepicker, orderComplete, orderCompleteRepeat, fetchOrder};