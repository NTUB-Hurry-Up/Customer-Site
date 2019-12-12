const store = require('../../route/store');
const temp = require('../../temp');
var goStore2pay = function (event, userId, orderid) {
    event.source.profile().then(function (profile) {
        store.orderidFetchStore_LP(orderid).then(data => {
            if (data == -1) {
                event.reply('沒有紀錄');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                if (userId == data[0].userid) {
                    if ((data[0].LP_transactionid != null) && (data[0].LP_transactionid != "")) {
                        event.reply(["此筆訂單已付款過了", "取餐時不需再付款"]);
                    }else{
                        event.reply('請在取餐時付款');
                    }
                } else {
                    event.reply('這不是你的訂單');
                }
            }
        })


    });
}

//匯出
module.exports = { goStore2pay };
