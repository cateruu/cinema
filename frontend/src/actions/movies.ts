'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ErrorResponse } from '../types/errors';
import { redirect } from 'next/navigation';
import { Movie } from '../types/movies';

interface UploadResponse {
  url: string;
}

export const deleteMovie = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const resp = await fetch(`${process.env.API_URL}/v1/movies/${id}`, {
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

export const createMovie = async (
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const thumbnail = formData.get('thumbnail') as File;

  if (!thumbnail || thumbnail.size === 0) {
    return {
      message: 'No file or empty file provided.',
      errors: [],
    };
  }

  const bytes = await thumbnail.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const thumbnailData = new FormData();
  thumbnailData.append(
    'file',
    new Blob([buffer], { type: thumbnail.type }),
    thumbnail.name
  );

  const respThumbnail = await fetch(`${process.env.API_URL}/v1/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: thumbnailData,
  });

  if (!respThumbnail.ok) {
    const data = (await respThumbnail.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  const data = (await respThumbnail.json()) as UploadResponse;

  const payload = {
    name: formData.get('name'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    ticketPrice: formData.get('price'),
    genre: formData.getAll('genre'),
    thumbnailUrl: data.url,
  };

  const resp = await fetch(`${process.env.API_URL}/v1/movies`, {
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

  redirect('/dashboard');
};

export const updateMovie = async (
  movie: Movie | undefined,
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const payload: { [key: string]: string | number | string[] } = {};

  const thumbnail = formData.get('thumbnail') as File;
  if (thumbnail.size !== 0) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const thumbnailData = new FormData();
    thumbnailData.append(
      'file',
      new Blob([buffer], { type: thumbnail.type }),
      thumbnail.name
    );

    const respThumbnail = await fetch(`${process.env.API_URL}/v1/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: thumbnailData,
    });

    if (!respThumbnail.ok) {
      const data = (await respThumbnail.json()) as ErrorResponse;

      return {
        message: data.message,
        errors: data.errors,
      };
    }

    const data = (await respThumbnail.json()) as UploadResponse;
    payload['thumbnailUrl'] = data.url;
  }

  const name = formData.get('name') as string;
  if (name !== null && name !== movie?.name) {
    payload['name'] = name;
  }

  const description = formData.get('description') as string;
  if (description !== null && description !== movie?.description) {
    payload['description'] = description;
  }

  const duration = Number(formData.get('duration') as string);
  if (duration !== null && duration !== movie?.duration) {
    payload['duration'] = duration;
  }

  const price = Number(formData.get('price') as string);
  if (price !== null && price !== movie?.ticketPrice) {
    payload['ticketPrice'] = price;
  }

  const genre = formData.getAll('genre') as string[];
  payload['genre'] = genre;

  const resp = await fetch(`${process.env.API_URL}/v1/movies/${movie?.id}`, {
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

  redirect('/dashboard');
};
