import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../utils/database.types';
import { logger } from '../../../components/Logger';

const getPriceHistories = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { data: prices_histories, error } = await supabaseServerClient
    .from('prices_histories')
    .select('*');

  if (error) {
    logger.error(error);
    res.status(500).json({ error });
  }

  res.status(200).json({ prices_histories });
};

export default getPriceHistories;
