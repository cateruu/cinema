import type { Metadata } from 'next';
import { Krona_One, Poppins } from 'next/font/google';
import '../globals.css';
import SideBar from '../../components/SideBar/SideBar';
import { UserProvider } from '../../context/UserContext';
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const kronaOne = Krona_One({
  variable: '--font-krona-one',
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cinema MNGMT',
  description: 'Cinema Management app.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${kronaOne.variable} antialiased bg-slate-900 text-orange-50 flex`}
      >
        <UserProvider>
          <NextTopLoader color='#FB923C' showSpinner={false} />
          <SideBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
