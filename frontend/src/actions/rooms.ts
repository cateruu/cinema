'use server';

import { cookies } from 'next/headers';
import { ErrorResponse } from '../types/errors';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Room } from '../types/room';

export const deleteRoom = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const resp = await fetch(`${process.env.API_URL}/v1/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    return false;
  }

  revalidatePath('/dashboard?section=rooms');

  return true;
};

export const createRoom = async (
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const payload = {
    name: formData.get('name'),
    rows: formData.get('rows'),
    seats: formData.get('seats'),
  };

  const resp = await fetch(`${process.env.API_URL}/v1/rooms`, {
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

  redirect('/dashboard?section=rooms');
};

export const updateRoom = async (
  room: Room | undefined,
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const payload: { [key: string]: string | number | string[] } = {};

  const name = formData.get('name') as string;
  if (name !== null && name !== room?.name) {
    payload['name'] = name;
  }

  const rows = Number(formData.get('rows'));
  if (rows !== null && rows !== room?.rows) {
    payload['rows'] = rows;
  }

  const seats = Number(formData.get('seats'));
  if (seats !== null && seats !== room?.seats) {
    payload['seats'] = seats;
  }

  const resp = await fetch(`${process.env.API_URL}/v1/rooms/${room?.id}`, {
    method: 'PATCH',
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

  redirect('/dashboard?section=rooms');
};
