'use client';

import React, { useActionState, useEffect } from 'react';
import ThumbnailUpload from './ThumbnailUpload/ThumbnailUpload';
import Input from '../Input/Input';
import GenreSelect from './GenreSelect/GenreSelect';
import { createMovie } from '../../actions/movies';
import LoadingButton from '../LoadingButton/LoadingButton';
import toast from 'react-hot-toast';

const initialState = {
  message: '',
  errors: [],
};

const MovieForm = () => {
  const [state, formAction, isPending] = useActionState(
    createMovie,
    initialState
  );

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
    <form
      action={formAction}
      className='p-3 flex flex-col items-center gap-3 mb-12 md:flex-row md:justify-between md:items-start'
    >
      <ThumbnailUpload />
      <div className='w-full flex flex-col gap-3 md:order-1 md:flex-grow'>
        <Input
          type='text'
          name='name'
          label='Name'
          placeholder='Fast & Furious'
        />
        <Input
          type='text'
          name='description'
          label='Description'
          placeholder='Very fast cars'
        />
        <Input
          type='number'
          name='duration'
          label='Duration'
          placeholder='In minutes'
        />
        <Input
          type='number'
          name='price'
          label='Ticket price'
          placeholder='$14.44'
          step='0.01'
        />
        <GenreSelect />
        <LoadingButton text='Create' isLoading={isPending} />
      </div>
    </form>
  );
};

export default MovieForm;
