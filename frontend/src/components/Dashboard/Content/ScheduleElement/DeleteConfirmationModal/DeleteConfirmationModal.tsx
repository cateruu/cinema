'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Clapperboard, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteSchedule } from '../../../../../actions/schedules';

interface Props {
  scheduleTime: string;
  scheduleId: string;
}

const DeleteConfirmationModal = ({ scheduleId, scheduleTime }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMovieDelete = async () => {
    setIsLoading(true);
    try {
      const resp = await deleteSchedule(scheduleId);

      if (!resp) {
        toast.error('Unable to delete the movie.');
      } else {
        toast.success('Movie successfully deleted.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className='flex items-center justify-center gap-1 text-slate-600 text-sm font-medium transition-colors hover:text-red-600 w-full bg-slate-800 rounded-lg py-2 mt-2'>
        <Trash size={16} /> Delete
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-slate-900 opacity-85 w-screen h-screen fixed top-0 left-0 z-40' />
        <Dialog.Content className='z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 rounded-xl p-3 shadow-xl'>
          <Dialog.Title className='flex items-center gap-2 text-xl font-medium text-slate-500 whitespace-nowrap'>
            <Clapperboard size={20} />
            Delete movie
          </Dialog.Title>
          <Dialog.Description className='mt-3 font-medium min-w-72 sm:whitespace-nowrap'>
            Are you sure you want to delete schedule playint at {scheduleTime}?
          </Dialog.Description>
          <div className='flex items-center w-full gap-1 mt-3'>
            <Dialog.Close className='flex-grow py-2 bg-slate-900 text-sm font-medium rounded-xl'>
              Cancel
            </Dialog.Close>
            <button
              onClick={handleMovieDelete}
              className='flex-grow py-2 bg-green-700 text-sm font-medium rounded-xl flex items-center justify-center max-h-9'
            >
              {isLoading ? (
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
                    stroke='#166534'
                    strokeWidth='16px'
                    strokeLinecap='round'
                    strokeDashoffset='251px'
                    fill='transparent'
                    strokeDasharray='314px'
                  ></circle>
                </svg>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteConfirmationModal;
