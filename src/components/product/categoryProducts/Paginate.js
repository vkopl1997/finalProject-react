import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export const Paginate = ({totalPages,currentPage,changePage,queryKey}) => {
  return (
    <Pagination 
      shape="rounded"
      variant="outlined"
      size="large"
      color='primary'
      count={totalPages}
      page= {+currentPage}
      onChange={(_,value)=>{
      changePage(queryKey,value)

    }}
    />
  )
};
