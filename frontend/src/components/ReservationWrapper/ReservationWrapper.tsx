import React from 'react';
import { Movie } from '../../types/movies';
import { Schedule } from '../../types/schedule';
import Room from './Room/Room';
import Ticket from '../Ticket/Ticket';
import { ReservationProvider } from '../../context/ReservationContext';
import { verifySession } from '../../actions/verifySession';

interface Props {
  selectedMovie: Movie;
}

const ReservationWrapper = async ({ selectedMovie }: Props) => {
  const user = await verifySession();

  const resp = await fetch(
    `${process.env.API_URL}/v1/movies/${selectedMovie.id}/schedule`
  );

  if (!resp.ok) {
    return (
      <section className='ml-5'>
        Unable to load schedule for {selectedMovie.name}.
      </section>
    );
  }

  const schedules = (await resp.json()) as Schedule[];

  return (
    <div className='hidden lg:flex flex-col flex-grow ml-5 '>
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
