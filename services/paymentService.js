const nock = require('nock');

const mockPaymentGateway = () => {
    nock('https://api.paymentgateway.com')
        .post('/v1/payments')
        .reply(200, {
            id: 'mock_payment_id',
            status: 'succeeded',
            update_time: new Date().toISOString(),
            email_address: 'test@example.com',
        });
};

module.exports = { mockPaymentGateway };
