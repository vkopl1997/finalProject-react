import { Typography } from '@mui/material'
import React from 'react'

export const TypographyComp = ({variant = 'outlined',children}) => {
  return (
    <Typography variant={variant}>{children}</Typography>
  )
}
