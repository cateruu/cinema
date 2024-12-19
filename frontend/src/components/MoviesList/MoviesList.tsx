import React from 'react';
import { Movie } from '../../types/movies';
import { Paginated } from '../../types/Pagination';
import List from './List/List';

interface Props {
  initialSelectedMovieId: string | null;
}

const MoviesList = async ({ initialSelectedMovieId }: Props) => {
  const resp = await fetch(`${process.env.API_URL}/v1/movies?direction=ASC`);

  if (!resp.ok) {
    return <section>Unable to get movies. Please try again...</section>;
  }

  const movies = (await resp.json()) as Paginated<Movie>;
  const selectedMovie =
    movies.content.find((movie) => movie.id === initialSelectedMovieId) ||
    movies.content[0];

  return (
    <div>
      {movies.content.length > 0 ? (
        <List movies={movies.content} initialSelectedMovieId={selectedMovie} />
      ) : (
        <section>No movies :(</section>
      )}
    </div>
  );
};

export default MoviesList;
