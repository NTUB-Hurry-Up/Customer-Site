
//引用操作資料庫的物件
const temp = require('./../../temp');
const member = require('./../../member');
//------------------------------------------
// 新增會員資料
//------------------------------------------
var memInfo = function(event, lodash){
    //存放結果
    event.source.profile().then(function (profile) {
        member.fetchMember(profile.userId).then(data => {
            if (data == -1) {
                console.log("找不到資料")
            } else if (data == -9) {
                console.log("執行錯誤")
            } else {
                // const template = temp.temp1.template;
                var arr=[]
                arr[0].template.text = "姓名 : " + data.name + "\n電話 : " + data.phone
                event.reply( arr[0]);
            }
        })
    });
}
var fetchMemName = function(userid, oCart){
    //存放結果
    member.fetchMember(userid).then(data => {
        if (data == -1) {
            console.log("找不到資料")
        } else if (data == -9) {
            console.log("執行錯誤")
        } else {
            oCart.userName = data.name
        }
    })
}

//匯出
module.exports = {memInfo, fetchMemName};


            