import { createMocks, RequestMethod } from 'node-mocks-http';
import getPricesForProductID from '../../../pages/api/price/[pid]';
import { expect } from '@jest/globals';

function mockRequestResponse(method: RequestMethod) {
  const { req, res } = createMocks({ method });
  req.query = { product_id: 1 };
  return { req, res };
}

test('fetch products for a category', async () => {
  const { req, res } = mockRequestResponse('GET');
  await getPricesForProductID(req, res);

  const { prices } = res._getJSONData();

  // assert the response status
  expect(res.statusCode).toBe(200);

  // assert the response body
  expect(prices).toEqual([
    {
      id: 1,
      product_id: 1,
      product_link: '',
      rating: 1.0,
      num_reviews: 5,
      platform: 'walmart'
    },
    {
      id: 2,
      product_id: 1,
      product_link: '',
      rating: 3.0,
      num_reviews: 5,
      platform: 'bestbuy'
    }
  ]);
});