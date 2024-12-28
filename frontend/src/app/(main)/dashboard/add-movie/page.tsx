import React from 'react';
import MovieForm from '../../../../components/MovieForm/MovieForm';
import { Clapperboard, CornerUpLeft } from 'lucide-react';
import Link from 'next/link';
import { verifySession } from '@/actions/verifySession';
import { UserRoles } from '@/types/auth';
import { redirect } from 'next/navigation';

const AddMoviePage = async () => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <Link
        href='/dashboard'
        className='flex align items-center gap-1 text-sm text-slate-600 transition-colors hover:text-orange-50 pl-3 pt-3'
      >
        <CornerUpLeft size={12} /> Go back
      </Link>
      <h2 className='flex items-center gap-2 text-xl p-3 font-bold'>
        <Clapperboard size={20} /> Add movie
      </h2>
      <MovieForm />
    </main>
  );
};

export default AddMoviePage;
