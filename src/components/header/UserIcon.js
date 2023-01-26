import React from 'react'
import { Box } from '@mui/system'
import { Avatar, Button, IconButton, Menu,MenuItem, styled } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, useUserInfo ,setSelectedProduct} from '../../redux';
import { getUserInitials, isUserAdmin } from '../../application/';
import { useDispatch } from 'react-redux';

const StyledMenu = styled(Menu)(()=>({
    '.MuiMenu-list	':{
        background: '#333533',
        border:'1px solid #FFF',
        minWidth:'250px',
        display:'flex'
    }
}));

const StyledButton = styled(Button)(()=>({
    marginTop:'30px',
    border: '1px solid #FFF',
    borderRadius: '16px',
    padding: '6px 18px ',
    fontSize: '12px',
    color: '#FFF',
    margin:'2px'
  }));

export const UserIcon = () => {
    const [anchor,setAnchor] = useState(null);
    const handleClose = () =>{
        setAnchor(null)
    }
    const userInfo = useUserInfo();
    const navigate =useNavigate();
    const dispatch = useDispatch()
  return (
    <Box>
        <IconButton onClick={(e)=>{
            setAnchor(e.currentTarget)
        }}>
            <Avatar 
            variant="square"
             sx={{ width: 35, height: 35,bgcolor: '#2C2C2C',border:'1px solid #FFF' }}>
            {getUserInitials(userInfo?.firstName,userInfo?.lastName)}</Avatar>
        </IconButton>
        <Box>
            <StyledMenu 
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            open={Boolean(anchor)}
             onClose={handleClose}
            >
              {!!userInfo && (
                <MenuItem>
                    <StyledButton onClick={()=>dispatch(logoutUser())}>logout</StyledButton>
                    {/* <Button>profile</Button> */}
                </MenuItem>
                )}
                {isUserAdmin(userInfo) && 
                <MenuItem>
                    <StyledButton onClick={()=>{
                        dispatch(setSelectedProduct([]));
                        navigate('/products/new')
                        }}>add product</StyledButton>
                </MenuItem>
                }
                {!userInfo && (
                    <MenuItem>
                        <StyledButton onClick={()=>{
                        navigate('/login')
                        }}>login</StyledButton>
                        <StyledButton onClick={()=>{
                        navigate('/register')
                        }}>register</StyledButton>
                    </MenuItem>
                )}    
            </StyledMenu>
        </Box>
    </Box>
  )
}
