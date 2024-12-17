import type { Metadata } from 'next';
import { Krona_One, Poppins } from 'next/font/google';
import '../globals.css';

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
  title: 'Sign in to Cinema MNGMT app',
  description: 'Sign in page for Cinema Management app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${kronaOne.variable} antialiased bg-slate-900 text-orange-50`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
