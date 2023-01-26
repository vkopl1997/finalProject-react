import React from 'react'
import { useCategoryProducts } from '../../../redux'
import { ProductCard } from '../ProductCard'
import { Grid } from '@mui/material'
import { GridComponent } from '../../shared';

export const CategoryProductList = () => {
  const categoryProducts = useCategoryProducts();
  // console.log('ddfgggg',useCategoryProducts());
  return ( 
  <GridComponent >{categoryProducts.products?.map((product)=>(
    <Grid item key={product._id}>
      <ProductCard {...product} />
    </Grid>
  ))}</GridComponent>
  )
}
