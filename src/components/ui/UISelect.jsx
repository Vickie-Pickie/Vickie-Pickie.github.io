import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const UISelect = styled(Select)(() => ({
  lineHeight: 0,
  '& .MuiSvgIcon-root': {
    display: 'none',
  },
  '& .MuiSelect-select.MuiInputBase-input': {
    minHeight: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
}));

export default UISelect;
