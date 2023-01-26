import { MenuItem, Select,styled } from '@mui/material';
import React from 'react';



const StyledSelect = styled(Select)(()=>({
  borderBottom: '1px solid #FFF',
  width:'30%',
  color: 'gray',
  fontWeight:'bolder',
  marginBottom: '20px',
  padding: '10px'
}))

export const Sort = ({sort='',changeSort,changePage}) => {
  return (
    <StyledSelect variant="standard" value={sort} onChange={(e)=>{   
        changeSort('sort',e.target.value);
        changePage('page',1);
      }}>
        <MenuItem value='price,desc'>price: descending order</MenuItem>
        <MenuItem value='price,asc'>price: ascending order</MenuItem>
        <MenuItem value='name,desc'>name: descending</MenuItem>
        <MenuItem value='name,asc'>name: ascending</MenuItem>
    </StyledSelect>
  )
}
