const LinePay = require('line-pay-v3')

let linePay = new LinePay({
    channelId: '1653387178',
    channelSecret: 'dcc3464a9e35c3da7278413e7e19bf8e',
    uri: 'https://sandbox-api-pay.line.me'
})
var pay_LP = function (event) {
    event.source.profile().then(function (profile) {
        const LP_order = {
            amount: 10,
            currency: 'TWD',
            orderId: 'Order2019101500001',
            packages: [
                {
                    id: 'Item20191015001',
                    amount: 10,
                    name: 'testPackageName',
                    products: [
                        {
                            name: 'testProductName',
                            quantity: 1,
                            price: 10
                        }
                    ]
                }
            ],
            redirectUrls: {
                confirmUrl: 'https://example.com/confirmUrl',
                cancelUrl: 'https://example.com/cancelUrl'
            }
        }
        
        linePay.request(order).then(res => {
            console.log(res)
        })

    });
}

//匯出
module.exports = { pay_LP };
