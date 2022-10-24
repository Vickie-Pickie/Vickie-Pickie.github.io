import React from 'react';
import './LastTicketItem.css';
import WifiIcon from '@mui/icons-material/Wifi';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { formatPrice } from '../../utils/train';

const LastTicketItem = ({ lastTicket }) => {
  return (
    <div className="last-ticket">
      <div className="last-ticket__row">
        <div className="last-ticket__cities">
          <span>{lastTicket.departure.from.city.name}</span>
          <span>{lastTicket.departure.to.city.name}</span>
        </div>
      </div>
      <div className="last-ticket__row">
        <div className="last-ticket__railway-stations">
          <span>{lastTicket.departure.from.railway_station_name}</span>
          <span>{lastTicket.departure.to.railway_station_name}</span>
        </div>
      </div>
      <div className="last-ticket__row">
        <div className="last-ticket__info">
          <div className="last-ticket__info-options">
            {
              lastTicket.departure.have_wifi && <WifiIcon fontSize="small" />
            }
            {
              lastTicket.departure.have_air_conditioning && <AcUnitIcon fontSize="small" />
            }
            {
              lastTicket.departure.is_express && <RocketLaunchIcon fontSize="small" />
            }
          </div>
          <div className="last-ticket__info-summery">
            от
            <span className="last-ticket__info-price">{formatPrice(lastTicket.departure.min_price)}</span>
            <span className="last-ticket__info-currency">₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastTicketItem;
