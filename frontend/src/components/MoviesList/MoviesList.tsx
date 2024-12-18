import React from 'react';
import { Movie } from '../../types/movies';
import { Paginated } from '../../types/Pagination';

const MoviesList = async () => {
  const resp = await fetch(`${process.env.API_URL}/v1/movies`);

  if (!resp.ok) {
    return <section>Unable to get movies. Please try again...</section>;
  }

  const movies = (await resp.json()) as Paginated<Movie>;

  return (
    <section>
      {movies.content.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))}
    </section>
  );
};

export default MoviesList;
