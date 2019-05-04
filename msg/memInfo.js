'use strict';

//引用操作資料庫的物件
const temp = require('./../temp');
const member = require('./../member');

//------------------------------------------
// 新增會員資料
//------------------------------------------
var memInfo = function(id){
    //存放結果
    var result={
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "actions": [
                {
                "type": "message",
                "label": "修改姓名",
                "text": "會員,修改姓名"
                },
                {
                "type": "message",
                "label": "修改電話",
                "text": "會員,修改電話"
                }
            ],
            "title": "會員資訊",
            "text": "顆顆"
        }
    } 

    //新增會員資料
    member.fetchMember(id).then(data => {
        if (data == -1) {
            event.reply('找不到資料');
        } else if (data == -9) {
            event.reply('執行錯誤');
        } else {
            template.text="姓名 : " + data.name + "\n電話 : " + data.phone;
        }
    })
    return result; 

    //回傳執行結果
}


//匯出
module.exports = {memInfo};


            // const template = temp.temp1.template;
            // template.actions[0].type = "message";
            // template.actions[0].label = "修改姓名";
            // template.actions[0].text = "會員,修改姓名";

            // template.actions[1].type = "message";
            // template.actions[1].label = "修改電話";
            // template.actions[1].text = "會員,修改電話";
            // template.title = "會員資訊"
            // template.text = "姓名 : " + data.name + "\n電話 : " + data.phone