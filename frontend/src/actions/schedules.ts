'use server';

import { ErrorResponse } from '@/types/errors';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const deleteSchedule = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const resp = await fetch(`${process.env.API_URL}/v1/schedule/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    return false;
  }

  revalidatePath('/dashboard');

  return true;
};

export const createSchedule = async (
  date: Date | undefined,
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const hour = formData.get('hour') as string;
  const minute = formData.get('minute') as string;

  const errors: string[] = [];
  if (+hour <= 0 || +hour > 24) {
    errors.push('Invalid hour provided');
  }

  if (+minute <= 0 || +minute > 60) {
    errors.push('Invalid minute provided');
  }

  if (errors.length > 0) {
    return {
      message: 'Validation failed',
      errors: errors,
    };
  }

  date?.setHours(+hour);
  date?.setMinutes(+minute);

  const payload = {
    playingTime: date,
    movieId: formData.get('movie'),
    roomId: formData.get('room'),
  };

  const resp = await fetch(`${process.env.API_URL}/v1/schedule`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  redirect('/dashboard?section=schedules');
};
