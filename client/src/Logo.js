import React from 'react';
import { Image } from 'antd';
import './Images/logo.png'

const Logo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginLeft: "20px", scale: '0.5' }}>
      <Image src={require('./Images/logo.png')} preview={false} />
    </div>
  );
};

export default Logo;
