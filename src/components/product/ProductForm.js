import { FormControl ,Button,styled,Box} from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { UseForm } from '../../application';
import { saveProduct, setSelectedProduct, useSelectedProduct } from '../../redux';
import { TextFieldComponent } from '../shared';
import  FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
const generateAddProductFormValues = (selectedProduct) =>{
    return {
        name:{
            value: selectedProduct?.name || '',
            required: true,
            error:'',
            validateInput: (name) => name.length > 1 ? null : 'name should have at leat 2 characters',
        },
        description:{
            value: selectedProduct?.description || '',
            required: true,
            error:'',
            validateInput: (description) => description.length > 1 ? null : 'description should have at leat 2 characters',
        },
        category:{
            value: selectedProduct?.category || '',
            required: true,
            error:'',
            validateInput: (category) => category.length > 1 ? null : 'category should have at leat 2 characters',
        },
        brand:{
            value: selectedProduct?.brand || '',
            required: true,
            error:'',
            validateInput: (brand) => brand.length > 1 ? null : 'brand should have at leat 2 characters',
        },
        price:{
            value: selectedProduct?.price || '',
            required: true,
            error:'',
            validateInput: (price) => price.length > 1 ? null : 'price should have at leat 2 characters',
        },   
    }
};


const StyledBoxHeader = styled(Box)(()=>({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4%',
    fontWeight: 'bolder',
    fontSize: '48px',
    letterSpacing: '2px',
    padding:'10px',
    color: '#adb5bd',
    marginBottom:'30px',
    marginTop:'50px'
  }));
  const StyledButton = styled(Button)(()=>({
    border: '1px solid #FFF',
    borderRadius: '16px',
    padding: '6px 18px ',
    fontSize: '12px',
    color: '#FFF',
    margin:'2px',
    marginTop:'60px',
  }));

export const ProductForm = () => {
    const {formValues:productFormValues,onInputChange,setFormValues} = UseForm({
        defaultFormValues: generateAddProductFormValues()
    });
    const selectedProduct = useSelectedProduct()
    const [image,setImage] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onSaveProduct = () => {
        const name = productFormValues.name.value;
        const description = productFormValues.description.value;
        const brand = productFormValues.brand.value;
        const category = productFormValues.category.value;
        const price = productFormValues.price.value;
        dispatch(saveProduct({
            product: {name,description,brand,category,price,image,id:selectedProduct?._id},
            isUpdating: !!selectedProduct,
        })).unwrap().then(()=>{
            navigate('/')
        });  
    }
    useEffect(()=>{
        if(selectedProduct){
            setFormValues(generateAddProductFormValues(selectedProduct));
            setImage(selectedProduct.image)
        }else{
            generateAddProductFormValues()
        }
    },[selectedProduct])
  return ( <>
   {selectedProduct? <StyledBoxHeader>Update</StyledBoxHeader> : <StyledBoxHeader>Add product </StyledBoxHeader>}
    <FormControl fullWidth sx={{height:'100vh'}}>
            <TextFieldComponent 
            name='name'
            value={productFormValues.name.value}
            onChange={onInputChange}
            label='name'
            error={productFormValues.name.error}
            />
            <TextFieldComponent 
            name='description'
            value={productFormValues.description.value}
            onChange={onInputChange}
            label='description'
            error={productFormValues.description.error}
            />
            <TextFieldComponent 
            name='category'
            value={productFormValues.category.value}
            onChange={onInputChange}
            label='category'
            error={productFormValues.category.error}
            />
            <TextFieldComponent 
            name='brand'
            value={productFormValues.brand.value}
            onChange={onInputChange}
            label='brand'
            error={productFormValues.brand.error}
            />
            <TextFieldComponent 
            name='price'
            value={productFormValues.price.value}
            onChange={onInputChange}
            label='price'
            error={productFormValues.price.error}
            />
            <FileBase type='file' multiple={false} onDone={({base64})=>(
                setImage(base64)
            )}/>
            {selectedProduct ?<StyledButton onClick={onSaveProduct}>Edit</StyledButton> : <StyledButton onClick={onSaveProduct}>Add</StyledButton>}
    </FormControl>
  </>
 ) 
}
