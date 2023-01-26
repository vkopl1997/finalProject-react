import { Box, Button, Card, CardActions, Grid,styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isUserAdmin } from '../../application';
import { addToCart,
         rateProduct,
         removeFromCart,
         setSelectedProduct,
         useCartItems,
         useUserInfo 
        } from '../../redux';
import {  Rating} from './Rating';

const StyledcardContent = styled(Box)(()=>({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '10px'
}));
const StyledBox = styled(Box)(()=>({
  display: 'flex',
  justifyContent: 'left',
  marginTop: '8px'
}));

const StyledTypography = styled(Typography)(()=>({
  fontWeight:'bolder',
  letterSpacing:'1px'

}));
const StyledButton = styled(Button)(()=>({
  border: '1px solid #FFF',
  borderRadius: '16px',
  padding: '2px 9px ',
  fontSize: '8px',
  color: '#FFF',
  margin:'2px'
}));

const StyledLink = styled(Link)(()=>({
  textDecoration: 'none',
  color: 'gray',
}))

const StyledCart = styled(Card)(()=>({
  paddingLeft: '20px',
  paddingTop: '20px',
  paddingRight:'20px',
  background:'#333533',
  border:'1px solid #FFF',
  borderRadius:'0px'

}));
export const ProductCard = ({name,_id,image,price,description,brand,category,averageRating}) => {
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const cartItems = useCartItems();
  const isProductInCart = cartItems?.find((item)=>item.product._id === _id);
  const navigate = useNavigate()
  const onEdit = () =>{
    dispatch(setSelectedProduct({
      product:{
      name,
      _id,
      image,
      price,
      category,
      brand,
      description 
      }
    }))
    navigate(`/products/edit/${name}`)
  };
  const {pathname, search} = useLocation();

  const onRatingChange = (e) =>{
    dispatch(rateProduct({productId:_id,
      userId: userInfo?._id,
      url:`${category}${search}&size=5`,
      isHome: pathname === '/',
      rating: e.target.value,
    }));

  }
  //  console.log(cartItems)
  //   console.log(isProductInCart);
  return (
    <Grid item>
        <StyledCart>
          <StyledLink to={`/products/categories/${category}/${name}`}
          state={{id:_id}}
          >
          <img src={image} alt={`${category} ${name}`}
           width='300px' height='300px'
            />
            <StyledcardContent>
                <StyledTypography>{name}</StyledTypography>
                <Typography>price: {price}$</Typography>
            </StyledcardContent>
          </StyledLink>
          <CardActions sx={{display:'block'}}>
            <Rating value={averageRating} isDisabled={!userInfo} onChange={onRatingChange}/>
            <StyledBox>
              {isProductInCart ? (
                <>
                  <StyledButton onClick={() => dispatch(removeFromCart(_id))}>-</StyledButton>
                  <StyledButton onClick={() => dispatch(addToCart({ _id, price, name }))}>+</StyledButton>
                </>
              ) : (
                <StyledButton onClick={() => dispatch(addToCart({ _id, price, name }))}>add to cart</StyledButton>
              )}
              {isUserAdmin(userInfo) && <StyledButton onClick={onEdit}>edit</StyledButton> }
            </StyledBox>
          </CardActions>
        </StyledCart>
    </Grid>
  )
};
