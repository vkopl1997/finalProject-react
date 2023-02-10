import './App.css';
import { RoutesComponents } from './Routes';
import {Box, styled}  from '@mui/material'
import { Header } from './components/header';
import { useDispatch } from 'react-redux';
import { fetchCart, fetchHomePageProducts, useUserInfo } from './redux';
import { useEffect, useState } from 'react';
import { SideBar } from './components/sidebar/SideBar';
import { Loading } from './components/shared';



const StyledContentContainer = styled(Box)(()=>({
  padding:'40px',
  borderRight:'1px solid #FFF',
  width:'66.2%',
  backgroundColor: '#333533',
}));

const StyledBox = styled(Box)(()=>({
  marginTop: '90px',
  marginLeft: '21%',
  width: 'calc(100%-22%)',
  minHeight: '100vh',
  backgroundColor: '#333533',
}));


function App() {
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchHomePageProducts()).then(() => setLoading(false));
    if(userInfo){
      dispatch(fetchCart(userInfo._id))
    }
  }, [userInfo,dispatch])
  
  return (
    <Box>
      <Header />
      <SideBar />
      <StyledBox>
      {loading?
        <Loading/> : 
      <StyledContentContainer>
        <RoutesComponents/>
      </StyledContentContainer> 
      } 
      </StyledBox> 
    </Box>
  );
};

export default App;
