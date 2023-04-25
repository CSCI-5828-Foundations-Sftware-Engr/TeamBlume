import { createMocks, RequestMethod } from 'node-mocks-http';
import getProductsForCategory from '../../../pages/api/product/[cid]';

function mockRequestResponse(method: RequestMethod) {
  const { req, res } = createMocks({ method });
  req.query = { category_id: 1 };
  return { req, res };
}

test('fetch products for a category', async () => {
  const { req, res } = mockRequestResponse('GET');
  await getProductsForCategory(req, res);

  const { products } = res._getJSONData();

  // assert the response status
  expect(res.statusCode).toBe(200);

  // assert the response body
  expect(products).toEqual([
    {
      id: 1,
      category_id: 1,
      image_link: '',
      brand: `Peet's Coffee`,
      product_name: `Peet's Coffee Big Bang, Medium Roast Whole Bean Coffee, 10.5 oz Bag`,
      product_link: '',
      platform: 'walmart-grocery'
    }
  ]);
});
