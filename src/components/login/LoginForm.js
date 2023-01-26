import React from 'react';
import { FormControl,Button } from '@mui/material';
import { UseForm } from '../../application/hooks/useForm';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextFieldComponent } from '../shared';
import { authenticateUser } from '../../redux';
import { styled ,Box } from '@mui/system';


const generateLoginFormValues = () =>{
    return{
        email:{
            value:'',
            required: true,
            error: '',
            validateInput: (email) => email.includes('@gmail.com') ? null : 'invalid format'
        },
        password:{
            value:'',
            required: true,
            error: '',
            validateInput: (password)=> password.length > 6 ? null : 'password should have at least 6 characters'
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

export const LoginForm = () => {
    const {formValues, onInputChange} = UseForm({
        defaultFormValues : generateLoginFormValues()
    });
     const dispatch = useDispatch();
     const navigate = useNavigate();
    // console.log('formvalues',formValues);
     const onLogin = (e) =>{
        
        const email = formValues.email.value;
        const password = formValues.password.value;
        dispatch(authenticateUser({formValues:{email,password},isLogin:true}))
        .unwrap().then(()=>{
            navigate('/')
        });
         e.preventDefault();
        
     };
     
  return (
         <FormControl fullWidth sx={{height:'100vh'}}>
            <StyledBoxHeader>Login</StyledBoxHeader>
            <TextFieldComponent
            name='email'
            label='email'
            value={formValues.email.value}
            onChange={onInputChange}
            error={formValues.email.error}
            
            />
            <TextFieldComponent
            name='password'
            label='password'
            value={formValues.password.value}
            onChange={onInputChange}
            error={formValues.password.error}
            //  helperText={formValues.password.error}
            />
            <StyledButton onClick={onLogin}>Login</StyledButton>
         </FormControl>
      )  
}
