const nock = require('nock'); // Import the nock library for HTTP mocking

// Function to mock domain registration API requests
const mockDomainRegistration = () => {
    // Intercept POST requests to the domain provider's API endpoint for domain registration
    nock('https://api.domainprovider.com')
        .post('/v1/domains') // Specify the endpoint to intercept
        .reply(200, { // Specify the mock response with status 200 (OK)
            id: 'mock_domain_id', // Mock domain ID in the response
            status: 'registered', // Mock status indicating successful registration
            update_time: new Date().toISOString(), // Mock update time with the current timestamp
        });
};

module.exports = { mockDomainRegistration }; // Export the mock function for use in tests
