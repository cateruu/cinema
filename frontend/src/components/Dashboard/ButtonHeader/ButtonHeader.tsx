import { Armchair, Calendar, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ButtonHeader = () => {
  return (
    <header className='py-3 flex items-center justify-center gap-2 flex-wrap sm:gap-3 xl:py-6 xl:justify-normal'>
      <Link
        href='/dashboard/add-movie'
        className='bg-slate-950 py-3 px-3 rounded-xl text-sm font-medium flex items-center gap-2 sm:px-6'
      >
        <Clapperboard size={20} /> Add movie
      </Link>
      <Link
        href='/dashboard/add-room'
        className='bg-slate-950 py-3 px-3 rounded-xl text-sm font-medium flex items-center gap-2 sm:px-6'
      >
        <Armchair size={20} /> Add room
      </Link>
      <Link
        href='/dashboard/add-schedule'
        className='bg-slate-950 py-3 px-3 rounded-xl text-sm font-medium flex items-center gap-2 sm:px-6'
      >
        <Calendar size={20} /> Add schedule
      </Link>
    </header>
  );
};

export default ButtonHeader;
