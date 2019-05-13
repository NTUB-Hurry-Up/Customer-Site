'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


var fetchOrderMaster = async function(userid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('select * from "order" where userid = $1 ORDER BY "orderDate" desc, "orderTime" desc LIMIT 10', [userid])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;  //學生資料(物件)
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
var fetchOrderDetail = async function(orderid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT a.foodid, b."storeName", b."storeAdd",a."foodName", a."foodPrice", a.foodimg FROM food AS a , store AS b where a.storeid = b.storeid and foodid = $1', [foodid])
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
module.exports = {fetchOrderMaster, fetchOrderDetail};

