import React from 'react';

import Head from 'next/head';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import { CardComponent } from '../components/CardComponent';

import { Grid } from '@nextui-org/react';
import Router from 'next/router';
import { Loading } from '@nextui-org/react';

const Home = () => {
  const sessionVar = useSession();

  type dataObj = {
    id?: number;
    name?: string;
  };

  type ddItemObj = {
    key?: string;
    name?: string;
  };

  const [session, setSession] = useState(useSession());
  const supabase = useSupabaseClient();

  const [categories, setCategories] = useState<dataObj[]>([]);

  if (session != sessionVar) {
    setSession(sessionVar);
  }

  const catItems : dataObj[] = React.useMemo(() => [], [] )

  useEffect(() => {
    fetch('/api/product/categories').then(response => response.json()).then(json => {
      if (catItems.length==0 && json.categories) {
        for (let i = 0; i < json.categories.length; i++) {
          catItems.push({ id: json.categories[i].id, name: json.categories[i].name });
          }
          setCategories(catItems);
        }
      })
      .catch(error => console.error(error));
  }, [catItems]);

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
                <div className="col-12 category-cards">
                  <div className="card-selector" id="card-selector">
                    <div className="category-grid">
                      <Grid.Container gap={2}>
                        {
                          (categories.length > 0 ? <> {
                            categories.map((item, index) => (
                              <>
                              <CardComponent
                                key={index}
                                index={index || 0}
                                id={item.id || 0}
                                name={item.name || ""}
                              />
                              </>
                            ))
                          } </> : <>
                            <div className="flex flex-center">
                              <Loading />
                            </div>
                          </>)
                        } </Grid.Container>
                  </div>
                </div>
              </div>
            </div>
          )}{' '}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
