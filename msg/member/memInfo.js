
//引用操作資料庫的物件
const temp = require('./../../temp');
const member = require('./../../member');
const obj2null = require('./../../obj2null');
//------------------------------------------
// 新增會員資料
//------------------------------------------
var memInfo = function (event, lodash) {
    //存放結果
    event.source.profile().then(function (profile) {
        member.fetchMember(profile.userId).then(data => {
            if (data == -1) {
                console.log("找不到資料")
            } else if (data == -9) {
                console.log("執行錯誤")
            } else {
                // const template = temp.temp1.template;
                var arr = []
                arr.push(lodash.cloneDeep(temp.temp_memInfo))
                arr[0].template.text = "姓名 : " + data.name + "\n電話 : " + data.phone
                event.reply(arr[0]);
            }
        })
    });
}
var fetchMemInfo = function (userid, oCart) {//--
    //存放結果
    member.fetchMember(userid).then(data => {
        if (data == -1) {
            console.log("找不到資料")
        } else if (data == -9) {
            console.log("執行錯誤")
        } else {
            oCart.userName = data.name
            oCart.userPhone = data.phone
        }
    })
}
var changeMemInfo = function (event, oPsnl, s, newinfo) {
    obj2null.status(oPsnl)
    if (s == "修改姓名") {
        member.UpdateName(newinfo, oPsnl.userid).then(data => {
            if (data == -1) {
                event.reply('找不到資料');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                oPsnl.Cart.userName = newinfo
                event.reply('姓名已修改完成');
            }
        })
    } else if (s == "修改電話") {
        member.UpdatePhone(newinfo, oPsnl.userid).then(data => {
            if (data == -1) {
                event.reply('找不到資料');
            } else if (data == -9) {
                event.reply('執行錯誤');
            } else {
                oPsnl.Cart.userPhone = newinfo
                event.reply('電話已修改完成');
            }
        })
    }


}

//匯出
module.exports = { memInfo, fetchMemName, changeMemInfo, fetchMemInfo };


