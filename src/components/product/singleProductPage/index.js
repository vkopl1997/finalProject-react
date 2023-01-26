import React from 'react'
import { useDispatch } from 'react-redux';
import { Box, styled ,List,Button} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { rateProduct,  useSingleProduct, useUserInfo } from '../../../redux';
import { useEffect,useState } from 'react'
import { fetchSingleProductById,setSelectedProduct,addToCart,useCartItems,removeFromCart } from '../../../redux';
import { isUserAdmin } from '../../../application';
import { Rating } from '../Rating'

 const StyledBoxButton = styled(Box)(()=>({
  width:'100%',
  display: 'flex',
  justifyContent:'right',
  marginTop: '20px'
}));

const StyledBox = styled(Box)(()=>({
  width: '80%',
  backgroundColor: 'transperent',
  display: 'block',
  marginLeft: '10%',
  height:'100vh'
}));

const StyledBoxHeader = styled(Box)(()=>({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '4%',
  fontWeight: 'bolder',
  fontSize: '48px',
  letterSpacing: '2px',
  padding:'6px',
  color: '#adb5bd',
}));

const StyledButton = styled(Button)(()=>({
  border: '1px solid #FFF',
  borderRadius: '16px',
  padding: '2px 2px ',
  fontSize: '11px',
  color: '#FFF',
  margin:'2px'
}));

const StyledList = styled(List)(()=>({
  display:'block',
  backgroundColor:'transperent',
  color: 'gray',
  fontWeight:'bolder',
  fontSize:'18px !important',
  textAlign: 'right',
  paddingRight: '10%'
}));

export const DetailedProduct = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { categoryName } = useParams();
    const { pathname,search } = useLocation();
    const singleProduct = useSingleProduct();
    const userInfo = useUserInfo();
    const navigate = useNavigate();
    const cartItems = useCartItems();
    const isProductInCart = cartItems?.find((item)=>item.product._id === singleProduct?._id);
   
    const onEdit = () =>{
      dispatch(setSelectedProduct({
        product:{
        name:singleProduct.name,
        _id:singleProduct._id,
        image:singleProduct.image,
        price:singleProduct.price,
        category:singleProduct.category,
        brand:singleProduct.brand,
        description :singleProduct.description,
        }
      }))
      navigate(`/products/edit/${singleProduct.name}`)
    };  

    const [rating, setRating] = useState(null);

    const onRatingChange = (e) =>{
        setRating(e.target.value);
    }
    
    useEffect(() => {
        if (rating) {
            dispatch(rateProduct({
                productId: singleProduct?._id,
                userId: userInfo?._id,
                url:`${singleProduct?.category}${search}`,
                isHome: pathname === '/',
                rating: rating,
            }));
        }
    }, [dispatch, rating, pathname, search, singleProduct?._id, singleProduct?.category, userInfo?._id]);
  // console.log('rating',singleProduct?.averageRating);
  // console.log(`${search}`);
  // console.log(singleProduct);

    useEffect(()=>{
      dispatch(fetchSingleProductById({id: state.id,category:categoryName}))
    },[state.id,categoryName,dispatch])
    //  console.log('djdj',singleProduct);

    
  return (
      <Box sx={{display:'flex'}}>
        <StyledBox>
          <StyledBoxHeader>{singleProduct?.brand}</StyledBoxHeader>
          <StyledBoxHeader>{singleProduct?.name}</StyledBoxHeader> 
          <Box sx={{
            width:'100%',
            height:'380px',
            display:'flex',
            justifyContent:'center',
            border:'1px solid #FFF',
            background:'#FFF'
          }}>
            <img src={singleProduct?.image} alt={`${singleProduct?.category}
            ${singleProduct?.name}`}
              width='60%' height='95%'
              style={{
              borderRadius:'10px',
              backgroundPosition:'100%',
              marginBottom:'20px',
              padding:'12px'
              }}/>
          </Box>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{width:'60%',padding:'10px',color:'gray',lineHeight:'24px'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled 
              it to make a type specimen book. It has survived not only five centuries.
            </Box>
            <Box>
              <Box spacing={1} sx={{width:'100%',background:'#333533'}}>
                    <StyledList>Condition: {singleProduct?.description}</StyledList>
                    <StyledList>Price: {singleProduct?.price} $</StyledList>
                    <StyledList>
                    <Rating value={rating || (singleProduct && singleProduct?.averageRating)} isDisabled={!userInfo} onChange={onRatingChange}/>
                    </StyledList>   
              </Box>
              <StyledBoxButton>
                { isProductInCart?(
                  <>
                  <StyledButton onClick={() => dispatch(removeFromCart(singleProduct._id))}>Minus 1</StyledButton>
                  <StyledButton onClick={() => dispatch(addToCart({ 
                    _id:singleProduct._id,
                    price:singleProduct.price,
                    name:singleProduct.name 
                    }))}>Plus 1</StyledButton>

                  </>
                ):(
                  <StyledButton onClick={() => dispatch(addToCart({ 
                    _id:singleProduct._id,
                    price:singleProduct.price,
                    name:singleProduct.name 
                    }))}>add to cart</StyledButton>
                )}
                {isUserAdmin(userInfo) && <StyledButton onClick={onEdit}>edit</StyledButton>}
              </StyledBoxButton>
            </Box>
          </Box>   
        </StyledBox>
      </Box>
    )};