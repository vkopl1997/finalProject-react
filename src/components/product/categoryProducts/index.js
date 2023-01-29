import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCategoryProducts, useCategoryProducts } from '../../../redux'
import { CategoryProductList } from './CategoryProductList'
import { Paginate } from './Paginate';
import { useQueryParam } from '../../../application';
import { Sort } from './Sort';
import { styled, Box } from '@mui/system';

const StyledBoxHeader = styled(Box)(()=>({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '4%',
  fontWeight: 'bolder',
  fontSize: '48px',
  letterSpacing: '2px',
  padding:'10px',
  color: '#FFF',
}));

const StyledPaginate = styled(Box)(()=>({
  width:'100%',
  display:'flex',
  justifyContent:'center',
  marginTop:'20px'
}));



export const CategoryProducts = () => {
  const {categoryName} = useParams();
  const { value: page, changeQueryValue: changePage } = useQueryParam('page');
  const { value: sort, changeQueryValue: changeSort  } = useQueryParam('sort');
  const categoryProducts = useCategoryProducts();
  const dispatch = useDispatch();
  useEffect(()=>{
     changePage('page',1);
  },[sort]);
  useEffect(() => {
    dispatch(fetchCategoryProducts(`${categoryName}?page=${page}&size=4&sort=${sort}`))
  }, [categoryName,page,sort,dispatch]);
  return (
    <Box sx={{height:'100%',marginLeft:'3%'}}>
      <StyledBoxHeader>{categoryName}</StyledBoxHeader>
      <Sort changePage={changePage} sort={sort} changeSort={changeSort}/>
      <CategoryProductList  />
      <StyledPaginate>
        <Paginate 
          currentPage={page}
          totalPages={categoryProducts.totalPages}
          changePage={changePage}
          queryKey='page'
        />
      </StyledPaginate>  
    </Box>
  )
}
