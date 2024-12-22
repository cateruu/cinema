'use client';

import {
  ActionDispatch,
  createContext,
  ReactNode,
  use,
  useReducer,
} from 'react';
import { Schedule } from '../types/schedule';

export enum ReservationActionTypes {
  ADD_TICKET = 'add_ticket',
  REMOVE_TICKET = 'remove_ticket',
  CLEAR_TICKETS = 'clear_tickets',
  SET_SCHEDULE = 'set_schedule',
}

type ReservationAction = {
  type: ReservationActionTypes;
  payload: string | Schedule;
};

interface Reservation {
  tickets: string[];
  selectedSchedule: Schedule | null;
}

const ReservationContext = createContext<Reservation | null>(null);
const ReservationDispatchContext = createContext<ActionDispatch<
  [action: ReservationAction]
> | null>(null);

const reservationReducer = (state: Reservation, action: ReservationAction) => {
  switch (action.type) {
    case ReservationActionTypes.ADD_TICKET:
      if (typeof action.payload === 'string') {
        return { ...state, tickets: [...state.tickets, action.payload] };
      }

      return state;
    case ReservationActionTypes.REMOVE_TICKET:
      if (typeof action.payload === 'string') {
        return {
          ...state,
          tickets: state.tickets.filter((ticket) => ticket !== action.payload),
        };
      }

      return state;
    case ReservationActionTypes.CLEAR_TICKETS:
      if (typeof action.payload === 'string') {
        return {
          ...state,
          tickets: [],
        };
      }

      return state;
    case ReservationActionTypes.SET_SCHEDULE:
      if (typeof action.payload === 'string') {
        return state;
      }

      return {
        ...state,
        selectedSchedule: action.payload,
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const initialReservation: Reservation = { tickets: [], selectedSchedule: null };

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
