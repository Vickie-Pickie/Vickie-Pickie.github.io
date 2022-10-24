import { styled } from '@mui/material/styles';
import { TextField as MuiTextField } from '@mui/material';

const TextField = styled(MuiTextField)(() => ({
  '& .MuiInputBase-root': {
    background: '#ffffff',
  },
}));

export default TextField;
