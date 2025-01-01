'use client';

import React, { ReactNode, useRef } from 'react';
import { X } from 'lucide-react';
import { useReservationModal } from '@/context/ReservationModalContext';

interface Props {
  children: ReactNode;
}

const ReservationModal = ({ children }: Props) => {
  const state = useReservationModal();
  const isInitialRender = useRef(true);

  const handleModalClose = () => {
    isInitialRender.current = false;
    state?.setIsOpen(false);
  };

  return (
    <div
      className={`fixed left-0 h-full w-full lg:hidden z-50 bg-slate-900 p-3 overflow-hidden overflow-y-auto ${
        state?.isOpen
          ? 'animate-reveal'
          : isInitialRender.current
          ? 'top-full'
          : 'animate-hide'
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
