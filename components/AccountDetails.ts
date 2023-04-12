import { useState, useEffect } from 'react';

import {
    useUser,
    useSupabaseClient,
    Session
  } from '@supabase/auth-helpers-react';

import { Database } from '../utils/database.types';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function AccountDetails({session} : {session : Session}){
    const supabase = useSupabaseClient<Database>();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<Profiles['username']>(null);
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true);
        
                if (!user) throw new Error('No user');
        
                let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, avatar_url`)
                .eq('id', user.id)
                .single();
        
                if (error && status !== 406) {
                throw error;
                }

                if (data) {
                setUsername(data.username);
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

    
    return ({username, avatar_url});

}