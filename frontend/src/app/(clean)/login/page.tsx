import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';

const Login = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-10'>
        CINEMA <span className='text-orange-400'>MNGMT</span>
      </h1>
      <LoginForm />
    </main>
  );
};

export default Login;
