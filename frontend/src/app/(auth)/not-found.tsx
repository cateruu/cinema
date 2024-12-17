import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-10'>
        CINEMA <span className='text-orange-400'>MNGMT</span>
      </h1>
      <p className='text-xl'>Page you are trying to access do not exist.</p>
      <Link href='/' className='text-orange-400 mt-4'>
        Home
      </Link>
    </main>
  );
};

export default NotFound;
