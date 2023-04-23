import { rest } from 'msw';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const categoriesReturn = [
  { id: 1, name: 'Groceries' },
  { id: 2, name: 'Personal Care' }
];

const productsReturn = [
  {
    id: 1,
    category_id: 1,
    image_link: '',
    brand: `Peet's Coffee`,
    product_name: `Peet's Coffee Big Bang, Medium Roast Whole Bean Coffee, 10.5 oz Bag`,
    product_link: '',
    platform: 'walmart-grocery'
  }
];

export const handlers = [
  rest.all(`${SUPABASE_URL}/rest/v1/categories`, async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(categoriesReturn));
      default:
        return res(ctx.json('Unhandled method'));
    }
  }),
  rest.all(`${SUPABASE_URL}/rest/v1/products`, async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(productsReturn));
      default:
        return res(ctx.json('Unhandled method'));
    }
  })
];
