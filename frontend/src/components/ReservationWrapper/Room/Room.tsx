'use client';

import React, { useEffect, useRef, useState } from 'react';
import DateSelection from './DateSelection/DateSelection';
import SeatPicker from './SeatPicker/SeatPicker';
import { Schedule } from '@/types/schedule';
import { formatScheduleDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';
import {
  ReservationActionTypes,
  useReservationDispatch,
} from '@/context/ReservationContext';

export interface TimeSlot {
  [key: string]: {
    id: string;
    time: string;
  }[];
}

interface Props {
  schedules: Schedule[];
  selectedMovieId: string;
}

const Room = ({ schedules, selectedMovieId }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timeSlots: TimeSlot = {};
  schedules.forEach((schedule) => {
    const playingTime = new Date(schedule.playingTime);
    const key = formatScheduleDate(playingTime);

    if (timeSlots[key]) {
      timeSlots[key].push({
        id: schedule.id,
        time: formatTime(playingTime),
      });
    } else {
      timeSlots[key] = [
        {
          id: schedule.id,
          time: formatTime(playingTime),
        },
      ];
    }
  });

  for (const value of Object.values(timeSlots)) {
    value.sort((a, b) => {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;

      return 0;
    });
  }

  const possibleDates = Object.keys(timeSlots);
  const [selectedDate, setSelectedDate] = useState(possibleDates[0] || '');
  const defaultTimeId = timeSlots[selectedDate]?.[0].id;
  const [selectedTimeId, setSelectedTimeId] = useState(defaultTimeId);
  const prevMovieId = useRef(selectedMovieId);

  useEffect(() => {
    if (prevMovieId.current !== selectedMovieId) {
      const date = possibleDates[0] || '';
      setSelectedDate(date);
      setSelectedTimeId(timeSlots[date]?.[0].id);
      prevMovieId.current = selectedMovieId;
    }
  }, [defaultTimeId, possibleDates, selectedMovieId, timeSlots]);

  const dispatch = useReservationDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: ReservationActionTypes.SET_SCHEDULE,
        payload:
          schedules.find((schedule) => schedule.id === selectedTimeId) ||
          schedules[0],
      });
    }
  }, [dispatch, schedules, selectedTimeId]);

  const selectedSchedule =
    schedules.find((schedule) => schedule.id === selectedTimeId) ||
    schedules[0];

  return (
    <section className='w-full p-3 bg-slate-950 rounded-xl lg:min-w-[500px]'>
      {schedules.length > 0 ? (
        <>
          <DateSelection
            possibleDates={possibleDates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTimeId={selectedTimeId}
            setSelectedTimeId={setSelectedTimeId}
            timeSlots={timeSlots}
          />
          <SeatPicker selectedSchedule={selectedSchedule} />
        </>
      ) : (
        <div>No available schedule for this movie.</div>
      )}
    </section>
  );
};

export default Room;
