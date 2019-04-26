'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


var Cartfetchfood = async function(id){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT * from food where foodid = $1', [foodid])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];  //學生資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}
//匯出
module.exports = {Cartfetchfood};

