import { Drawer, List,Box, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../redux';
import { SideBarHeader } from './SideBarHeader';



const StyledListItem = styled(ListItem)(()=>({
    padding: '5px 0px 3px 15px',
    margin: '0px',
    textDecoration: 'none',
    fontSize: '20px'

}));
const StyledList = styled(List)(()=>({
  display: 'block',
  alignItems: 'center',
  paddingLeft: '24%',
  fontWeight: 'bolder',
  fontSize: '20px',
  letterSpacing: '2px'
}));
const StyledLink = styled(Link)(()=>({
    textDecoration: 'none',
    color: '#adb5bd',
    fontSize: '22px',  
    letterSpacing: '4px'



}));


export const SideBar = () => {
  const sideBarItems = useCategories()
  return (
    <Drawer 
        variant='permanent'
        sx={{
            display:{xs: 'block'},
            '& .MuiDrawer-paper':{
                width: '21.2%',
                height: '90%',
                marginTop: '90px',
                background:'#333533',
                borderRight: '1px solid #FFF'
            },
            }}
            open={true}>
            <SideBarHeader/>
            <StyledList>
                {sideBarItems.map((sideitem)=>{
                    const { _id, name} = sideitem;
                    return (
                        <React.Fragment key={_id}>
                            <StyledLink to={`/products/categories/${name}?page=1&sort=name,asc`}>
                                <Box sx={{display:'flex'}}>
                                    <StyledListItem>
                                        <ListItemText  primary={name}/>
                                    </StyledListItem>
                                </Box>
                            </StyledLink>
                        </React.Fragment>
                    )

                })}
            </StyledList>
    </Drawer>
  )
};

