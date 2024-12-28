'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'default'}
          className={cn(
            'max-w-96 w-full justify-start text-left font-medium text-base',
            !date && 'text-muted-foreground'
          )}
          size={'lg'}
          id='date'
          name='date'
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 border-0 rounded-xl bg-slate-800'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
