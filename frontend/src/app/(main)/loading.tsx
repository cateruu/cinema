import React from 'react';

const Loading = () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-screen ml-8 flex flex-col items-center justify-center gap-3 lg:ml-20 xl:ml-0'>
      <h2 className='text-xl font-bold'>Loading....</h2>
      <p className='max-w-96 text-slate-400 text-center'>
        API is hosted on a free server, which means it may experience a cold
        start delay of up to 1 minute when it hasn&apos;t been used for a while.
        If you encounter a longer wait time, this is likely the cause. Thank you
        for your patience and understanding!
      </p>
    </main>
  );
};

export default Loading;
