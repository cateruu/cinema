'use client';

import { createRoom, updateRoom } from '@/actions/rooms';
import { Room } from '@/types/room';
import React, { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Input from '../Input/Input';
import LoadingButton from '../LoadingButton/LoadingButton';

const initialState = {
  message: '',
  errors: [],
};

interface Props {
  isEditMode?: boolean;
  room?: Room;
}

const RoomForm = ({ isEditMode, room }: Props) => {
  const udateWithRoom = updateRoom.bind(null, room);

  const [state, formAction, isPending] = useActionState(
    isEditMode ? udateWithRoom : createRoom,
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
    <form action={formAction} className='p-3 flex flex-col gap-3 mb-12'>
      <Input
        name='name'
        type='text'
        label='Name'
        placeholder='Lutbox'
        defaultValue={room?.name}
      />
      <Input
        name='rows'
        type='number'
        label='Rows'
        placeholder='4'
        defaultValue={room?.rows}
      />
      <Input
        name='seats'
        type='number'
        label='Seats'
        placeholder='max 26'
        defaultValue={room?.seats}
      />
      <LoadingButton
        text={isEditMode ? 'Update' : 'Create'}
        isLoading={isPending}
      />
    </form>
  );
};

export default RoomForm;
