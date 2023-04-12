import { useState, useEffect } from 'react';
import {
  useUser,
  useSupabaseClient,
  Session,
  useSession
} from '@supabase/auth-helpers-react';
import Avatar from '../../components/Avatar';
import { useRouter } from "next/router";
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Database } from '../../utils/database.types';
import AccountDetails from '../../components/AccountDetails';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Account({ session }: { session: Session }) {
  const router = useRouter();

  if(!session){
    session = useSession();
  }

  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles['username']>(null);
  const [website, setWebsite] = useState<Profiles['website']>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

  
  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);

        if(!session){
          console.log('Error grabbing session')
          return router.push("/");
        }

        if (!user) throw new Error('No user');

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert('Error loading user data!');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session, user, supabase]);

  async function updateProfile({
    username,
    website,
    avatar_url
  }: {
    username: Profiles['username'];
    website: Profiles['website'];
    avatar_url: Profiles['avatar_url'];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString()
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Head>
      <title>PACom</title>
      <meta name="description" content="Price comparison and aggregator" />
    </Head>
    <Header session={session}/>
    {session ? (
    <div className="account-container">
    <div className="row">
    <div className="col-12">
    <div className="form-widget">
      <div className="avatar-container">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={url => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={e => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

    </div>
    </div>
    </div>
    </div>
    ) : 
    (<></>)}
    <Footer /></>
  );
}
