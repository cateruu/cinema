'use client';

import React from 'react';
import Image from 'next/image';
import { Movie } from '../../../types/movies';
import { useReservationModal } from '../../../context/ReservationModalContext';

interface Props {
  movie: Movie;
}

const SelectedMovie = ({ movie }: Props) => {
  const state = useReservationModal();

  const handleOpenReservationModal = () => {
    state?.setIsOpen(true);
  };

  return (
    <div
      id='selected-movie'
      className='rounded-xl overflow-hidden relative aspect-video'
    >
      <Image
        src={movie.thumbnailUrl}
        alt={`${movie.name} poster`}
        width={500}
        height={500}
        className='aspect-video object-cover w-full'
        priority
      />
      <div className='absolute top-0 left-0 bg-gradient-to-t from-[#020617] to-[#D9D9D900] w-full h-full flex p-3 items-end gap-3'>
        <div className='flex flex-col '>
          <p className='font-medium sm:text-2xl'>{movie.name}</p>
          <div className='flex flex-col text-slate-400 text-sm sm:flex-row sm:gap-2 sm:text-base'>
            {movie.genre.map((genre) => (
              <p key={genre}>
                {genre.slice(0, 1).toUpperCase() + genre.slice(1)}
              </p>
            ))}
          </div>
        </div>
        <p className='text-xs max-h-14 line-clamp-3 hover:line-clamp-none hover:max-h-fit md:text-sm'>
          {movie.description}
        </p>
      </div>
      <button
        onClick={handleOpenReservationModal}
        className='absolute top-2 right-2 py-3 px-6 bg-orange-400 rounded-lg font-bold text-sm shadow-sm shadow-slate-500 lg:hidden'
      >
        Buy tickets
      </button>
    </div>
  );
};

export default SelectedMovie;
