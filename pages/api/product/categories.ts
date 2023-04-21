import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../utils/database.types';

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });

  const { data: categories, error } = await supabaseServerClient
    .from('categories')
    .select();

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ categories });
};

export default getCategories;
