import { Button, Callout, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [userContext, setUserContext] = useContext(UserContext);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const genericErrorMessage = 'Something went wrong! Please try again later.';

    fetch(window.location.origin + '/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        username: username,
      }),
    }).then(async (response) => {
      setIsSubmitting(false);
      if (!response.ok) {
        if (response.status === 400) {
          setError('Please fill all the fields correctly!');
        } else if (response.status === 401) {
          setError('Invalid email and password combination.');
        } else if (response.status === 500) {
          console.log(response);
          const data = await response.json();
          if (data.message) setError(data.message || genericErrorMessage);
        } else {
          setError(genericErrorMessage);
        }
      } else {
        const data = await response.json();
        // Move this to cookie later.
        window.localStorage.setItem('refreshToken', data.refreshToken);
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      }
    });
  };

  return (
    <>
      {error && <Callout intent="danger">{error}</Callout>}

      <form onSubmit={formHandlerSubmit} className="auth-form">
        <FormGroup label="First Name" labelFor="firstName">
          <InputGroup
            id="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Last Name" labelFor="firstName">
          <InputGroup
            id="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? 'Registering' : 'Register'}`}
          fill
          type="submit"
        />
      </form>
    </>
  );
};

export default Register;
