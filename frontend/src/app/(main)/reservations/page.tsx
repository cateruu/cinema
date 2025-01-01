import React from 'react';
import { cookies } from 'next/headers';
import { verifySession } from '@/actions/verifySession';
import { Reservation } from '@/types/reservation';
import Ticket from '@/components/Ticket/Ticket';

const ReservationPage = async () => {
  const user = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const resp = await fetch(
    `${process.env.API_URL}/v1/users/${user?.id}/reservations`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (!resp.ok) {
    return 'Unable to get user reservations.';
  }

  const tickets = (await resp.json()) as Reservation[];

  return (
    <main className='font-[family-name:var(--font-poppins)] w-full h-full p-3 lg:ml-20 lg:p-8 xl:ml-0'>
      {!user && <p>Login to see your reservations.</p>}
      {user && user.valid && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            movieName={ticket.movieName}
            playingTime={new Date(ticket.playingTime)}
            price={ticket.price}
            roomName={ticket.roomName}
            thumbnailUrl={ticket.thumbnailUrl}
            tickets={ticket.tickets}
          />
        ))
      ) : (
        <p>You don&apos;t have any reservations made.</p>
      )}
    </main>
  );
};

export default ReservationPage;
