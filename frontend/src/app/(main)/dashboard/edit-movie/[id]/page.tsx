import Link from 'next/link';
import React from 'react';
import { Movie } from '../../../../../types/movies';
import { Clapperboard, CornerUpLeft } from 'lucide-react';
import MovieForm from '../../../../../components/MovieForm/MovieForm';
import { verifySession } from '@/actions/verifySession';
import { UserRoles } from '@/types/auth';
import { redirect } from 'next/navigation';

type Params = {
  params: Promise<{ id: string }>;
};

const EditPage = async ({ params }: Params) => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  const id = (await params).id;

  const resp = await fetch(`${process.env.API_URL}/v1/movies/${id}`);

  if (!resp.ok) {
    return (
      <section className='w-full h-full flex flex-col items-center justify-center p-3 xl:p-8'>
        <h2 className='text-xl text-center'>Unable to fetch the movie.</h2>
        <Link href='/dashboard' className='text-orange-400 font-medium'>
          Go back
        </Link>
      </section>
    );
  }

  const movie = (await resp.json()) as Movie;

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <Link
        href='/dashboard'
        className='flex align items-center gap-1 text-sm text-slate-600 transition-colors hover:text-orange-50 pl-3 pt-3'
      >
        <CornerUpLeft size={12} /> Go back
      </Link>
      <h1 className='flex items-center gap-2 text-xl p-3 font-bold'>
        <Clapperboard size={20} /> Edit movie - {movie.name}
      </h1>
      <MovieForm isEditMode movie={movie} />
    </main>
  );
};

export default EditPage;
