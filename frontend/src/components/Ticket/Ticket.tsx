'use client';

import React, { useState } from 'react';
import { UserSession } from '../../types/auth';
import { Movie } from '../../types/movies';
import {
  ReservationActionTypes,
  useReservation,
  useReservationDispatch,
} from '../../context/ReservationContext';
import Image from 'next/image';
import { formatTicketDate } from '../../utils/formatDate';
import { useRouter } from 'next/navigation';
import { buyTickets } from '../../actions/reservation';

interface Props {
  user: UserSession | null;
  selectedMovie: Movie;
}

const Ticket = ({ user, selectedMovie }: Props) => {
  const reservation = useReservation();
  const router = useRouter();
  const dispatch = useReservationDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleTicketsBuy = async () => {
    if (!reservation) return;
    if (!reservation.selectedSchedule) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (reservation.tickets.length <= 0) return;

    setIsLoading(true);
    try {
      await buyTickets(
        reservation.tickets,
        reservation.selectedSchedule.id,
        user.id
      );

      if (dispatch) {
        dispatch({
          type: ReservationActionTypes.CLEAR_TICKETS,
          payload: '',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full h-full bg-slate-950 rounded-xl mt-5 flex'>
      <section className='flex-grow p-5 flex flex-col justify-between font-medium'>
        <div>
          <p className='text-2xl'>{selectedMovie.name}</p>
          <p className='text-slate-600'>
            {reservation?.selectedSchedule &&
              formatTicketDate(
                new Date(reservation.selectedSchedule.playingTime)
              )}
          </p>
        </div>
        <div>
          <div className='flex justify-between'>
            <p className='text-slate-600'>Room:</p>
            <p>
              {reservation?.selectedSchedule &&
                reservation?.selectedSchedule?.room.name
                  .slice(0, 1)
                  .toUpperCase() +
                  reservation?.selectedSchedule?.room.name
                    .slice(1)
                    .toLowerCase()}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='text-slate-600'>Tickets:</p>
            <p>
              {reservation?.tickets.map((ticket, idx) => (
                <span key={ticket}>
                  {ticket}
                  {idx !== reservation.tickets.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          {reservation && (
            <p className='font-bold text-4xl'>
              $
              {(reservation.tickets.length * selectedMovie.ticketPrice).toFixed(
                2
              )}
            </p>
          )}
          <button
            onClick={handleTicketsBuy}
            className={`font-bold text-sm py-3 px-8 bg-orange-400 rounded-xl ${
              !user && 'bg-slate-600'
            }`}
            disabled={isLoading}
          >
            {user ? (isLoading ? 'Loading...' : 'Buy tickets') : 'Login to buy'}
          </button>
        </div>
      </section>
      <section className='min-w-24 max-w-60 h-full relative border-l-2 border-dashed border-orange-400'>
        <Image
          src={selectedMovie.thumbnailUrl}
          alt={`${selectedMovie.name} poster`}
          width={500}
          height={500}
          className='h-full object-cover'
        />
        <div className='absolute -top-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
        <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
      </section>
    </section>
  );
};

export default Ticket;
