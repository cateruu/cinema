'use client';

import { createContext, ReactNode, use, useState } from 'react';

interface State {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ReservationModalOpenContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

export const ReservationModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const value: State = {
    isOpen,
    setIsOpen,
  };

  return (
    <ReservationModalOpenContext value={value}>
      {children}
    </ReservationModalOpenContext>
  );
};

export const useReservationModal = () => {
  return use(ReservationModalOpenContext);
};
