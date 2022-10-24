import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';

const UIPagination = styled(Pagination)(() => ({
  '&': {
    borderColor: '#C4C4C4',
  },
  '& .MuiPaginationItem-page': {
    color: '#928F94',
  },
  '& .MuiSvgIcon-root': {
    fill: '#928F94',
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: '#FFA800',
    color: '#fff',
    borderColor: '#FFA800',
  },
  '& .MuiPaginationItem-page.Mui-selected:hover': {
    backgroundColor: '#FFA800',
    color: '#fff',
    borderColor: '#FFA800',
  },
  '& .MuiPaginationItem-page:hover': {
    backgroundColor: 'transparent',
    borderColor: '#FFA800',
    color: '#FFA800',
  },
}));

export default UIPagination;
