// Simple API test script
const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Smart Wallet Dashboard BFF API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test root endpoint
    console.log('2. Testing root endpoint...');
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint:', rootResponse.data);
    console.log('');

    // Test transactions endpoint (with a known address)
    console.log('3. Testing transactions endpoint...');
    const testAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Vitalik's address
    try {
      const txResponse = await axios.get(`${BASE_URL}/api/transactions`, {
        params: { address: testAddress, page: 1, limit: 5 }
      });
      console.log('✅ Transactions endpoint:', {
        success: txResponse.data.success,
        total: txResponse.data.data?.total,
        transactionsCount: txResponse.data.data?.transactions?.length
      });
    } catch (error) {
      console.log('❌ Transactions endpoint failed:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test tokens endpoint
    console.log('4. Testing tokens endpoint...');
    try {
      const tokensResponse = await axios.get(`${BASE_URL}/api/tokens`, {
        params: { address: testAddress }
      });
      console.log('✅ Tokens endpoint:', {
        success: tokensResponse.data.success,
        total: tokensResponse.data.data?.total,
        tokensCount: tokensResponse.data.data?.tokens?.length
      });
    } catch (error) {
      console.log('❌ Tokens endpoint failed:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test favorites endpoint
    console.log('5. Testing favorites endpoint...');
    try {
      const favoritesResponse = await axios.get(`${BASE_URL}/api/favorites`);
      console.log('✅ Favorites endpoint:', {
        success: favoritesResponse.data.success,
        count: favoritesResponse.data.data?.length
      });
    } catch (error) {
      console.log('❌ Favorites endpoint failed:', error.response?.data?.message || error.message);
    }
    console.log('');

    console.log('🎉 API testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running: npm run dev');
    }
  }
}

// Run the test
testAPI();
