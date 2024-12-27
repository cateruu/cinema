import React from 'react';
import Link from 'next/link';
import { LogIn, LogOut } from 'lucide-react';
import { verifySession } from '../../actions/verifySession';
import { signOut } from '../../actions/auth-actions';
import LinkButtons from './LinkButtons/LinkButtons';

const SideBar = async () => {
  const user = await verifySession();

  return (
    <aside className='hidden group min-h-screen max-h-screen p-4 flex-col fixed top-0 w-[70px] overflow-hidden bg-slate-900 shadow-xl shadow-slate-950 z-50 transition-all hover:w-72 hover:overflow-visible lg:flex xl:w-fit xl:p-8 xl:overflow-visible xl:sticky xl:shadow-none xl:hover:w-fit'>
      <h1 className='font-[family-name:var(--font-krona-one)] text-2xl mb-8 whitespace-nowrap w-7 overflow-hidden group-hover:w-full xl:overflow-visible xl:w-fit'>
        CINEMA <span className='text-orange-400'>MNGMT</span>
      </h1>
      <LinkButtons user={user} />
      <section className='mt-auto flex flex-col'>
        {user && user.valid ? (
          <button
            className={
              'w-full bg-slate-950 rounded-xl p-2 font-medium text-sm flex items-center flex-nowrap gap-3 overflow-hidden whitespace-nowrap xl:p-3'
            }
            onClick={signOut}
          >
            <div className='w-6'>
              <LogOut size={20} />
            </div>{' '}
            Sign out
          </button>
        ) : (
          <Link
            href='/login'
            className={
              'w-full bg-slate-950 rounded-xl p-2 font-medium text-sm flex items-center flex-nowrap gap-3 overflow-hidden whitespace-nowrap xl:p-3'
            }
          >
            <div className='w-6'>
              <LogIn size={20} />
            </div>
            Sign in
          </Link>
        )}
        <footer className='text-xs self-center text-slate-400 mt-2 whitespace-nowrap w-3 overflow-hidden group-hover:w-[135px] transition-all xl:w-fit xl:overflow-visible'>
          &copy; CINEMA MNGMT 2024
        </footer>
      </section>
    </aside>
  );
};

export default SideBar;
