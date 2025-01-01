import { verifySession } from '@/actions/verifySession';
import ScheduleForm from '@/components/ScheduleForm/ScheduleForm';
import { UserRoles } from '@/types/auth';
import { Movie } from '@/types/movies';
import { Paginated } from '@/types/paginated';
import { Room } from '@/types/room';
import { Calendar, CornerUpLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const AddSchedulePage = async () => {
  const user = await verifySession();

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    redirect('/');
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const moviesFetch = fetch(`${process.env.API_URL}/v1/movies?size=99999999`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const roomsFetch = fetch(`${process.env.API_URL}/v1/rooms?size=99999999`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [respMovies, respRooms] = await Promise.all([moviesFetch, roomsFetch]);

  if (!respMovies.ok || !respRooms.ok) {
    return (
      <section className='p-3 text-center'>
        Unable to load data.
        <Link href='/dashboard' className='block text-orange-400'>
          Go back to dashboard main page and try again.
        </Link>
      </section>
    );
  }

  const movies = (await respMovies.json()) as Paginated<Movie>;
  const rooms = (await respRooms.json()) as Paginated<Room>;

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full lg:ml-20 xl:ml-0'>
      <Link
        href='/dashboard'
        className='flex align items-center gap-1 text-sm text-slate-600 transition-colors hover:text-orange-50 pl-3 pt-3'
      >
        <CornerUpLeft size={12} /> Go back
      </Link>
      <h2 className='flex items-center gap-2 text-xl p-3 font-bold'>
        <Calendar size={20} /> Add schedule
      </h2>
      <ScheduleForm movies={movies.content} rooms={rooms.content} />
    </main>
  );
};

export default AddSchedulePage;
