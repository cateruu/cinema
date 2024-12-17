import React from 'react';
import LoginForm from '../_components/LoginForm/LoginForm';

const Login = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-10'>
        CINAME <span className='text-orange-400'>MNGMT</span>
      </h1>
      <LoginForm />
    </main>
  );
};

export default Login;
