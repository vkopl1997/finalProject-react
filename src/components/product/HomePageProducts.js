import React from 'react';
import { useHomePageProducts } from '../../redux';
import { ProductCard } from './ProductCard';
import { GridComponent } from '../shared';
import { styled, Box } from '@mui/system';

const StyledBoxHeader = styled(Box)(()=>({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '4%',
  fontWeight: 'bolder',
  fontSize: '48px',
  letterSpacing: '2px',
  padding:'10px',
  color: '#adb5bd',
}))

export const HomePageProducts = () => {
    const homePageProducts = useHomePageProducts()
  return  (
    <>
      <StyledBoxHeader>products</StyledBoxHeader>
      <GridComponent >
        {homePageProducts.map((product)=>{
        return <ProductCard key={product._id} {...product}/>
        })}
      </GridComponent>
    </> 
  )
};
