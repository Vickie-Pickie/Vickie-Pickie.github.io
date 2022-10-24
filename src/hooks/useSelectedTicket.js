import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  useEffect,
  useMemo,
} from 'react';
import { useLazyGetListRoutesQuery } from '../api/routes';
import search from '../slices/search';

const useSelectedTicket = () => {
  const [fetchRoutes, { data, isFetching }] = useLazyGetListRoutesQuery();
  const request = useSelector((state) => state.search.searchRequest);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (request.from_city_id) {
      fetchRoutes(request);
    }
  }, [request]);

  useEffect(() => {
    dispatch(search.actions.setSearchRequest(Object.fromEntries(searchParams.entries())));
  }, []);

  const ticket = useMemo(() => {
    if (!data) {
      return null;
    }

    return data.items.find((item) => {
      if (item.departure._id !== searchParams.get('departure_id')) {
        return false;
      }
      return !searchParams.has('arrival_id') || searchParams.get('arrival_id') === item.arrival._id;
    });
  }, [data]);

  return {
    isFetching,
    data,
    ticket,
  };
};

export default useSelectedTicket;
