import React from 'react';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';
import { verifySession } from '../../actions/verifySession';
import { signOut } from '../../actions/auth-actions';
import LinkButtons from '../LinkButtons/LinkButtons';

const SideBar = async () => {
  const user = await verifySession();

  return (
    <aside className='min-h-screen max-h-screen p-8 flex flex-col sticky top-0'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-8 whitespace-nowrap'>
        CINEMA <span className='text-orange-400'>MNGMT</span>
      </h1>
      <LinkButtons user={user} />
      <section className='mt-auto'>
        {user && user.valid ? (
          <button
            className={
              'w-full bg-slate-950 rounded-xl p-3 font-medium text-sm flex items-center gap-3'
            }
            onClick={signOut}
          >
            <LogOut size={24} /> Sign out
          </button>
        ) : (
          <Link
            href='/login'
            className={
              'w-full bg-slate-950 rounded-xl p-3 font-medium text-sm flex items-center gap-3'
            }
          >
            <LogIn size={24} />
            Sign in
          </Link>
        )}
        <footer className='text-xs text-center text-slate-400 mt-2'>
          &copy; CINEMA MNGMT 2024
        </footer>
      </section>
    </aside>
  );
};

export default SideBar;
