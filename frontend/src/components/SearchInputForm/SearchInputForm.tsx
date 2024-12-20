'use client';

import { Search } from 'lucide-react';
import React from 'react';

interface Props {
  placeholder?: string;
}

const SearchInputForm = ({ placeholder }: Props) => {
  return (
    <form id='search-form' className='w-full py-6 pr-8 flex'>
      <input
        type='text'
        name='search'
        placeholder={placeholder}
        className={`bg-slate-950 border-2 border-slate-950 text-sm p-3 w-full rounded-xl rounded-br-none rounded-tr-none focus:border-orange-400 focus:outline-none`}
      />
      <button className='p-3 bg-slate-700 rounded-tr-xl rounded-br-xl'>
        <Search size={24} />
      </button>
    </form>
  );
};

export default SearchInputForm;
