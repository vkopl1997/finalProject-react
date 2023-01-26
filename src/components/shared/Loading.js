import React from 'react'
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
export const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
