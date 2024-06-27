const nock = require('nock');

const mockLogisticsProvider = () => {
    nock('https://api.logisticsprovider.com')
        .post('/v1/shipments')
        .reply(200, {
            id: 'mock_shipment_id',
            status: 'shipped',
            update_time: new Date().toISOString(),
        });
};

module.exports = { mockLogisticsProvider };
