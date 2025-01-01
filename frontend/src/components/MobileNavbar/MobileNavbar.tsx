import React from 'react';
import LinkButtons from './LinkButtons/LinkButtons';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/actions/auth-actions';
import { verifySession } from '@/actions/verifySession';

const MobileNavbar = async () => {
  const user = await verifySession();

  return (
    <nav className='fixed bottom-2 left-1/2 -translate-x-1/2 bg-slate-950 w-fit z-50 h-11 pl-3 flex items-center justify-center gap-3 rounded-xl border-[1px] border-orange-400 shadow-sm shadow-slate-950 lg:hidden'>
      <LinkButtons user={user} />
      <div className='h-full flex items-center border-l-[1px] border-orange-400 px-3'>
        {user && user.valid ? (
          <button className={''} onClick={signOut}>
            <LogOut size={20} />
          </button>
        ) : (
          <Link href='/login' className={''}>
            <LogIn size={20} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
