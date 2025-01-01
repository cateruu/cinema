import { formatTicketDate } from '@/utils/formatDate';
import Image from 'next/image';
import React from 'react';

interface Props {
  movieName: string;
  playingTime: Date;
  roomName: string;
  tickets: string[];
  price: number;
  thumbnailUrl: string;
}

const Ticket = ({
  movieName,
  playingTime,
  price,
  roomName,
  thumbnailUrl,
  tickets,
}: Props) => {
  return (
    <div className='w-full h-full min-h-48 max-h-80 bg-slate-950 rounded-xl mt-5 flex overflow-hidden'>
      <section className='min-w-64 flex-grow p-5 flex flex-col gap-3 justify-between font-medium sm:min-w-96 lg:min-w-52'>
        <div>
          <p className='text-2xl'>{movieName}</p>
          <p className='text-slate-600'>{formatTicketDate(playingTime)}</p>
        </div>
        <div>
          <div className='flex justify-between text-sm xl:text-base'>
            <p className='text-slate-600'>Room:</p>
            <p>
              {roomName.slice(0, 1).toUpperCase() +
                roomName.slice(1).toLowerCase()}
            </p>
          </div>
          <div className='flex justify-between gap-2 flex-nowrap'>
            <p className='text-slate-600'>Tickets:</p>
            <p className='max-w-44 truncate'>
              {tickets.map((ticket, idx) => (
                <span key={ticket}>
                  {ticket}
                  {idx !== tickets.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
          <p className='font-bold text-xl xl:text-2xl'>${price}</p>
        </div>
      </section>
      <section className='relative border-l-2 border-dashed border-orange-400 md:min-w-24 lg:max-w-60'>
        <Image
          src={thumbnailUrl}
          alt={`${movieName} poster`}
          width={700}
          height={700}
          className='h-full object-cover'
        />
        <div className='absolute -top-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
        <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-slate-900 rounded-full' />
      </section>
    </div>
  );
};

export default Ticket;
