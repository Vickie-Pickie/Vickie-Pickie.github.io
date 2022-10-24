import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import './PaymentForm.css';
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  TextField,
  FormHelperText,
} from '@mui/material';
import order from '../../slices/order';
import UIButton from '../ui/UIButton';

const PaymentForm = ({ onPaymentSubmit }) => {
  const dispatch = useDispatch();
  const payerInfo = useSelector((state) => state.order.user);
  const validationSchema = yup.object({
    last_name: yup.string().required('Ввведите фамилию').matches(/^[А-Яа-я]{2,}$/, 'Введите корректную фамилию'),
    first_name: yup.string().required('Ввведите имя').matches(/^[А-Яа-я]{2,}$/, 'Введите корректное имя'),
    patronymic: yup.string().required('Ввведите отчество').matches(/^[А-Яа-я]{2,}$/, 'Введите корректное отчество'),
    phone: yup.string().required('Ввведите телефон').matches(/^\+7[0-9]{10}$/, 'Введите корректный номер телефона'),
    email: yup.string().required('Введите e-mail').email('Введите корректный e-mail'),
    payment_method: yup.string().required('Выберите метод оплаты'),
  });

  const formik = useFormik({
    initialValues: { ...payerInfo },
    validationSchema,
    onSubmit(values) {
      dispatch(order.actions.savePayerData({
        data: values,
      }));
      onPaymentSubmit();
    },
  });

  return (
    <Box component="form" className="payment-form" onSubmit={formik.handleSubmit}>
      <div className="payment-form__body">
        <div className="payment-form__header">Персональные данные</div>
        <div className="payment-form__section">
          <Grid container spacing={2}>
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
                  name="last_name"
                  id="last_name"
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
                  name="patronymic"
                  id="patronymic"
                  value={formik.values.patronymic}
                  onChange={formik.handleChange}
                  error={formik.touched.patronymic && Boolean(formik.errors.patronymic)}
                  helperText={formik.touched.patronymic && formik.errors.patronymic}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container marginTop="45px">
            <Grid item xs={5}>
              <FormControl>
                <label
                  className="text-field-label"
                  htmlFor="phone"
                >
                  Контактный телефон
                </label>
                <TextField
                  name="phone"
                  fullWidth
                  id="phone"
                  placeholder="+791234567890"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container marginTop="45px">
            <Grid item xs={5}>
              <FormControl>
                <label
                  className="text-field-label"
                  htmlFor="email"
                >
                  Email
                </label>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="inbox@mail.ru"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <FormControl
          fullWidth
          error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
        >
          <RadioGroup
            name="payment_method"
            value={formik.values.payment_method}
            onChange={formik.handleChange}
          >
            <div className="payment-form__header">Способы оплаты</div>
            {
              formik.touched.payment_method && Boolean(formik.errors.payment_method) && (
                <FormHelperText error>
                  {formik.errors.payment_method}
                </FormHelperText>
              )
            }
            <div className="payment-form__section">
              <div>
                <FormControlLabel
                  control={<Radio />}
                  label="Онлайн"
                  value="online"
                  sx={{
                    color: '#928F94',
                  }}
                />
              </div>
              <div className="payment-form__payment-system">
                <div>
                  Банковской
                  <div>картой</div>
                </div>
                <div>PayPal</div>
                <div>Visa QIWI Wallet</div>
              </div>
            </div>
            <div className="payment-form__section">
              <FormControlLabel
                control={<Radio />}
                label="Наличными"
                value="cash"
                sx={{
                  color: '#928F94',
                }}
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="order-button-wrapper">
        <UIButton
          type="submit"
          variant="contained"
        >
          Купить билет
        </UIButton>
      </div>
    </Box>
  );
};

export default PaymentForm;
