import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  FormControl,
  MenuItem,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './SearchResults.css';
import SearchFiltersMenu from '../components/search/SearchFiltersMenu';
import LastTicketsWidget from '../components/search/LastTicketsWidget';
import TrainItem from '../components/search/TrainItem';
import { useLazyGetListRoutesQuery } from '../api/routes';
import search from '../slices/search';
import UISelect from '../components/ui/UISelect';
import UIPagination from '../components/ui/UIPagination';

const SearchResults = () => {
  const [fetchRoutes, { data, isFetching }] = useLazyGetListRoutesQuery();
  const request = useSelector((state) => state.search.searchRequest);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const perPageOption = [5, 10, 20];

  const totalPages = data ? Math.ceil(data.total_count / request.limit) : 0;
  const currentPage = request.offset / request.limit + 1;

  const handleSortChange = (event) => {
    dispatch(search.actions.setSearchRequest({
      sort: event.target.value,
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      sort: event.target.value,
    });
  };

  const handleLimitChange = (limit) => {
    dispatch(search.actions.setSearchRequest({
      limit,
      offset: 0,
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      limit,
      offset: 0,
    });
  };

  const handlePageChange = (e, page) => {
    const offset = request.limit * (page - 1);
    dispatch(search.actions.setSearchRequest({
      offset,
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      offset,
    });
  };

  useEffect(() => {
    dispatch(search.actions.setSearchRequest(Object.fromEntries(searchParams.entries())));
  }, []);

  useEffect(() => {
    fetchRoutes(request);
  }, [request]);

  return (
    <>
      <aside className="side-bar">
        <SearchFiltersMenu />
        <LastTicketsWidget />
      </aside>
      <section className="main-body">
        {
          !data || isFetching
            ? (<div className="circularProgress-wrap"><CircularProgress /></div>)
            : (
              <>
                <div className="sr-items-nav">
                  <div className="sr-items-nav__row">
                    <div className="sr-items-nav__total">
                      {
                        `найдено ${data.total_count}`
                      }
                    </div>
                    <div className="sr-items-nav__filters">
                      <div className="sr-items-nav__sort">
                        <div className="sr-items-nav__sort-label">сортировать по:</div>
                        <div className="sr-items-nav_sort-select">
                          <FormControl sx={{ minWidth: 120 }} size="small">
                            <UISelect
                              hiddenLabel
                              labelId="sort-select"
                              id="sort-select"
                              value={request.sort}
                              onChange={handleSortChange}
                            >
                              <MenuItem value="price_min">по стоимости</MenuItem>
                              <MenuItem value="date">по времени</MenuItem>
                              <MenuItem value="duration">по длительности</MenuItem>
                            </UISelect>
                          </FormControl>
                        </div>
                      </div>
                      <div className="sr-items-nav__pagination">
                        <div className="sr-items-nav__pagination-label">показывать по:</div>
                        {
                          perPageOption.map((option) => {
                            let sortLimitClass = 'sr-items-nav__pagination-count';

                            if (Number(request.limit) === option) {
                              sortLimitClass += ' pagination-count_active';
                            }
                            return (
                              <div
                                key={option}
                                className={sortLimitClass}
                                onClick={() => handleLimitChange(option)}
                              >
                                {option}
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sr-list">
                  {
                    data.items.map((item) => (
                      <TrainItem
                        key={`${item.arrival?._id} ${item.departure._id}`}
                        item={item}
                      />
                    ))
                  }
                </div>
                <div className="pagination">
                  <UIPagination
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    count={totalPages}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )
        }
      </section>
    </>
  );
};

export default SearchResults;
