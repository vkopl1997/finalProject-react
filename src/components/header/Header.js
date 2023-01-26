import { AppBar,Badge,Box,Button,styled, Toolbar } from '@mui/material'
import React  from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { UserIcon } from './UserIcon'
import { BsCartCheckFill} from 'react-icons/bs'
import { useCartItems } from '../../redux';
import { CartDrawer } from './CartDrawer';

const StyledAppBar = styled(AppBar)(()=>({
    backgroundColor: '#333533',
     padding: '0 0px 0 0px',
     height: '90px',
     width: 'calc(100%)',
     display: 'flex',
    // alignContent: 'center'   
}));

const StyledToolbar = styled(Toolbar)(()=>({
    display: 'flex',
    width: '92%',
    height: '100%',
    margin: '0px auto',
    borderLeft: '1px solid #FFF',
    borderRight: '1px solid #FFF',
    borderBottom: '1px solid #FFF',
}));

const StyledBadge = styled(Badge)(()=>({
    '& .MuiBadge-badge': {
        width: '20px',
        height: '20px',
        color: 'FFF',
        background: '#ef233c',
        top: '2px',
        right: '-3px'
    }
}));
const StyledBox = styled(Box)(()=>({
    display:'flex',
    width:'20%',
    alignItems:'center',
    justifyContent:'right',
    borderLeft: '1px solid #FFF',
    height:'100%',

}));
const StyledBoxLeft = styled(Box)(()=>({
    width:'18%',
    display:'flex',
    alignItems:'center',
    borderRight: '1px solid #FFF',
    justifyContent:'left',
    paddingLeft:'2%',
    height:'100%',
}))

export const Header = () => {
    const cartItems = useCartItems(); 
    const cartItemsQuantity = cartItems.reduce((acc,curr) =>acc + curr.quantity,0); 
    const [ isCartOpen,setIsCartOpen ]   = useState(false)
  return (
    <Box>
        <StyledAppBar>
            <StyledToolbar>
                <StyledBoxLeft>
                <Link style={{
                    color:'#FFF',
                    textDecoration:'none',
                    textTransform:'uppercase',
                    letterSpacing: '2px',
                    fontSize: '22px',
                    fontWeight: 'bolder',
                }} to='/'>Phones.Ge</Link>
                </StyledBoxLeft>
                
                <SearchBar/>
                <StyledBox>
                <UserIcon/>
                <Button onClick={()=>{setIsCartOpen(true)}}>
                    <StyledBadge badgeContent={cartItemsQuantity}>
                        <BsCartCheckFill size={35} style={{color:'FFF'}}/>
                    </StyledBadge>
                </Button>

                </StyledBox>
                
                <CartDrawer isOpen={isCartOpen} onClose={()=>{setIsCartOpen(false)}}/>
            </StyledToolbar>
        </StyledAppBar>
    </Box>
  )
}
