'use client';

import React, { ReactNode } from 'react';
import { useReservationModal } from '../../context/ReservationModalContext';
import { X } from 'lucide-react';

interface Props {
  children: ReactNode;
}

const ReservationModal = ({ children }: Props) => {
  const state = useReservationModal();

  const handleModalClose = () => {
    state?.setIsOpen(false);
  };

  return (
    <div
      className={`fixed left-0 h-full w-full lg:hidden z-50 bg-slate-900 p-3 overflow-hidden overflow-y-auto ${
        state?.isOpen ? 'animate-reveal' : 'top-full'
      }`}
    >
      <div className='flex gap-2 justify-end mb-3'>
        <button
          onClick={handleModalClose}
          className='flex items-center text-slate-400'
        >
          <p className='font-medium text-sm'>Close</p>
          <X />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ReservationModal;
