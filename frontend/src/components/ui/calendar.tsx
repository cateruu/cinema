'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'p-3 bg-slate-950 rounded-xl border-2 border-slate-800',
        className
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-orange-50',
        nav: 'space-x-1 flex items-center text-orange-50',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-orange-50 rounded-md w-9 font-normal text-[0.8rem] dark:text-orange-50',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-orange-50 text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-950 [&:has([aria-selected])]:bg-slate-950 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-slate-600 text-orange-50 hover:bg-slate-600 hover:text-orange-50 focus:bg-slate-600 focus:text-orange-50 dark:bg-slate-800 dark:text-orange-50 dark:hover:bg-slate-800 dark:hover:text-orange-50 dark:focus:bg-slate-50 dark:focus:text-orange-50',
        day_today:
          'bg-slate-900 text-orange-50 dark:bg-slate-800 dark:text-orange-50',
        day_outside:
          'day-outside text-slate-600 aria-selected:bg-slate-800 aria-selected:text-orange-50 dark:text-orange-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-orange-50',
        day_disabled: 'text-orange-50 opacity-50 dark:text-orange-50',
        day_range_middle:
          'aria-selected:bg-slate-100 aria-selected:text-orange-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-orange-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
