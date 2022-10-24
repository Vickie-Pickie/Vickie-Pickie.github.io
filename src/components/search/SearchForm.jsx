import React from 'react';
import { useDispatch } from 'react-redux';
import './SearchForm.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  IconButton,
} from '@mui/material';
import { Cached as CachedIcon } from '@mui/icons-material';
import DatePicker from '../ui/DatePicker';
import FormAutocomplete from '../ui/FormAutocomplete';
import search from '../../slices/search';

const SearchForm = ({ orientation = '' }) => {
  const validationSchema = yup.object({
    cityFrom: yup.object({
      _id: yup.string().required(),
      name: yup.string().required(),
    }).nullable().required('Выберите город отправления'),
    cityTo: yup.object({
      _id: yup.string().required(),
      name: yup.string().required(),
    }).nullable().required('Выберите город прибытия'),
    dateFrom: yup.date()
      .nullable()
      .required('Выберите дату'),
    dateTo: yup.date()
      .nullable()
      .when('dateFrom', (dateFrom, Yup) => dateFrom && Yup.min(dateFrom, 'Обратная дата должна быть позже даты отправления')),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      dateFrom: null,
      dateTo: null,
      cityFrom: null,
      cityTo: null,
    },
    validationSchema,
    onSubmit: ({
      cityFrom,
      cityTo,
      dateTo,
      dateFrom,
    }, { resetForm }) => {
      const request = {
        from_city_id: cityFrom._id,
        from_city_name: cityFrom.name,
        to_city_id: cityTo._id,
        to_city_name: cityTo.name,
        date_start: dateFrom.format('YYYY-MM-DD'),
      };

      if (dateTo) {
        request.date_end = dateTo.format('YYYY-MM-DD');
      }

      dispatch(search.actions.setSearchRequest(request));
      const params = new URLSearchParams(request);
      navigate(`/search-results?${params.toString()}`);
      resetForm();
    },
  });

  const handleCitySwap = () => {
    formik.setFieldValue('cityFrom', formik.values.cityTo);
    formik.setFieldValue('cityTo', formik.values.cityFrom);
  };

  let searchFormClassName = 'search-form';
  searchFormClassName += orientation ? ` search-form_${orientation}` : '';

  return (
    <div className={searchFormClassName}>
      <form onSubmit={formik.handleSubmit}>
        <div className="search-form__content">
          <div className="search-form__body">
            <div className="search-form__row">
              <div className="search-form__label">Направление</div>
              <div className="search-form__fields">
                <FormAutocomplete
                  error={formik.errors.cityFrom}
                  value={formik.values.cityFrom}
                  placeholder="Откуда"
                  onChange={(val) => formik.setFieldValue('cityFrom', val)}
                />
                <IconButton
                  onClick={handleCitySwap}
                >
                  <CachedIcon
                    sx={{
                      color: '#E5E5E5',
                      mx: '15px',
                    }}
                  />
                </IconButton>
                <FormAutocomplete
                  value={formik.values.cityTo}
                  error={formik.errors.cityTo}
                  placeholder="Куда"
                  onChange={(val) => formik.setFieldValue('cityTo', val)}
                />
              </div>
            </div>
            <div className="search-form__row search-form__row_dates">
              <div className="search-form__label">Дата</div>
              <div className="search-form__fields">
                <DatePicker
                  value={formik.values.dateFrom}
                  error={formik.errors.dateFrom}
                  onChange={(val) => formik.setFieldValue('dateFrom', val)}
                />
                <DatePicker
                  value={formik.values.dateTo}
                  error={formik.errors.dateTo}
                  onChange={(val) => formik.setFieldValue('dateTo', val)}
                  minDate={formik.values.dateFrom}
                />
              </div>
            </div>
          </div>
          <div className="search-form__button">
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '227px',
                '&:hover': {
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                },
              }}
            >
              Найти билеты
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
