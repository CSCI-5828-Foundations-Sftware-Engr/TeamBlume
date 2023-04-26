import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../utils/database.types';
import { logger } from '../../../components/Logger';

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { data: categories, error } = await supabaseServerClient
    .from('categories')
    .select();

  if (error) {
    logger.error(error);
    res.status(500).json({ error });
    return;
  }

  logger.info(`Success ${categories}`);
  res.status(200).json({ categories });
};

export default getCategories;
