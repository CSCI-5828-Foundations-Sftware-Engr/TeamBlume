import React from "react";

import Head from 'next/head';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';
import { DropdownComponent } from '../components/DropdownComponent';
import {TilesComponent} from '../components/TilesComponent';
import { Button } from '@nextui-org/react';
import Router from 'next/router';

const Home = () => {
  const sessionVar = useSession();

  type dataObj = {
    id?: number;
    name?: string;
    inserted_at?: string;
    updated_at?: string;
  };

  type ddItemObj = {
    key?: string;
    name?: string;
  };

  const [session, setSession] = useState(useSession());
  const supabase = useSupabaseClient();

  const[menuItems, setMenuItems] = useState<ddItemObj[]>([{key: 'select an option', name: 'select an option'}]);
  const [data, setData] = useState(null);

  if (session != sessionVar) {
    setSession(sessionVar);
  }

  useEffect(() => {
    fetch('/api/product/categories')
      .then(response => response.json())
      .then(json =>
        {
            setData(json);
            populateCategories(json.categories);
        })
      .catch(error => console.error(error));
  }, []);

  function populateCategories(data:dataObj[]) {
    if (data) {
      let catItems : ddItemObj[] = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        catItems.push({ key: data[i].id?.toString(), name: data[i].name });
      }
      setMenuItems(catItems);
    }
  }

  function redirectToCompare(){
  const opVal = (document.getElementById('category-dropdown-value') as HTMLInputElement).value;

    Router.push({
      pathname: '/pacom/compare',
      query: { catId: opVal }
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
            <HomeContent logged={true}/>
            <div className="col-6 category-dropdown">
              <DropdownComponent ddType={'category-dropdown'} ddItems={menuItems}/>
              </div>
            <div className="col-6 cat-button">
              {/* <TilesComponent ddType={'category-dropdown'} ddItems={menuItems}/> */}
              <Button onPress={redirectToCompare}>Start comparing</Button>
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
