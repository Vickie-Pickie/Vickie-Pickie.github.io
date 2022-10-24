import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './LastTicketsWidget.css';
import LastTicketItem from './LastTicketItem';
import { useLazyGetLastTicketsQuery } from '../../api/routes';

const LastTicketsWidget = () => {
  const [fetchLastTickets, { data, isFetching }] = useLazyGetLastTicketsQuery();

  useEffect(() => {
    fetchLastTickets();
  }, []);

  return (
    <section className="last-tickets-widget">
      <div className="last-tickets__title">Последние билеты</div>
      {
        !data || isFetching ? <CircularProgress />
          : data.map((item) => <LastTicketItem lastTicket={item} key={item.departure._id} />)
      }
    </section>
  );
};

export default LastTicketsWidget;
