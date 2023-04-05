import React from 'react';
import Logo from './Logo';
import LoginForm from "./Authorization/Sign in/loginForm";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'middle', marginLeft: '65px', alignItems: 'center', height: '100vh' }}>
      <Logo />
      <LoginForm onFinish={onFinish} />
    </div>
  );
};

export default LoginPage;
