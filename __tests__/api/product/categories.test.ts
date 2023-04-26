import getCategories from '../../../pages/api/product/categories';
import { createMocks, RequestMethod } from 'node-mocks-http';
import { expect } from '@jest/globals';

function mockRequestResponse(method: RequestMethod) {
  const { req, res } = createMocks({ method });
  return { req, res };
}

test('fetch categories', async () => {
  const { req, res } = mockRequestResponse('GET');
  await getCategories(req, res);

  // parse the response body
  const { categories } = res._getJSONData();

  // assert the response status
  expect(res.statusCode).toBe(200);

  // assert the response body
  expect(categories).toEqual([
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Personal Care' }
  ]);
});
