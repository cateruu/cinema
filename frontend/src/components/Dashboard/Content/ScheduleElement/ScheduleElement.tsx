import React from 'react';
import { Schedule } from '../../../../types/schedule';
import Image from 'next/image';
import { formatTicketDate } from '../../../../utils/formatDate';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';

interface Props {
  schedule: Schedule;
}

const ScheduleElement = ({ schedule }: Props) => {
  return (
    <div className='group w-full p-3 flex flex-col rounded-xl overflow-hidden bg-slate-950'>
      <Image
        src={schedule.movie.thumbnailUrl}
        alt={`${schedule.movie.name} poster`}
        width={500}
        height={500}
        className='aspect-square object-cover rounded-lg w-full'
      />
      <section className='mt-3 relative'>
        <p className='text-xl font-medium'>
          {formatTicketDate(new Date(schedule.playingTime))}
        </p>
        <p className='flex items-center justify-between'>
          <span className='text-slate-600'>Movie:</span>
          <span className='font-medium'>{schedule.movie.name}</span>
        </p>
        <p className='flex items-center justify-between'>
          <span className='text-slate-600'>Room:</span>
          <span className='font-medium'>
            {schedule.room.name.slice(0, 1).toUpperCase() +
              schedule.room.name.slice(1).toLowerCase()}
          </span>
        </p>
        <p className='flex items-center justify-between'>
          <span className='text-slate-600'>Available seats:</span>
          <span className='font-medium'>{schedule.availableSeats.length}</span>
        </p>
        <DeleteConfirmationModal
          scheduleTime={formatTicketDate(new Date(schedule.playingTime))}
          scheduleId={schedule.id}
        />
      </section>
    </div>
  );
};

export default ScheduleElement;
