import type { Metadata } from 'next';
import { Krona_One, Poppins } from 'next/font/google';
import '../globals.css';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';

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

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${kronaOne.variable} antialiased bg-slate-900 text-orange-50 flex`}
      >
        <NextTopLoader color='#FB923C' showSpinner={false} />
        <SideBar />
        <MobileNavbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
