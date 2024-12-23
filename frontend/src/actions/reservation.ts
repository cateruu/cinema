'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const buyTickets = async (
  tickets: string[],
  scheduleId: string,
  userId: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const payload = {
    tickets: tickets,
    userId: userId,
    scheduleId: scheduleId,
  };

  const resp = await fetch(`${process.env.API_URL}/v1/reservations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error('Unable to buy tickets. Please try again.');
  }

  const data = await resp.json();

  revalidatePath('/');

  return data;
};
