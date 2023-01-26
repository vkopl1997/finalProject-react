import React from 'react';
import { Rating as MuiRating } from '@mui/material';

export const Rating = ({value,isDisabled,onChange}) => {
  return (
    <MuiRating value={value}
     precision={0.5}
     disabled={isDisabled}
     onChange={onChange}/>
  )
}
