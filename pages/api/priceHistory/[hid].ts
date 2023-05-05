import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';
import { logger } from '../../../components/Logger';

const getPriceHistories = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });
  const { hid } = req.query;
  const { data: prices_trends, error } = await supabaseServerClient
    .from('prices_trends')
    .select()
    .eq('product_id', hid);

  if (error) {
    logger.error(error);
    res.status(500).json({ error });
    return;
  }
  logger.info(`Success ${prices_trends}`);
  res.status(200).json({ prices_trends });
};

export default getPriceHistories;
