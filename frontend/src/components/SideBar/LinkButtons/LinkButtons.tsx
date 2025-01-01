'use client';

import { UserRoles, UserSession } from '@/types/auth';
import { House, LayoutDashboard, Ticket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  user: UserSession | null;
}

const LinkButtons = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <section className='flex flex-col gap-3'>
      <Link
        href='/'
        className={`${
          pathname === '/' ? 'bg-slate-950' : 'text-slate-400'
        } rounded-xl p-2 w-full font-medium text-sm flex items-center gap-3 flex-nowrap overflow-hidden hover:bg-slate-950 hover:text-orange-50 transition-colors xl:p-3`}
      >
        <div className='w-6'>
          <House />
        </div>{' '}
        Home
      </Link>
      {user && user.valid && (
        <Link
          href='/reservations'
          className={`${
            pathname === '/reservations' ? 'bg-slate-950' : 'text-slate-400'
          } rounded-xl p-2 font-medium text-sm flex items-center gap-3 flex-nowrap overflow-hidden hover:bg-slate-950 hover:text-orange-50 transition-colors xl:p-3`}
        >
          <div className='w-6'>
            <Ticket />
          </div>
          Reservations
        </Link>
      )}
      {user && user.valid && user.roles.includes(UserRoles.ADMIN) && (
        <Link
          href='/dashboard'
          className={`${
            pathname === '/dashboard' ? 'bg-slate-950' : 'text-slate-400'
          } rounded-xl p-2 font-medium text-sm flex items-center gap-3 flex-nowrap overflow-hidden hover:bg-slate-950 hover:text-orange-50 transition-colors xl:p-3`}
        >
          <div className='w-6'>
            <LayoutDashboard />
          </div>
          Dashboard
        </Link>
      )}
    </section>
  );
};

export default LinkButtons;
