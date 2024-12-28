'use client';

import React, { useState } from 'react';
import { DatePicker } from '../ui/date-picker';
import { Movie } from '@/types/movies';
import { Room } from '@/types/room';

interface Props {
  movies: Movie[];
  rooms: Room[];
}

const ScheduleForm = ({ movies, rooms }: Props) => {
  const [date, setDate] = useState<Date>();

  return (
    <form className='p-3 flex flex-col gap-3 mb-12'>
      <div>
        <label
          htmlFor='date'
          className='block pl-3 text-sm text-slate-400 font-bold'
        >
          Date
        </label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div className='flex items-center gap-2'>
        <div>
          <label
            htmlFor='hour'
            className='block pl-3 text-sm text-slate-400 font-bold'
          >
            Hour
          </label>
          <input
            type='number'
            name='hour'
            id='hour'
            max={24}
            min={1}
            className={`bg-slate-950 border-2 border-slate-950 text-sm p-3 rounded-xl focus:border-orange-400 focus:outline-none`}
          />
        </div>
        <p className='text-xl font-bold mt-4'>:</p>
        <div>
          <label
            htmlFor='minute'
            className='block pl-3 text-sm text-slate-400 font-bold'
          >
            Minute
          </label>
          <input
            type='number'
            name='minute'
            id='minute'
            max={60}
            min={1}
            className={`bg-slate-950 border-2 border-slate-950 text-sm p-3 rounded-xl focus:border-orange-400 focus:outline-none`}
          />
        </div>
      </div>
    </form>
  );
};

export default ScheduleForm;
