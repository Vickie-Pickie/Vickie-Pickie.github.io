import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  InputAdornment,
} from '@mui/material';
import { Room as RoomIcon } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from './TextField';
import { useLazyGetListCitiesQuery } from '../../api/city';
import debounce from '../../utils/debounce';

const FormAutocomplete = ({
  value,
  placeholder,
  onChange,
  error,
}) => {
  const [fetchCities, { data }] = useLazyGetListCitiesQuery();
  const [inputValue, setInputValue] = useState('');

  const delayedFetchCities = useMemo(() => debounce(fetchCities, 200), [fetchCities]);

  const onInputChange = (e, newValue, reason) => {
    if (reason === 'input') {
      setInputValue(newValue);
      if (newValue) {
        delayedFetchCities(newValue);
      } else {
        onChange(null);
      }
    }
  };

  const handleChange = (e, val) => {
    setInputValue(val.name);
    onChange(val);
  };

  useEffect(() => {
    setInputValue(value?.name || '');
    if (value?.name) {
      delayedFetchCities(value.name);
    }
  }, [value]);

  return (
    <Autocomplete
      id="cities-select"
      sx={{
        width: '227px',
      }}
      forcePopupIcon={false}
      disableClearable
      options={data || []}
      getOptionLabel={(option) => option?.name || ''}
      value={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={handleChange}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option._id}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          hiddenLabel
          placeholder={placeholder}
          variant="outlined"
          size="small"
          inputProps={{
            ...params.inputProps,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <RoomIcon
                  sx={{
                    color: '#E5E5E5',
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default FormAutocomplete;
