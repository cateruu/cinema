'use client';

import React, { useState } from 'react';
import { Schedule } from '../../../types/schedule';
import SelectComponent from '../../SelectComponent/SelectComponent';
import { formatDate } from '../../../utils/formatDate';
import { formatTime } from '../../../utils/formatTime';

interface TimeSlot {
  [key: string]: {
    id: string;
    time: string;
  }[];
}

interface Props {
  schedules: Schedule[];
}

const Room = ({ schedules }: Props) => {
  const timeSlots: TimeSlot = {};
  schedules.forEach((schedule) => {
    const playingTime = new Date(schedule.playingTime);
    const key = formatDate(playingTime);

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

  const possibleDates = Object.keys(timeSlots);
  const [selectedDate, setSelectedDate] = useState(possibleDates[0] || '');
  const [selectedTimeId, setSelectedTimeId] = useState(
    timeSlots[selectedDate][0].id
  );

  console.log(selectedTimeId);

  return (
    <section className='w-full p-3 bg-slate-950 rounded-xl'>
      <section className='flex gap-2 items-end'>
        <div>
          <p className='text-xs font-medium ml-2 text-slate-400'>Date</p>
          <SelectComponent
            values={possibleDates}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
        {timeSlots[selectedDate].map((time) => (
          <button
            key={time.id}
            onClick={() => setSelectedTimeId(time.id)}
            className={`h-11 bg-slate-950 rounded-xl border-2 border-slate-800 p-2 outline-none font-medium transition-colors hover:border-orange-600 ${
              selectedTimeId === time.id && '!border-orange-400'
            }`}
          >
            {time.time}
          </button>
        ))}
      </section>
    </section>
  );
};

export default Room;
