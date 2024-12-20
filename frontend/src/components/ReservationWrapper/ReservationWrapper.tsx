import React from 'react';
import { verifySession } from '../../actions/verifySession';
import { Movie } from '../../types/movies';
import { Schedule } from '../../types/schedule';
import Room from './Room/Room';
import Ticket from '../Ticket/Ticket';

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
    <div className='flex flex-col flex-grow ml-5'>
      <Room schedules={schedules} />
      <Ticket />
    </div>
  );
};

export default ReservationWrapper;
