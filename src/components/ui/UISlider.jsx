import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

const UISlider = styled(Slider)(() => ({
  height: 19,
  width: '100%',
  borderRadius: 8,
  '& .MuiSlider-rail': {
    backgroundColor: 'transparent',
    border: '1px solid #C4C4C4',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-markLabel': {
    top: 40,
  },
  '& .MuiSlider-mark': {
    display: 'none',
  },
  '& .MuiSlider-valueLabel': {
    top: 55,
    backgroundColor: 'unset',
    color: '#E5E5E5',
    fontWeight: 400,
    '&:before': {
      display: 'none',
    },
  },
}));

export default UISlider;
