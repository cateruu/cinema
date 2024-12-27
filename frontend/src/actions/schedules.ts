'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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
