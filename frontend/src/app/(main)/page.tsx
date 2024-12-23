import SearchHeader from '../../components/SearchHeader/SearchHeader';
import MoviesList from '../../components/MoviesList/MoviesList';
import ReservationWrapper from '../../components/ReservationWrapper/ReservationWrapper';
import { Movie } from '../../types/movies';
import { Paginated } from '../../types/pagination';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const selectedMovieId = searchParams.selectedMovie;

  const resp = await fetch(`${process.env.API_URL}/v1/movies?direction=ASC`);

  if (!resp.ok) {
    return 'Unable to get movies. Please try again...';
  }

  const movies = (await resp.json()) as Paginated<Movie>;
  const selectedMovie =
    movies.content.find((movie) => movie.id === selectedMovieId) ||
    movies.content[0];

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full ml-20 xl:ml-0'>
      <SearchHeader />
      <div className='flex pr-8 relative'>
        <MoviesList selectedMovie={selectedMovie} movies={movies} />
        <ReservationWrapper selectedMovie={selectedMovie} />
      </div>
    </main>
  );
};

export default HomePage;
