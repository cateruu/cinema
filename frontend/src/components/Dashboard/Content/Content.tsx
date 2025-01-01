import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import MovieElement from './MovieElement/MovieElement';
import ScheduleElement from './ScheduleElement/ScheduleElement';
import RoomElement from './RoomElement/RoomElement';
import { DashboardSections } from '@/types/dashboard';
import { Movie } from '@/types/movies';
import { Schedule } from '@/types/schedule';
import { Room } from '@/types/room';
import { Paginated } from '@/types/paginated';

interface Props {
  activeSection: string;
}

const Content = async ({ activeSection }: Props) => {
  let fetchUrl = `${process.env.API_URL}/v1`;

  if (activeSection === DashboardSections.MOVIES) {
    fetchUrl += '/movies';
  } else if (activeSection === DashboardSections.SCHEDULES) {
    fetchUrl += '/schedule';
  } else if (activeSection === DashboardSections.ROOMS) {
    fetchUrl += '/rooms';
  } else {
    return (
      <section className='p-3 text-center'>
        Unknown dashboard section
        <Link href='/dashboard' className='block text-orange-400'>
          Go back to dashboard main page.
        </Link>
      </section>
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const resp = await fetch(`${fetchUrl}?size=99999`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    return (
      <section className='p-3 text-center'>
        Unable to load {activeSection}.
        <Link href='/dashboard' className='block text-orange-400'>
          Go back to dashboard main page and try again.
        </Link>
      </section>
    );
  }

  const data = await resp.json();

  return (
    <section className='p-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:pl-0'>
      {activeSection === DashboardSections.MOVIES &&
        (data as Paginated<Movie>).content.map((movie) => (
          <MovieElement movie={movie} key={movie.id} />
        ))}
      {activeSection === DashboardSections.SCHEDULES &&
        (data as Schedule[]).map((schedule) => (
          <ScheduleElement schedule={schedule} key={schedule.id} />
        ))}
      {activeSection === DashboardSections.ROOMS &&
        (data as Paginated<Room>).content.map((room) => (
          <RoomElement room={room} key={room.id} />
        ))}
    </section>
  );
};

export default Content;
