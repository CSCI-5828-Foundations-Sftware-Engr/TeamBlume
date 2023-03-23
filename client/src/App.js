import { Card, Tab, Tabs } from '@blueprintjs/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';
import { UserContext } from './context/UserContext';
import Loader from './Loader';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';

function App() {
  const [currentTab, setCurrentTab] = useState('login');
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/api/auth/refreshToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: window.localStorage.getItem('refreshToken'),
      }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem('refreshToken', data.refreshToken);
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === 'logout') {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <Card elevation="1">
      <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
        <Tab id="login" title="Login" panel={<Login />} />
        <Tab id="register" title="Register" panel={<Register />} />
        <Tabs.Expander />
      </Tabs>
    </Card>
  ) : userContext.token ? (
    <Welcome />
  ) : (
    <Loader />
  );
}

export default App;
