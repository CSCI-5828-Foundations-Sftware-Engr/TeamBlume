import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';

const getProductForCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { pcid } = req.query;

  const { data: products, error } = await supabaseServerClient
    .from('products')
    .select()
    .eq('category_id', pcid?.toString()?.split('+')[0])
    .eq('id', pcid?.toString()?.split('+')[1]);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ products });
};

export default getProductForCategory;
