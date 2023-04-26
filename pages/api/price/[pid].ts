import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';
import { logger } from '../../../components/Logger';

const getPricesForProductID = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { pid } = req.query;

  const { data: prices, error } = await supabaseServerClient
    .from('prices')
    .select()
    .eq('product_id', pid);

  if (error) {
    logger.error(error);
    res.status(500).json({ error });
    return;
  }

  logger.info(`Success ${prices}`);
  res.status(200).json({ prices });
};

export default getPricesForProductID;
