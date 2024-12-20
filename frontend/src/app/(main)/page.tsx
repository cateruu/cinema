import SearchHeader from '../../components/SearchHeader/SearchHeader';
import MoviesList from '../../components/MoviesList/MoviesList';
import ReservationWrapper from '../../components/ReservationWrapper/ReservationWrapper';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const selectedMovieId = searchParams.selectedMovie;

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full'>
      <SearchHeader />
      <div className='flex pr-8 relative'>
        <MoviesList initialSelectedMovieId={selectedMovieId || null} />
        <ReservationWrapper selectedMovieId={selectedMovieId || null} />
      </div>
    </main>
  );
};

export default HomePage;
