import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from '../../../utils/database.types';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res
  });
  const {
    data: { user }
  } = await supabaseServerClient.auth.getUser();

  res.status(200).json({ user });
};

export default getUser;
