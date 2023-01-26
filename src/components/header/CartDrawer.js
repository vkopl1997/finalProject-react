import { Drawer,styled,Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { saveCart, useCartItems, useUserInfo } from '../../redux';
import { Typography } from '../shared';
import { clearCart } from '../../redux';

const StyledBox = styled(Box)(()=>({
    width:'100%',
    display: 'block',
    justifyContent: 'center',
    margin: '10px 0'

}));

const StyledDrawer = styled(Drawer)(()=>({
    '.MuiDrawer-paper':{
        background: '#333533',
        minWidth:'350px',
        borderLeft: '1px solid #FFF',
        color: 'gray',
        fontWeight: 'bolder',
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

export const CartDrawer = ({isOpen,onClose}) => {
    const cartItems =  useCartItems();
    const userInfo = useUserInfo();
    const dispatch = useDispatch()
  return (
    <StyledDrawer open={isOpen} onClose={onClose} anchor='right' sx={{}}>
        {cartItems.map((item)=>{
            const { product, quantity } = item;
            const { name,price,_id } =product;
            return (
                <StyledBox key={_id} >
                    <Typography>{name}:</Typography>
                    <Typography>{quantity} X </Typography>
                    <Typography>total Price {price * quantity} $</Typography>                    
                </StyledBox>
            );
        })}
        <StyledButton onClick={()=>{
            dispatch(clearCart());
            dispatch(saveCart({userId: userInfo?._id,cartItems:[]}))
        }}>clear cart</StyledButton>
        { userInfo &&<StyledButton onClick={()=>{
            dispatch(saveCart({userId: userInfo?._id, cartItems}))
        }}>save cart</StyledButton>}


    </StyledDrawer>
  )
}
