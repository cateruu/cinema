import React from 'react';
import { Movie } from '../../types/movies';
import List from './List/List';
import { Paginated } from '../../types/Pagination';

interface Props {
  selectedMovie: Movie;
  movies: Paginated<Movie>;
}

const MoviesList = async ({ selectedMovie, movies }: Props) => {
  return (
    <div>
      {movies.content.length > 0 ? (
        <List movies={movies.content} selectedMovie={selectedMovie} />
      ) : (
        <section>No movies :(</section>
      )}
    </div>
  );
};

export default MoviesList;
