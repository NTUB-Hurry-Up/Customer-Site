
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
    "contents": [{
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
            "text": "storeName",
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
                    "text": "storeAdd",
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
                    "text": "storeTel",
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
              "type": "uri",
              "label": "CALL",
              "uri": "https://linecorp.com"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "WEBSITE",
              "uri": "https://linecorp.com"
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
    ]
  }
}

//匯出
module.exports = {temp1, temp_store};