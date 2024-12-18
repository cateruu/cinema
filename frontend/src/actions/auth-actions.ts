'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface LoginResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

interface ErrorResponse {
  status: string;
  message: string;
  errors: string[];
  timestamp: string;
}

export const signIn = async (
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const payload = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const resp = await fetch(`${process.env.API_URL}/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!resp.ok) {
    const data = (await resp.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  const data = (await resp.json()) as LoginResponse;

  const cookieStore = await cookies();

  cookieStore.set('token', data.token, {
    httpOnly: true,
    expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    path: '/',
  });

  redirect('/');
};

export const signUp = async (
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const registerPayload = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const registerResp = await fetch(`${process.env.API_URL}/v1/auth/register`, {
    method: 'POST',
    body: JSON.stringify(registerPayload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!registerResp.ok) {
    const data = (await registerResp.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  const loginPayload = {
    username: registerPayload.username,
    password: registerPayload.password,
  };

  const loginResp = await fetch(`${process.env.API_URL}/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(loginPayload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!loginResp.ok) {
    const data = (await loginResp.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  const data = (await loginResp.json()) as LoginResponse;

  const cookieStore = await cookies();

  cookieStore.set('token', data.token, {
    httpOnly: true,
    expires: new Date().getTime() + 24 * 60 * 60 * 1000,
    path: '/',
  });

  redirect('/');
};

export const signOut = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('token');
  redirect('/');
};
