'use client';

import React, { useActionState } from 'react';
import Input from '../Input/Input';
import Link from 'next/link';
import LoadingButton from '../LoadingButton/LoadingButton';
import { signIn } from '../../app/(clean)/auth-actions';

const initialState = {
  message: '',
  errors: [],
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className='flex flex-col items-start gap-2'>
      <Input
        name='username'
        type='username'
        placeholder='admin acc: admin'
        label='Username'
      />
      <Input
        name='password'
        type='password'
        placeholder='admin acc: admin'
        label='Password'
      />
      <div className='w-full'>
        <LoadingButton text='Sign In' isLoading={isPending} />
        <p className='text-sm text-center mt-1 text-slate-400'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-orange-400'>
            Sign up
          </Link>
        </p>
      </div>
      {state.message && (
        <div className='w-full max-w-96 text-red-400 mt-3 text-sm'>
          <p className='font-bold text-red-600'>{state.message}</p>
          {state.errors.length > 0 && (
            <ul>
              {state.errors.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
