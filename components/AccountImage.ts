import { useState } from 'react';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Database } from '../utils/database.types';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function AccountImage({ avatar_url }: { avatar_url: string }) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarImg] = useState<Profiles['avatar_url']>(null);

  async function downloadImage(path: string) {
    if (!avatarUrl && avatar_url != null) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarImg(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }

      return avatarUrl;
    }
  }

  downloadImage(avatar_url);

  return avatarUrl;
}
