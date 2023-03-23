import React, { useState } from 'react';

const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  const [state, setState] = useState(initialState);

  /* eslint-disable react/prop-types */
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
