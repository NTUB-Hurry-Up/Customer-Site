
//引用操作資料庫的物件
const temp = require('./../../temp');
//------------------------------------------
// 查詢所有的店家
//------------------------------------------
var Cart = function(event, oCart, userName){
    event.source.profile().then(function (profile) {
        // var i = oCart.arrfood.length;
        var cstoreid = oCart.storeid;
        var cstoreName = oCart.storeName;

        const template = temp.temp_cart;
        template.contents.body.contents[0].text = userName+" 的購物車";
        template.contents.body.contents[1].contents[0].text = cstoreName;
        var arr=[];
        arr.push(template)
        // arr[0].contents.body.contents[4].contents.length=0
        
        var cartTotalPrice = 0;
        console.log("CARTCART-->"+oCart.arrfood)
        for(var k = 1; k<i; k++){
            var Afood=oCart.arrfood[k]
            cartTotalPrice += Afood.foodPrice*Afood.foodQty
            console.log("cartTotalPrice, "+cartTotalPrice)
            //console.log("i="+i+" ,k="+k)

            //console.log(arrCart)
            // arr[0].contents.body.contents[4].contents.push(
            //     {
            //         "type": "box",
            //         "layout": "baseline",
            //         "contents": [
            //         {
            //             "type": "text",
            //             "text": Afood.foodName,
            //             "flex": 0,
            //             "margin": "sm",
            //             "size": "md",
            //             "weight": "bold"
            //         },
            //         {
            //             "type": "text",
            //             "text": Afood.foodQty,
            //             "size": "xs",
            //             "align": "center",
            //             "color": "#AAAAAA",
            //             "wrap": true
            //         },
            //         {
            //             "type": "text",
            //             "text": "$ "+Afood.foodPrice*Afood.foodQty,
            //             "size": "sm",
            //             "align": "end",
            //             "color": "#000000"
            //         }
            //         ]
            //     }
            // );
        }
        if(oCart.takeDate.length != 0){

            template.contents.body.contents[6].contents[0].text = "取餐時間 : "+oCart.takeDate+" "+oCart.takeTime;
            template.contents.footer.contents[2].action.label = "修改取餐時間"
            
        }else{
            template.contents.body.contents[6].contents[0].text = "取餐時間 : 未輸入";
            template.contents.footer.contents[2].action.label = "輸入取餐時間"
        }
        // //console.log(temp.temp_cart.contents.footer.contents[2].action[0])

        // var today=new Date();
        // Date.prototype.addDays = function(days) {
        //     this.setDate(this.getDate() + days);
        //     return this;
        // }
        // //--date-time-formate---start------
        // var cHours = '';
        // if(today.getHours()+8 >= 24){
        //     cHours = (today.getHours()+8-24 < 10 ? '0' : '')+(today.getHours()+8-24);
        //     today.addDays(1);
        // }else{
        //     cHours = (today.getHours()+8 < 10 ? '0' : '')+(today.getHours()+8);
        // }
        // var cMINMonth=(today.getMonth()+1<10 ? '0' : '')+(today.getMonth()+1)
        // var cMAXMonth=(today.getMonth()+3<10 ? '0' : '')+(today.getMonth()+3)
        // var cDay=(today.getDate()<10 ? '0' : '')+today.getDate();
        // var cMinutes = (today.getMinutes()<10 ? '0' : '')+today.getMinutes();
        // //--date-time-formate---end--------
        // var cOrderMIN =today.getFullYear()+"-"+cMINMonth+"-"+cDay+"T"+cHours+':'+cMinutes;
        // var cOrderMAX =today.getFullYear()+"-"+cMAXMonth+"-"+cDay+"T"+cHours+':'+cMinutes;
        // // var cOrderTime =cHours+':'+cMinutes;

        // //console.log(cOrderMIN);
        // //console.log(cOrderMAX);
        // cOrderMIN.toString();
        // template.contents.footer.contents[2].action.min = cOrderMIN
        // template.contents.footer.contents[2].action.max = cOrderMAX

        template.contents.body.contents[7].contents[0].text = "總價 : $"+cartTotalPrice;
        template.contents.footer.contents[0].action.text="購物車,清空"//清空購物車
        template.contents.footer.contents[1].action.text="店家,查看菜單,"+oCart.storeid;//繼續點餐
        
        //console.log("total "+cartTotalPrice);
        event.reply(arr);
    });
}


//匯出
module.exports = {Cart};

