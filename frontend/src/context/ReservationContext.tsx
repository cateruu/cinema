'use client';

import {
  ActionDispatch,
  createContext,
  ReactNode,
  use,
  useReducer,
} from 'react';

export enum ReservationActionTypes {
  ADD_TICKET = 'add_ticket',
  REMOVE_TICKET = 'remove_ticket',
}

type ReservationAction = {
  type: ReservationActionTypes;
  payload: string;
};

interface Reservation {
  tickets: string[];
}

const ReservationContext = createContext<Reservation | null>(null);
const ReservationDispatchContext = createContext<ActionDispatch<
  [action: ReservationAction]
> | null>(null);

const reservationReducer = (state: Reservation, action: ReservationAction) => {
  switch (action.type) {
    case ReservationActionTypes.ADD_TICKET:
      return { tickets: [...state.tickets, action.payload] };
    case ReservationActionTypes.REMOVE_TICKET:
      return {
        tickets: state.tickets.filter((ticket) => ticket !== action.payload),
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const initialReservation: Reservation = { tickets: [] };

export const ReservationProvider = ({ children }: Props) => {
  const [reservation, dispatch] = useReducer(
    reservationReducer,
    initialReservation
  );

  return (
    <ReservationContext value={reservation}>
      <ReservationDispatchContext value={dispatch}>
        {children}
      </ReservationDispatchContext>
    </ReservationContext>
  );
};

export const useReservation = () => {
  return use(ReservationContext);
};

export const useReservationDispatch = () => {
  return use(ReservationDispatchContext);
};
