import type { NextPage } from 'next';
import Head from 'next/head';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '../components/Account';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      <Head>
        <title>PACom</title>
        <meta name="description" content="Price comparison and aggregator" />
      </Head>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <div className="row">
            <div className="col-6">
              <h1 className="header">PACom</h1>
              <p className="">
                Welcome to Price comparison and aggregator service. Here you
                will find prices of different products from different sources
                and compare them to find the best price.
                <br />
                <br />
                Login or signup to get started.
              </p>
            </div>
            <div className="col-6 auth-widget">
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
              />
            </div>
          </div>
        ) : (
          <>
            <h3>Account</h3>
            <Account session={session} />
          </>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Home;
