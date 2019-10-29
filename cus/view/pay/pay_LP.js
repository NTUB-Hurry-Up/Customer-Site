const LinePay = require('line-pay-v3')
const uuid = require('uuid4')
const crypto = require('crypto-js')
const axios = require('axios')
console.log(uuid())
let linePay = new LinePay({
    channelId: '1653387178',
    channelSecret: 'dcc3464a9e35c3da7278413e7e19bf8e',
    uri: 'https://sandbox-api-pay.line.me'
})
var pay_LP = function (event) {
    event.source.profile().then(function (profile) {

        // let order = {
        //     amount: 100,
        //     currency: 'TWD',
        //     orderId: '1234564561231245',
        //     packages: [
        //         {
        //             id: 'Item20191015001',
        //             amount: 100,
        //             name: 'testPackageName',
        //             products: [
        //                 {
        //                     name: 'testProductName',
        //                     quantity: 1,
        //                     price: 100
        //                 }
        //             ]
        //         }
        //     ],
        //     redirectUrls: {
        //         confirmUrl: 'https://6ddcf789.ngrok.io/confitmUrl',
        //         cancelUrl: 'https://6ddcf789.ngrok.io/cancelUrl'
        //     }
        // }
        // linePay.request(order).then(res => {
        //     console.log("res-->")
        //     console.log(res)
        //     event.reply([res.info.paymentUrl.web, res.info.paymentUrl.app,res.info.transactionId])
        // })
        linePay.confrim({ amount: 100, currency: 'TWD' }, '2019103000071425').then(res => {
            console.log("res2-->")
            console.log(res)
        })

        // let key = 'dcc3464a9e35c3da7278413e7e19bf8e'
        // let nonce = uuid()
        // let requestUri = '/v3/payments/request'

        // let encrypt = crypto.HmacSHA256(key + requestUri + JSON.stringify(order) + nonce, key)
        // let hmacBase64 = crypto.enc.Base64.stringify(encrypt)
        // let configs = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-LINE-ChannelId': '1653387178',
        //         'X-LINE-Authorization-Nonce': nonce,
        //         'X-LINE-Authorization': hmacBase64
        //     }
        // }
        // axios.post('https://sandbox-api-pay.line.me/v3/payments/request',order,configs).then(res => {
        //     console.log(res.data)
        // })

    });
}

//匯出
module.exports = { pay_LP };
