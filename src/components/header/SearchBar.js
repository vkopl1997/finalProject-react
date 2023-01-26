import { Autocomplete,  TextField,   } from '@mui/material'
import { Box, color, fontSize, padding } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQueryProducts, setSearchResults, useSearchResults } from '../../redux';
import { TypographyComp } from '../shared/Typography';





export const SearchBar = () => {
  const [searchValue,setSearchValue] = useState('');
  const searchResults = useSearchResults();
  const dispatch = useDispatch();
  // console.log('searchresults',searchResults);
  useEffect(()=>{
   const timerId = setTimeout(()=>{
    if(searchValue){
      dispatch(fetchQueryProducts(searchValue))
    }else{
      dispatch(setSearchResults());
    }
    } , 1000);
    return () =>{
      clearTimeout(timerId);
    }
  },[searchValue])

  // const options = [];

  return (
    <Autocomplete freeSolo 
     sx={{width:"50%",
     height:30,
     border:'1px solid #FFF',
     marginLeft:'8%',
     marginRight:'8%',
     '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
      color:'#FFF',
      padding: '0px !important',
      fontSize: '12px !important',
      paddingLeft: '10px !important',
      borderColor: 'transparent !important'
     },
     
    }}
     disableClearable 
     options={searchResults && searchResults.length > 0 ? searchResults : []}
     getOptionLabel ={(option)=> option.name}
     renderOption={(_,option)=>{
      const { name, category, _id, price } = option;
      return (
        <Link to={`/products/categories/${category}/${name}`}
         key={_id}
         state={{id:_id}}>
        <Box sx={{display: 'flex'}}>
          <TypographyComp>{name}</TypographyComp>
          <TypographyComp>{price}</TypographyComp>
        </Box>
      </Link>
      );
     }}
     renderInput={(params)=>{
      return <TextField 
      sx={{
        width:"100%",
        '& .MuiInputBase-root':{
          height:'30px',
        },
        '& .MuiAutocomplete-root .MuiOutlinedInput-root':{
          padding:'0px !important'
        },
        '& .css-1lwoez-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input': {
          padding:' 0.5px 0px 0.5px 6px'
      },
      '& .css-1lwoez-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':{
        color: '#FFF'
      },
      
        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
            left:'40px',
            top:'-8px'
        },
        '& .MuiFormLabel-root-MuiInputLabel-root ':{
          position:'absolute',
          bottom:'105px'
        },
        }}
      {...params}
       value={searchValue}
       onChange={(e)=>setSearchValue(e.target.value)}
       label='search products'
       inputProps = {{
        ...params.inputProps,
        type: 'search'
       }}
       InputLabelProps={{
        style: {
          textAlign: 'center',
          color: '#FFF',
          fontSize:'11px',
        },
      }}
       />
     }}

     />
  )
}
