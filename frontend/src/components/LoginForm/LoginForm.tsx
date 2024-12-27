'use client';

import React, { useActionState } from 'react';
import Input from '../Input/Input';
import Link from 'next/link';
import LoadingButton from '../LoadingButton/LoadingButton';
import { signIn } from '../../actions/auth-actions';
import { CornerUpLeft } from 'lucide-react';

const initialState = {
  message: '',
  errors: [],
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className='flex flex-col items-start gap-2'>
      <Link
        href='/'
        className='flex align items-center gap-1 text-sm text-slate-600 mb-3 transition-colors hover:text-orange-50'
      >
        <CornerUpLeft size={12} /> Home
      </Link>
      <Input
        name='username'
        type='username'
        placeholder='admin acc: admin'
        label='Username'
        className='min-w-80'
      />
      <Input
        name='password'
        type='password'
        placeholder='admin acc: admin'
        label='Password'
        className='min-w-80'
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
