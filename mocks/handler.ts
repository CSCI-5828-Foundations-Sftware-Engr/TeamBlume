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

const pricesReturn = [
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
]

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
  }),
  rest.all(`${SUPABASE_URL}/rest/v1/prices`, async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(pricesReturn));
      default:
        return res(ctx.json('Unhandled method'));
    }
  })
];
