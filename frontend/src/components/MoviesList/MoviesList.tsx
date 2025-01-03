import React from 'react';
import List from './List/List';
import { Movie } from '@/types/movies';
import { Paginated } from '@/types/paginated';

interface Props {
  selectedMovie: Movie;
  movies: Paginated<Movie>;
}

const MoviesList = async ({ selectedMovie, movies }: Props) => {
  return (
    <div className='w-full'>
      {movies.content.length > 0 ? (
        <List movies={movies.content} selectedMovie={selectedMovie} />
      ) : (
        <section>There are no movies to show.</section>
      )}
    </div>
  );
};

export default MoviesList;
