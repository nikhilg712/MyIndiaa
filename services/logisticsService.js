const nock = require('nock'); // Import the nock library for HTTP mocking

// Function to mock logistics provider API requests for creating shipments
const mockLogisticsProvider = () => {
    // Intercept POST requests to the logistics provider's API endpoint for creating shipments
    nock('https://api.logisticsprovider.com')
        .post('/v1/shipments') // Specify the endpoint to intercept
        .reply(200, { // Specify the mock response with status 200 (OK)
            id: 'mock_shipment_id', // Mock shipment ID in the response
            status: 'shipped', // Mock status indicating the shipment is shipped
            update_time: new Date().toISOString(), // Mock update time with the current timestamp
        });
};

module.exports = { mockLogisticsProvider }; // Export the mock function for use in tests
