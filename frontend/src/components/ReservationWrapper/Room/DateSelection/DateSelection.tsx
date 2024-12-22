import React from 'react';
import SelectComponent from '../../../SelectComponent/SelectComponent';
import { TimeSlot } from '../Room';

interface Props {
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  possibleDates: string[];
  timeSlots: TimeSlot;
  setSelectedTimeId: (value: string) => void;
  selectedTimeId: string;
}

const DateSelection = ({
  selectedDate,
  setSelectedDate,
  possibleDates,
  timeSlots,
  selectedTimeId,
  setSelectedTimeId,
}: Props) => {
  return (
    <section className='flex gap-2 items-end'>
      <div>
        <label
          htmlFor='select-component'
          className='text-xs font-medium ml-2 text-slate-400'
        >
          Date
        </label>
        <SelectComponent
          values={possibleDates}
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      {timeSlots[selectedDate]?.map((time) => (
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
  );
};

export default DateSelection;
