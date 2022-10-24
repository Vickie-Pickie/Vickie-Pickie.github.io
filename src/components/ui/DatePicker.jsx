import React, { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from './TextField';

const DatePicker = ({
  value,
  onChange,
  minDate,
  error,
}) => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  return (
    <MuiDatePicker
      inputFormat="DD/MM/YYYY"
      open={showDatepicker}
      onClose={() => setShowDatepicker(false)}
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
      }}
      minDate={minDate}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          hiddenLabel
          variant="outlined"
          size="small"
          sx={{
            width: '227px',
          }}
          inputProps={{
            ...params.inputProps,
            placeholder: 'ДД/ММ/ГГГГ',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EventIcon
                  sx={{
                    color: '#E5E5E5',
                  }}
                />
              </InputAdornment>
            ),
          }}
          onClick={() => {
            setShowDatepicker(true);
          }}
        />
      )}
    />
  );
};

export default DatePicker;
