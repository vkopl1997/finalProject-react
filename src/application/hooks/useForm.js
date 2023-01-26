import  { useState } from 'react'

export const UseForm = ({defaultFormValues}) => {
    const [formValues,setFormValues] = useState(defaultFormValues);
    const onInputChange = (e) =>{
        const eventName = e.target.name;
        const {validateInput} = formValues[eventName];
        setFormValues((prevFormValues) =>{
            return{
                ...prevFormValues,
                [eventName] : {
                    ...prevFormValues[eventName],
                    value: e.target.value,
                    error: validateInput ? validateInput(e.target.value) : ''
                }
            };
        });
    };
    const checkButtonDisable = (values) => {
        // key,
        for (const [objValue] of Object.entries(values)) {
            if (objValue.required && (objValue.error || !objValue.value)){
                return true ;
            }
        };
    };
    const clearForm = (obj) =>{
        setFormValues(obj);
        
       };
    return{
        formValues,
        setFormValues,
        onInputChange,
        clearForm,
        checkButtonDisable,
     }
};




 
