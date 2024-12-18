import React, { InputHTMLAttributes } from 'react';

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
}

const Input = ({ type, name, placeholder, label, className }: Props) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className='block pl-3 text-sm text-slate-400 font-bold'
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`bg-slate-950 border-2 border-slate-950 text-sm px-3 py-3 min-w-96 rounded-xl focus:border-orange-400 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
