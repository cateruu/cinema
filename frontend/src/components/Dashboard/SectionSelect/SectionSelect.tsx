'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { DashboardSections } from '../../../types/dashboard';

const SectionSelect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const currentSection = searchParams
    ? searchParams.split('=')[1]
    : DashboardSections.MOVIES;

  return (
    <div className='w-fit mx-auto flex items-center justify-center gap-1 border-2 border-slate-600 rounded-xl p-1 xl:mx-0'>
      <Link
        href={`${pathname}?section=movies`}
        className={`w-28 text-center rounded-lg py-2 text-sm ${
          currentSection === DashboardSections.MOVIES
            ? 'bg-orange-400 font-medium'
            : 'text-slate-400'
        }`}
      >
        Movies
      </Link>
      <Link
        href={`${pathname}?section=schedules`}
        className={`w-28 text-center rounded-lg py-2 text-sm ${
          currentSection === DashboardSections.SCHEDULES
            ? 'bg-orange-400 font-medium'
            : 'text-slate-400'
        }`}
      >
        Schedules
      </Link>
    </div>
  );
};

export default SectionSelect;
