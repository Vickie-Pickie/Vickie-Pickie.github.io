import React, {
  useState,
  useRef,
} from 'react';
import './PassengerForm.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Select,
  TextField,
  Radio,
  Button,
  IconButton,
} from '@mui/material';
import order from '../../slices/order';

const PassengerForm = ({
  number,
  seat,
  route,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const passengerFormRef = useRef(null);

  const validationSchema = yup.object({
    person: yup.string().required('Выберите пассажира'),
    last_name: yup.string().required('Ввведите фамилию').matches(/^[А-Яа-я]{2,}$/, 'Введите корректную фамилию'),
    first_name: yup.string().required('Ввведите имя').matches(/^[А-Яа-я]{2,}$/, 'Введите корректное имя'),
    patronymic: yup.string().required('Ввведите отчество').matches(/^[А-Яа-я]{2,}$/, 'Введите корректное отчество'),
    gender: yup.string().required('Выберите пол'),
    date_of_birth: yup.string()
      .required('Укажите дату рождения')
      .matches(/^([0123]{1}[0-9]{1})\.([01]{1}[0-9]{1})\.([1-2]{1}[90]{1}[0-9]{2})$/, 'Введите корректную дату'),
    document_type: yup.string().required('Выберите тип документа'),
    document_series: yup.string().when('document_type', (documentType, Yup) => {
      return documentType === 'passport' ? Yup.required('Введите серию').matches(/[0-9]{4}/, 'Неверная серия документа') : Yup.nullable();
    }),
    document_number: yup.string().required('Введите номер').when('document_type', (documentType, Yup) => {
      return documentType === 'passport' ? Yup.matches(/[0-9]{6}/, 'Неверный номер документа') : Yup.matches(/[IXVCML]{3}[А-Я]{2}[0-9]{6}/, 'Неверный номер документа');
    }),
  });

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const { person_info: personInfo } = seat;
  const docInfo = personInfo.document_data.split(' ');

  const formik = useFormik({
    initialValues: {
      person: personInfo.is_adult ? 'adult' : 'children',
      last_name: personInfo.last_name,
      first_name: personInfo.first_name,
      patronymic: personInfo.patronymic,
      gender: personInfo.gender ? 'male' : 'female',
      date_of_birth: personInfo.birthday,
      document_type: personInfo.document_type,
      document_series: docInfo.length === 2 ? docInfo[0] : '',
      document_number: docInfo.length === 2 ? docInfo[1] : docInfo[0],
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(order.actions.savePassengerData({
        data: values,
        routeId: route._id,
        seat,
      }));
      setIsOpen(false);
      handleScroll(passengerFormRef.current);
    },
  });

  const handlePersonChange = (e) => {
    formik.setFieldValue('person', e.target.value);

    if (e.target.value === 'adult') {
      formik.setFieldValue('document_type', 'passport');
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} ref={passengerFormRef}>
      <div className="passenger-form">
        <div className="passenger-form__header">
          <div className="passenger-form__header-add">
            <div className="passenger-form__header-button">
              {
                isOpen ? (
                  <IconButton>
                    <RemoveCircleOutlineIcon onClick={() => setIsOpen(!isOpen)}/>
                  </IconButton>
                )
                  : (
                    <IconButton>
                      <AddCircleOutlineIcon onClick={() => setIsOpen(!isOpen)}/>
                    </IconButton>
                  )
              }
            </div>
            <div className="passenger-form__header-label">{`Пассажир ${number}`}</div>
          </div>
          <div className="passenger-form__header-info">
            {route.from.city.name} &mdash; {route.to.city.name}
          </div>
        </div>
        {
          isOpen && (
            <div className="passenger-form__body">
              <div className="passenger-form__personal-info">
                <Grid container>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Select
                        labelId="person-select"
                        id="person-select"
                        name="person"
                        hiddenLabel
                        value={formik.values.person}
                        onChange={handlePersonChange}
                      >
                        <MenuItem value="adult">Взрослый</MenuItem>
                        <MenuItem value="children">Детский</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop="45px">
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <label
                        className="text-field-label"
                        htmlFor="last_name"
                      >
                        Фамилия
                      </label>
                      <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <label
                        className="text-field-label"
                        htmlFor="first_name"
                      >
                        Имя
                      </label>
                      <TextField
                        fullWidth
                        id="first_name"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <label
                        className="text-field-label"
                        htmlFor="patronymic"
                      >
                        Отчество
                      </label>
                      <TextField
                        fullWidth
                        id="patronymic"
                        name="patronymic"
                        value={formik.values.patronymic}
                        onChange={formik.handleChange}
                        error={formik.touched.patronymic && Boolean(formik.errors.patronymic)}
                        helperText={formik.touched.patronymic && formik.errors.patronymic}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop="45px">
                  <Grid item xs={3}>
                    <FormControl>
                      <FormLabel id="gender">Пол</FormLabel>
                      <RadioGroup
                        row
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Ж" />
                        <FormControlLabel value="male" control={<Radio />} label="М" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <label
                        className="text-field-label"
                        htmlFor="date-of-birth"
                      >
                        Дата рождения
                      </label>
                      <TextField
                        fullWidth
                        id="date-of-birth"
                        hiddenLabel
                        name="date_of_birth"
                        value={formik.values.date_of_birth}
                        onChange={formik.handleChange}
                        placeholder="ДД.ММ.ГГГГ"
                        error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                        helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className="passenger-form__document-info">
                <Grid container spacing={3}>
                  <Grid item xs={formik.values.document_type === 'passport' ? 3 : 6}>
                    <FormControl fullWidth>
                      <label
                        className="text-field-label"
                        htmlFor="document-type-select"
                      >
                        Тип документа
                      </label>
                      <Select
                        labelId="document-type-select"
                        id="document-type-select"
                        hiddenLabel
                        name="document_type"
                        value={formik.values.document_type}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="passport">Паспорт РФ</MenuItem>
                        {
                          formik.values.person === 'children' && <MenuItem value="certificate_of_birth">Свидетельство о рождении</MenuItem>
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  {
                    formik.values.document_type === 'passport' && (
                    <Grid item xs={3}>
                      <FormControl>
                        <label
                          className="text-field-label"
                          htmlFor="passport-series"
                        >
                          Серия
                        </label>
                        <TextField
                          fullWidth
                          id="passport-series"
                          hiddenLabel
                          name="document_series"
                          value={formik.values.document_series}
                          onChange={formik.handleChange}
                          placeholder="1234"
                          error={formik.touched.document_series && Boolean(formik.errors.document_series)}
                          helperText={formik.touched.document_series && formik.errors.document_series}
                        />
                      </FormControl>
                    </Grid>
                    )
                  }
                  <Grid item xs={3}>
                    <FormControl>
                      <label
                        className="text-field-label"
                        htmlFor="passport-number"
                      >
                        Номер
                      </label>
                      <TextField
                        fullWidth
                        id="passport-number"
                        hiddenLabel
                        name="document_number"
                        value={formik.values.document_number}
                        onChange={formik.handleChange}
                        placeholder={formik.values.document_type === 'passport' ? '567890' : 'IIIЯБ123456'}
                        error={formik.touched.document_number && Boolean(formik.errors.document_number)}
                        helperText={formik.touched.document_number && formik.errors.document_number}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <div className="passenger-form__footer">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    '&:hover': {
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </Box>
  );
};

export default PassengerForm;
