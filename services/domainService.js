const nock = require('nock');

const mockDomainRegistration = () => {
    nock('https://api.domainprovider.com')
        .post('/v1/domains')
        .reply(200, {
            id: 'mock_domain_id',
            status: 'registered',
            update_time: new Date().toISOString(),
        });
};

module.exports = { mockDomainRegistration };
