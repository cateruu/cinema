'use client';

import React from 'react';
import SearchHeader from '../../components/SearchHeader/SearchHeader';

// interface Props {
//   error: Error & { digest?: string };
//   reset: () => void;
// }

const Error = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full'>
      <SearchHeader />
      <div className='flex pr-8'>
        <section>
          <p>Unable to load movies.</p>
          <p>Resfresh the page to try again.</p>
        </section>
      </div>
    </main>
  );
};

export default Error;
