import React from 'react';
import Room from './Room/Room';
import Ticket from './Ticket/Ticket';
import { Movie } from '@/types/movies';
import { verifySession } from '@/actions/verifySession';
import { Schedule } from '@/types/schedule';
import { ReservationProvider } from '@/context/ReservationContext';

interface Props {
  selectedMovie: Movie;
  isMobile: boolean;
}

const ReservationWrapper = async ({ selectedMovie, isMobile }: Props) => {
  const user = await verifySession();

  const resp = await fetch(
    `${process.env.API_URL}/v1/movies/${selectedMovie?.id}/schedule`
  );

  if (!resp.ok) {
    return (
      <section className='ml-5'>
        Unable to load schedule for {selectedMovie?.name}.
      </section>
    );
  }

  const schedules = (await resp.json()) as Schedule[];

  return (
    <div
      className={`flex-col flex-grow lg:flex ${
        isMobile ? 'flex ml-0' : 'hidden ml-5'
      }`}
    >
      <ReservationProvider>
        <Room schedules={schedules} selectedMovieId={selectedMovie.id} />
        {schedules.length > 0 && (
          <Ticket user={user} selectedMovie={selectedMovie} />
        )}
      </ReservationProvider>
    </div>
  );
};

export default ReservationWrapper;
