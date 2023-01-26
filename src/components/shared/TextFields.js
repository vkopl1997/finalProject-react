import { TextField, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)(()=>({
  '& 	.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
    border: '1px solid #FFF',
    color: '#FFF !important'
 },
 '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
    color: '#FFF'
 },
 '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
  borderColor: '#FFF',
 },
 '& .MuiFormControl-root-MuiTextField-root .MuiFormLabel-root-MuiInputLabel-root':{
     color: '#FFF !important' 
 }
}))

export const TextFieldComponent = ({name, label, value, onChange, error}) => {
  return (
    <StyledTextField
      variant='outlined'
      margin='dense'
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={<Typography component='span' variant='body2'>
        {error}
      </Typography>}
    /> 
  )
};
