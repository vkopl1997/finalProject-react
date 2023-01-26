import { styled } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const StyledBox = styled(Box)(()=>({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '26%',
  fontWeight: 'bolder',
  fontSize: '20px',
  letterSpacing: '2px',
  paddingTop: '47px',
  color: '#adb5bd'
}))

export const SideBarHeader = () => {
  return (
    <StyledBox>Categories</StyledBox>
  )
}
