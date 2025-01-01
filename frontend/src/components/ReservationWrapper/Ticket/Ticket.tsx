'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { UserSession } from '@/types/auth';
import { Movie } from '@/types/movies';
import {
  ReservationActionTypes,
  useReservation,
  useReservationDispatch,
} from '@/context/ReservationContext';
import { useReservationModal } from '@/context/ReservationModalContext';
import { buyTickets } from '@/actions/reservation';
import { formatTicketDate } from '@/utils/formatDate';

interface Props {
  user: UserSession | null;
  selectedMovie: Movie;
}

const Ticket = ({ user, selectedMovie }: Props) => {
  const reservation = useReservation();
  const router = useRouter();
  const dispatch = useReservationDispatch();
  const modalState = useReservationModal();

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

      toast.success('Tickets bought successfuly.', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      }
    } finally {
      modalState?.setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <section className='w-full h-full min-h-48 max-h-80 bg-slate-950 rounded-xl mt-5 flex overflow-hidden'>
      <section className='min-w-64 flex-grow p-5 flex flex-col gap-3 justify-between font-medium sm:min-w-96 lg:min-w-52'>
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
          <div className='flex justify-between text-sm xl:text-base'>
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
          <div className='flex justify-between gap-2 flex-nowrap'>
            <p className='text-slate-600'>Tickets:</p>
            <p className='max-w-44 truncate'>
              {reservation?.tickets.map((ticket, idx) => (
                <span key={ticket}>
                  {ticket}
                  {idx !== reservation.tickets.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
          {reservation && (
            <p className='font-bold text-xl xl:text-2xl'>
              $
              {(reservation.tickets.length * selectedMovie.ticketPrice).toFixed(
                2
              )}
            </p>
          )}
          <button
            onClick={handleTicketsBuy}
            className={`font-bold text-sm py-3 px-4 bg-orange-400 rounded-xl whitespace-nowrap flex justify-center xl:px-6 ${
              !user && 'bg-slate-600'
            }`}
            disabled={isLoading}
          >
            {user ? (
              isLoading ? (
                <svg
                  width='24'
                  height='24'
                  viewBox='-15 -15 150 150'
                  className='animate-spin'
                >
                  <circle
                    r='50'
                    cx='60'
                    cy='60'
                    fill='transparent'
                    stroke='#fff7ed'
                    strokeWidth='16px'
                    strokeDasharray='314px'
                    strokeDashoffset='0'
                  ></circle>
                  <circle
                    r='50'
                    cx='60'
                    cy='60'
                    stroke='#b45309'
                    strokeWidth='16px'
                    strokeLinecap='round'
                    strokeDashoffset='251px'
                    fill='transparent'
                    strokeDasharray='314px'
                  ></circle>
                </svg>
              ) : (
                'Buy tickets'
              )
            ) : (
              'Login to buy'
            )}
          </button>
        </div>
      </section>
      <section className='relative border-l-2 border-dashed border-orange-400 md:min-w-24 lg:max-w-60'>
        <Image
          src={selectedMovie.thumbnailUrl}
          alt={`${selectedMovie.name} poster`}
          width={700}
          height={700}
          className='h-full object-cover'
        />
        <div className='absolute -top-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
        <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
      </section>
    </section>
  );
};

export default Ticket;
