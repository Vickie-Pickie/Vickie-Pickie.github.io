import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const UIButton = styled(Button)(() => ({
  padding: '14px 55px',
  backgroundColor: '#FFA800',
  borderRadius: 5,
  color: '#fff',
  '&:hover': {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}));

export default UIButton;
