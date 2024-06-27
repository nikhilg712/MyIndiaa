const nock = require('nock'); // Import the nock library for HTTP mocking

// Function to mock the payment gateway API
const mockPaymentGateway = () => {
    nock('https://api.paymentgateway.com') // Intercept calls to the payment gateway API
        .post('/v1/payments') // Intercept POST requests to the /v1/payments endpoint
        .reply(200, { // Respond with a 200 status code and a mock response body
            id: 'mock_payment_id', // Mock payment ID
            status: 'succeeded', // Mock payment status
            update_time: new Date().toISOString(), // Mock update time as the current time in ISO format
            email_address: 'test@example.com', // Mock email address
        });
};

module.exports = { mockPaymentGateway }; // Export the mockPaymentGateway function for use in other files
