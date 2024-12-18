import SearchHeader from '../../components/SearchHeader/SearchHeader';
import MoviesList from '../../components/MoviesList/MoviesList';

const HomePage = async () => {
  return (
    <main className='font-[family-name:var(--font-poppins)] w-full'>
      <SearchHeader />
      <div className='flex pr-8'>
        <MoviesList />
      </div>
    </main>
  );
};

export default HomePage;
