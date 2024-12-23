'use client';

import React from 'react';
import { UserRoles, UserSession } from '../../../types/auth';
import { Home, LayoutDashboard, Ticket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  user: UserSession | null;
}

const LinkButtons = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <div className='flex items-center justify-center gap-5'>
      <Link href='/'>
        <Home
          className={`${
            pathname === '/' ? 'text-orange-50' : 'text-slate-800'
          } transition-colors`}
        />
      </Link>
      {user && user.valid && (
        <Link href='/reservations'>
          <Ticket
            className={`${
              pathname === '/reservations' ? 'text-orange-50' : 'text-slate-800'
            } transition-colors`}
          />
        </Link>
      )}
      {user && user.valid && user.roles.includes(UserRoles.ADMIN) && (
        <Link href='/dashboard'>
          <LayoutDashboard
            className={`${
              pathname === '/dashboard' ? 'text-orange-50' : 'text-slate-800'
            } transition-colors`}
          />
        </Link>
      )}
    </div>
  );
};

export default LinkButtons;
