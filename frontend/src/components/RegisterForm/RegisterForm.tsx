'use client';

import React, { useActionState } from 'react';
import Input from '../Input/Input';
import Link from 'next/link';
import LoadingButton from '../LoadingButton/LoadingButton';
import { signUp } from '../../actions/auth-actions';

const initialState = {
  message: '',
  errors: [],
};

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className='flex flex-col items-start gap-2'>
      <Input
        name='username'
        type='username'
        placeholder='Dawid Jasper'
        label='Username'
      />
      <Input
        name='email'
        type='email'
        placeholder='dawid@jasper.com'
        label='Email'
      />
      <Input name='password' type='password' label='Password' />
      <div className='w-full'>
        <LoadingButton text='Sign Up' isLoading={isPending} />
        <p className='text-sm text-center mt-1 text-slate-400'>
          Already have an account?{' '}
          <Link href='/login' className='text-orange-400'>
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

export default RegisterForm;
