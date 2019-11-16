
//引用操作資料庫的物件
const store_temp = require('../store_temp');
const store_order = require('../../route/store_order');
var linebot = require('linebot');
var bot = linebot({
  channelId: '1553827455',
  channelSecret: '633baa5dafd610ad5bb69a495df003a0',
  channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var noticeCus = function (event, storeid, orderid, lodash) {
    event.source.profile().then(function (profile) {
        store_order.fetchOrder(orderid).then(data => {
            if (data == -1) {
                event.reply('沒有紀錄');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                var cusid = data[0].userid
                bot.push(cusid, "可前往商店取餐了 !");
            }
        })
    });
}


//匯出
module.exports = { noticeCus };