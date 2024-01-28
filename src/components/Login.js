

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import Cookies from 'js-cookie';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password can not be empty.');
      return;
    }
    loginApiCall()

  };
    const loginApiCall = ()=>{
    
    const data = JSON.stringify({
        "username": username,
        "password": password
    });
    const config = {
        method: 'post',
        url: 'https://fakestoreapi.com/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    // uncomment this..
    axios(config)
        .then(function (response) {
            console.log(response)
            Cookies.set('cartUserDetails',JSON.stringify({userId:2}))
            window.location.href = '/products'
        })
        .catch(function (error) {
            console.log(error);
            setError('Login Failed! Check username and Password.')
        });
    }
    const handleText = (e,type)=>{
        console.log(e,type)
        const value = e.target.value
        console.log(value)
        setError('');
        if(type === 'username'){
            setUsername(value)
        } else {
            setPassword(value)
        }
        
    }

  return (
    <StyledPaper>
      { ((!username || !password) || error ) && <span style={{color:"red"}}>{error}</span>}
      <LoginForm>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => handleText(e,"username")} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => handleText(e,"password")} />

        <StyledButton onClick={handleLogin}>Login</StyledButton>
      </LoginForm>
    </StyledPaper>
  );
};

const StyledPaper = styled.div`
  max-width: 400px;
  height:250px;
  margin: 100px auto 0; /* Added top margin of 20px */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const LoginForm = styled.form`
  display: flex;
  padding:30px;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    margin-bottom: 10px;
  }
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default LoginPage;
