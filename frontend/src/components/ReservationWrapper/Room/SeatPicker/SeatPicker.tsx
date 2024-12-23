import React from 'react';
import MovieScreen from '../../../MovieScreen/MovieScreen';
import { Schedule } from '../../../../types/schedule';
import { X } from 'lucide-react';
import {
  ReservationActionTypes,
  useReservation,
  useReservationDispatch,
} from '../../../../context/ReservationContext';

const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

interface Seat {
  seat: string;
  reserved: boolean;
}

interface Props {
  selectedSchedule: Schedule;
}

const SeatPicker = ({ selectedSchedule }: Props) => {
  const seats: Seat[] = [];

  for (let i = 1; i <= selectedSchedule.room.rows; i++) {
    let charIdx = 0;
    for (let j = A_CHAR_CODE; j <= Z_CHAR_CODE; j++) {
      if (charIdx < selectedSchedule.room.seats) {
        const seat = `${i}-${String.fromCharCode(j)}`;
        seats.push({
          seat: seat,
          reserved: !selectedSchedule.availableSeats.includes(seat),
        });
        charIdx++;
      } else {
        break;
      }
    }
  }

  const reservation = useReservation();
  const dispatch = useReservationDispatch();

  const handleSeatSelection = (seat: Seat, selected: boolean) => {
    if (seat.reserved) {
      return;
    }

    if (dispatch) {
      if (selected) {
        dispatch({
          type: ReservationActionTypes.REMOVE_TICKET,
          payload: seat.seat,
        });
      } else {
        dispatch({
          type: ReservationActionTypes.ADD_TICKET,
          payload: seat.seat,
        });
      }
    }
  };

  return (
    <section className='w-full flex flex-col items-center justify-center'>
      <MovieScreen />
      <p className='text-slate-400 font-medium -mt-16'>
        {selectedSchedule.room.name.slice(0, 1).toUpperCase() +
          selectedSchedule.room.name.slice(1).toLowerCase()}
      </p>
      <div
        style={{
          gridTemplateRows: `repeat(${selectedSchedule.room.rows}, 1fr)`,
          gridTemplateColumns: `repeat(${selectedSchedule.room.seats}, 1fr)`,
        }}
        className={`grid gap-3 items-center justify-items-center mt-5`}
      >
        {seats.map((seat) => {
          if (!reservation) return;

          const isSelected = reservation.tickets.includes(seat.seat);

          return (
            <div
              key={seat.seat}
              onClick={() => {
                handleSeatSelection(seat, isSelected);
              }}
              className={`h-7 w-7 border-2 rounded-lg cursor-pointer content-center place-items-center  ${
                seat.reserved
                  ? 'border-slate-400 cursor-not-allowed'
                  : 'border-orange-400'
              } ${isSelected && 'bg-orange-400 '}`}
            >
              {seat.reserved && <X size={24} className='text-slate-400' />}
            </div>
          );
        })}
      </div>
      <section className='mt-5 self-start flex flex-col gap-1'>
        <div className='flex items-center'>
          <div className='h-5 w-5 border-2 rounded-md border-orange-400' />
          <p className='ml-3 text-sm text-slate-400 font-medium'>Available</p>
        </div>
        <div className='flex items-center'>
          <div className='h-5 w-5 border-2 rounded-md border-orange-400 bg-orange-400' />
          <p className='ml-3 text-sm text-slate-400 font-medium'>Selected</p>
        </div>
        <div className='flex items-center'>
          <div className='h-5 w-5 border-2 rounded-md border-slate-400 grid place-items-center'>
            <X size={14} className='text-slate-400' />
          </div>
          <p className='ml-3 text-sm text-slate-400 font-medium'>Reserved</p>
        </div>
      </section>
    </section>
  );
};

export default SeatPicker;
