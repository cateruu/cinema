'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { Movie } from '@/types/movies';
import { Room } from '@/types/room';
import { createSchedule } from '@/actions/schedules';
import { DatePicker } from '../ui/date-picker';
import SelectComponent from './SelectComponent/SelectComponent';
import LoadingButton from '../LoadingButton/LoadingButton';
import toast from 'react-hot-toast';

const initialState = {
  message: '',
  errors: [],
};

export type Value = {
  id: string;
  name: string;
};

interface Props {
  movies: Movie[];
  rooms: Room[];
}

const ScheduleForm = ({ movies, rooms }: Props) => {
  const [date, setDate] = useState<Date>();
  const [selectedMovie, setSelectedMovie] = useState<Value>();
  const [selectedRoom, setSelectedRoom] = useState<Value>();

  const createScheduleWithDate = createSchedule.bind(null, date);

  const [state, formAction, isPending] = useActionState(
    createScheduleWithDate,
    initialState
  );

  const moviesValues = movies.map((movie) => ({
    id: movie.id,
    name: movie.name,
  }));

  const roomsValues = rooms.map((room) => ({
    id: room.id,
    name: room.name,
  }));

  const hadleMovieChange = (id: string) => {
    const selected = moviesValues.find((movie) => movie.id === id);
    setSelectedMovie(selected);
  };

  const handleRoomChange = (id: string) => {
    const selected = roomsValues.find((room) => room.id === id);
    setSelectedRoom(selected);
  };

  useEffect(() => {
    if (state.message !== '' || state.message === null) {
      toast.error(
        <div className='flex flex-col'>
          <p className='font-bold'>{state.message}</p>
          <ul className='text-sm text-slate-400'>
            {state.errors?.length > 0 &&
              state.errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>,
        { duration: 5000 }
      );
    }
  }, [state]);

  return (
    <form action={formAction} className='p-3 flex flex-col gap-3 mb-12'>
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
            className={`bg-slate-950 border-2 border-slate-950 text-sm p-3 rounded-xl focus:border-orange-400 focus:outline-none w-20`}
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
            className={`bg-slate-950 border-2 border-slate-950 text-sm p-3 rounded-xl focus:border-orange-400 focus:outline-none w-20`}
          />
        </div>
      </div>
      <div className='w-full'>
        <label
          htmlFor='date'
          className='block pl-3 text-sm text-slate-400 font-bold'
        >
          Movie
        </label>
        <SelectComponent
          value={selectedMovie}
          values={moviesValues}
          onChange={hadleMovieChange}
          placeholder='Select movie...'
          name='movie'
        />
      </div>
      <div>
        <label
          htmlFor='date'
          className='block pl-3 text-sm text-slate-400 font-bold'
        >
          Room
        </label>
        <SelectComponent
          value={selectedRoom}
          values={roomsValues}
          onChange={handleRoomChange}
          placeholder='Select room...'
          name='room'
        />
      </div>
      <LoadingButton isLoading={isPending} text='Create' className='max-w-96' />
    </form>
  );
};

export default ScheduleForm;
