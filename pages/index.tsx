import Head from 'next/head';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import { DropdownComponent } from '../components/DropdownComponent';

import { Button } from '@nextui-org/react';
import Router from 'next/router';

const Home = () => {
  const sessionVar = useSession();

  const [session, setSession] = useState(useSession());
  const supabase = useSupabaseClient();
  const [showAccount, setShowAccount] = useState(false);

  if (session != sessionVar) {
    setSession(sessionVar);
  }

  const menuItems = [
    { key: 'electronics', name: 'Electronics' },
    { key: 'groceries', name: 'Groceries' }
  ];

  function redirectToCompare(opVal: string) {
    Router.push({
      pathname: '/pacom/compare',
      query: { keyword: opVal }
    });
  }

  return (
    <div>
      <Head>
        <title>PACom</title>
        <meta name="description" content="Price comparison and aggregator" />
      </Head>
      {session ? <Header session={session} /> : <></>}
      <div className="global-container" id="global-container">
        <div
          className={session ? 'content-container' : 'container'}
          style={{ padding: '50px 0 100px 0' }}
        >
          {!session ? (
            <div className="row">
              <HomeContent logged={false} />
              <div className="col-6 auth-widget">
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="dark"
                />
              </div>
            </div>
          ) : (
            <div className="row">
              <HomeContent logged={true} />
              <div className="col-6 category-dropdown">
                <DropdownComponent
                  ddType={'category-dropdown'}
                  ddItems={menuItems}
                />
              </div>
              <div className="col-6 cat-button">
                <Button
                  onPress={() => {
                    redirectToCompare(
                      (
                        document.getElementById(
                          'category-dropdown-value'
                        ) as HTMLInputElement
                      ).value
                    );
                  }}
                >
                  Start comparing
                </Button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
