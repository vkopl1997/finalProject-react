import React from 'react';
import { FormControl,Button,styled,Box } from '@mui/material';
import { UseForm } from '../../application/hooks/useForm';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextFieldComponent } from '../shared';
import { authenticateUser } from '../../redux';


const generateRegisterFormValues = () =>{
    return{
        firstName:{
            value:'',
            required: true,
            error: '',
            validateInput: (name)=> name.length >3 ? null : 'name should have at least 3 characters'
        },
        lastName:{
            value:'',
            required: true,
            error: '',
            validateInput: (lastname)=> lastname.length >3 ? null : 'lastname should have at least 3 characters'
        },
        email:{
            value:'',
            required: true,
            error: '',
            validateInput: (email)=> email.includes('@gmail.com') ? null : 'invalid format'
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


 export const RegisterForm = () => {
    const {formValues, onInputChange} = UseForm({
        defaultFormValues : generateRegisterFormValues()
    });
     const dispatch = useDispatch();
     const navigate = useNavigate();
    // console.log('formvalues',formValues);
     const onRegister = (e) =>{
        e.preventDefault();
        const firstName = formValues.firstName.value;
        const lastName = formValues.lastName.value;
        const email = formValues.email.value;
        const password = formValues.password.value;
        dispatch(authenticateUser({formValues:{firstName,lastName,email,password},
            isLogin: false
        })).unwrap().then(()=>navigate('/'))
     };
     
  return (
         <FormControl fullWidth sx={{height:'100vh'}} >
            <StyledBoxHeader>Register</StyledBoxHeader>
            <TextFieldComponent
            name='firstName'
            label='firstName'
            value={formValues.firstName.value}
            onChange={onInputChange}
            error={formValues.firstName.error}
            />
            <TextFieldComponent
            name='lastName'
            label='lastName'
            value={formValues.lastName.value}
            onChange={onInputChange}
            error={formValues.lastName.error}
            />
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
            />
            <StyledButton onClick={onRegister}>register</StyledButton>
         </FormControl>
      )
     }
