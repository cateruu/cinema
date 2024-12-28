import React from 'react';

interface Props {
  defaultValue?: string[];
}

const GenreSelect = ({ defaultValue }: Props) => {
  const values = [
    'Action',
    'Horror',
    'Animated',
    'Documentary',
    'Drama',
    'Comedy',
    'Adventure',
    'Thriller',
    'Romance',
    'Musical',
  ];

  return (
    <>
      <label
        htmlFor='genre'
        className='pl-3 text-sm text-slate-400 font-bold flex flex-col -mb-3'
      >
        Genres
        <span className='text-xs text-slate-600'>
          Hold ctrl/command to select multiple
        </span>
      </label>
      <select
        name='genre'
        id='genre'
        multiple
        className='bg-slate-950 p-3 rounded-s-xl outline-none w-full'
        defaultValue={defaultValue}
      >
        {values.map((value) => (
          <option
            key={value}
            value={value}
            className='rounded-lg p-2 focus:bg-orange-400'
          >
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default GenreSelect;
