'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


var Cartfetchfood = async function(foodid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT a.foodid, b."storeName",a."foodName", a."foodPrice", a.foodimg FROM food AS a , store AS b where a.storeid = b.storeid and foodid = $1', [foodid])
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
//---------------------------------------------------------
var addOrder = async function(storeid, userid, orderDate, orderTime){
    //存放結果
    let result;  

    //新增會員資料
    await query('INSERT INTO "order"("storeid", "userid", "orderDate", "orderTime", "status") VALUES ($1, $2, $3, $4, $5)', [storeid, userid, orderDate, orderTime, "未接單"])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}

//匯出
module.exports = {Cartfetchfood, addOrder};

