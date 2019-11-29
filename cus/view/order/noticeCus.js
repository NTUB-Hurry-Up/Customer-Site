
//引用操作資料庫的物件
var lodash = require('lodash');
const temp = require('../../temp');
const store_order = require('../../../store/route/store_order');
var linebot = require('linebot');
var bot = linebot({
    channelId: '1553827455',
    channelSecret: '633baa5dafd610ad5bb69a495df003a0',
    channelAccessToken: 'gU+RO41W5nTJOrZrepX2AsvPOO9Qp+oC7eX3pYrcBaSIeD4+kYh30iN375Rh+6hJB5Bk5hotterHhDSF2GNzHC4poNA0i55YXayxMMnsmePMhKqsujJsgOnc+XR5HoAihNYaGwK54qRxD28M2ULx3gdB04t89/1O/w1cDnyilFU='
});
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var noticeCus = function (orderid) {

    store_order.fetchOrder(orderid).then(data => {
        if (data == -1) {
            event.reply('沒有紀錄');
        } else if (data == -9) {
            event.reply('執行錯誤');
        } else {
            //a.orderid, c.storeid, c.userid, e."name", e.phone, c."orderDate", c."orderTime", c."takeDate", c."takeTime", c.status, b."foodName", a.quantity, a."unitPrice"

            var i = data.length;
            var cartTotalPrice = 0;
            var arr = [];
            arr.push(lodash.cloneDeep(temp.orderComplete))
            arr[0].contents.body.contents[0].text = data[0].status
            arr[0].contents.body.contents[0].color = '#7BC5FE'
            arr[0].contents.body.contents[0].size = 'xxl'
            arr[0].contents.body.contents[1].contents[1].text = data[0].storeName
            arr[0].contents.body.contents[2].contents[1].text = data[0].orderid
            arr[0].contents.body.contents[3].contents[1].text = data[0].status

            //datetime-formate---start--
            var orderMonth = ((data[0].orderDate).getMonth() + 1 < 10 ? '0' : '') + ((data[0].orderDate).getMonth() + 1)
            var orderDate = ((data[0].orderDate).getDate() < 10 ? '0' : '') + (data[0].orderDate).getDate()
            arr[0].contents.body.contents[4].contents[1].text = (data[0].orderDate).getFullYear() + "-" + orderMonth + "-" + orderDate
            arr[0].contents.body.contents[4].contents[2].text = data[0].orderTime.substring(0, 5)

            var takeMonth = ((data[0].takeDate).getMonth() + 1 < 10 ? '0' : '') + ((data[0].takeDate).getMonth() + 1)
            var takeDate = ((data[0].takeDate).getDate() < 10 ? '0' : '') + (data[0].takeDate).getDate()
            arr[0].contents.body.contents[5].contents[1].text = (data[0].takeDate).getFullYear() + "-" + takeMonth + "-" + takeDate
            arr[0].contents.body.contents[5].contents[2].text = data[0].takeTime.substring(0, 5)
            //datetime-formate---end----
            arr[0].contents.footer.contents[1].contents[1].text = "地址 : " + data[0].storeAdd
            for (var k = 0; k < i; k++) {
                var tempRe = lodash.cloneDeep(temp.orderCompleteRepeat)
                var foodAmt = data[k].quantity * data[k].unitPrice;
                cartTotalPrice += foodAmt
                //把餐點加入模板
                tempRe.contents[0].contents[0].text = data[k].foodName
                tempRe.contents[1].contents[0].text = data[k].quantity
                tempRe.contents[2].contents[0].text = data[k].unitPrice
                arr[0].contents.body.contents[6].contents[k + 2] = tempRe
                console.log("k = " + k);
            }
            arr[0].contents.footer.contents[1].contents[0].text = "總價 : $" + cartTotalPrice

            //cus
            var cusid = data[0].userid
            bot.push(cusid, ["可前往商店取餐了 !", arr[0], { type: 'sticker', packageId: '11537', stickerId: '52002745' }]);
            console.log(cusid + " 可前往商店取餐了 !")

        }
    })
}


//匯出
module.exports = { noticeCus };