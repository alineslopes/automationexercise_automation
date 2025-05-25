const path = require('path');
const { Pact, Matchers } = require('@pact-foundation/pact');
const axios = require('axios');

const { like } = Matchers;

const provider = new Pact({
  consumer: 'FrontendApp',
  provider: 'OrderAPI',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
});

describe('Pact with OrderAPI', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('GET /orders/123', () => {
    beforeEach(() => {
      return provider.addInteraction({
        state: 'Order 123 exists',
        uponReceiving: 'a request for order 123',
        withRequest: {
          method: 'GET',
          path: '/orders/123',
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            id: 123,
            status: like('CONFIRMED'),
          },
        },
      });
    });

    it('returns the correct order', async () => {
      const response = await axios.get('http://localhost:1234/orders/123');
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('status', 'CONFIRMED');
    });
  });
});