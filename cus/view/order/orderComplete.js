
//引用操作資料庫的物件
var linebot = require('linebot');
var lodash = require('lodash');
const axios = require('axios');
const temp = require('./../../temp');
const store_temp = require('./../../../store/view/store_temp');
var bot = linebot({
  channelId: '1553827455',
  channelSecret: '633baa5dafd610ad5bb69a495df003a0',
  channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});

//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var orderComplete = function (event, oCart, cOrderid, cOrderDate, cOrderTime) {
  event.source.profile().then(function (profile) {
    console.log(oCart)
    var i = oCart.arrfood.length;
    var cartTotalPrice = 0;
    var arr = [];
    arr.push(lodash.cloneDeep(temp.orderComplete))
    arr[0].contents.body.contents[1].contents[1].text = oCart.storeName
    arr[0].contents.body.contents[2].contents[1].text = cOrderid
    arr[0].contents.body.contents[4].contents[1].text = cOrderDate
    arr[0].contents.body.contents[4].contents[2].text = cOrderTime
    arr[0].contents.body.contents[5].contents[1].text = oCart.takeDate
    arr[0].contents.body.contents[5].contents[2].text = oCart.takeTime
    arr[0].contents.footer.contents[1].contents[1].text = "地址 : " + oCart.storeAdd
    // arr[0].contents.footer.contents[2].action.text = "付款,LP,"+cOrderid

    var arr2 = []
    arr2.push(lodash.cloneDeep(store_temp.temp_acceptOrder))
    temp2 = lodash.cloneDeep(store_temp.temp_acceptOrder_repeat)
    temp2.body.contents[0].text = "新訂單 !"
    temp2.body.contents[0].color = '#7BC5FE'
    temp2.body.contents[1].contents[1].text = cOrderid
    temp2.body.contents[2].contents[1].text = cOrderDate
    temp2.body.contents[2].contents[2].text = cOrderTime
    temp2.body.contents[3].contents[1].text = oCart.takeDate
    temp2.body.contents[3].contents[2].text = oCart.takeTime
    temp2.body.contents[4].contents[1].text = oCart.userName
    temp2.body.contents[5].contents[1].text = oCart.userPhone
    temp2.footer.contents[1].action.label = "接單"
    temp2.footer.contents[1].action.text = "訂單,更新進度,接單," + cOrderid
    temp2.footer.contents[2].action.label = "拒絕"
    temp2.footer.contents[2].action.text = "訂單,更新進度,拒絕," + cOrderid

    var paybtn = {
      "type": "button",
      "action": {
        "type": "message",
        "label": "使用LINEPAY付款",
        "text": "付款,LP," + cOrderid
      },
      "color": "#58290C"
    }
    arr[0].contents.footer.contents[2] = paybtn
    for (var k = 0; k < i; k++) {
      var tempRe = lodash.cloneDeep(temp.orderCompleteRepeat)
      var tempRe2 = lodash.cloneDeep(store_temp.temp_acceptOrder_detail_repeat)
      var Afood = oCart.arrfood[k]
      var cfoodName = Afood.foodName;
      var cfoodPrice = Afood.foodPrice;
      var cfoodQty = Afood.foodQty;
      var foodAmt = cfoodPrice * cfoodQty;
      cartTotalPrice += foodAmt
      //把餐點加入模板
      tempRe.contents[0].contents[0].text = cfoodName
      tempRe.contents[1].contents[0].text = cfoodQty
      tempRe.contents[2].contents[0].text = cfoodPrice
      arr[0].contents.body.contents[6].contents[k + 2] = tempRe

      tempRe2.contents[0].text = cfoodName
      tempRe2.contents[1].text = cfoodQty
      tempRe2.contents[2].text = cfoodPrice
      temp2.body.contents.push(tempRe2)
      console.log("k = " + k);
    }
    arr[0].contents.footer.contents[1].contents[0].text = "總價 : $" + cartTotalPrice
    temp2.footer.contents[0].contents[1].text = "總價 : $" + cartTotalPrice
    arr2[0].contents.contents[0] = temp2
    event.reply(arr);
    bot.push(oCart.storeid, arr2[0]);
    // event.bot.push(oCart.storeid, "arr")

  });
}


//匯出
module.exports = { orderComplete };

