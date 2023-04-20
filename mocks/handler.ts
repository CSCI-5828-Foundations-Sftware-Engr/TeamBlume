import { rest } from 'msw';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const categoriesReturn = [
  { id: 1, name: 'Groceries' },
  { id: 2, name: 'Personal Care' }
];

export const handlers = [
  rest.all(`${SUPABASE_URL}/rest/v1/categories`, async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(categoriesReturn));
      default:
        return res(ctx.json('Unhandled method'));
    }
  })
];
