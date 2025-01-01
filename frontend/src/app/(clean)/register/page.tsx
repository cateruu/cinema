import RegisterForm from '@/components/RegisterForm/RegisterForm';
import React from 'react';

const Register = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-10'>
        CINEMA <span className='text-orange-400'>MNGMT</span>
      </h1>
      <RegisterForm />
    </main>
  );
};

export default Register;
