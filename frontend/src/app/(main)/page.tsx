export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserSession {
  valid: boolean;
  username: string;
  roles: string[];
}

const Home = async () => {
  return <main className='font-[family-name:var(--font-poppins)]'>ehe</main>;
};

export default Home;
