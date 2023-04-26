import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';
import { logger } from '../../../components/Logger';

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
    logger.error(error);
    res.status(500).json({ error });
    return;
  }

  logger.info(`Success ${products}`);
  res.status(200).json({ products });
};

export default getProductsForCategory;
