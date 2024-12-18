'use client';

import { House, LayoutDashboard, Ticket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { UserRoles, UserSession } from '../../../context/UserContext';

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
        } rounded-xl p-3 font-medium text-sm flex items-center gap-3 hover:bg-slate-950 hover:text-orange-50 transition-colors`}
      >
        <House size={24} /> Home
      </Link>
      <Link
        href='/reservations'
        className={`${
          pathname === '/reservations' ? 'bg-slate-950' : 'text-slate-400'
        } rounded-xl p-3 font-medium text-sm flex items-center gap-3 hover:bg-slate-950 hover:text-orange-50 transition-colors`}
      >
        <Ticket size={24} />
        Reservations
      </Link>
      {user && user.valid && user.roles.includes(UserRoles.ADMIN) && (
        <Link
          href='/dashboard'
          className={`${
            pathname === '/dashboard' ? 'bg-slate-950' : 'text-slate-400'
          } rounded-xl p-3 font-medium text-sm flex items-center gap-3 hover:bg-slate-950 hover:text-orange-50 transition-colors`}
        >
          <LayoutDashboard size={24} />
          Dashboard
        </Link>
      )}
    </section>
  );
};

export default LinkButtons;
