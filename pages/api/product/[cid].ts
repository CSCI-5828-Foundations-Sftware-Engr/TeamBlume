import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';

const getProductsForCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { cid } = req.query;

  const { data: products, error } = await supabaseServerClient
    .from('products')
    .select()
    .eq('category_id', cid);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ products });
};

export default getProductsForCategory;
