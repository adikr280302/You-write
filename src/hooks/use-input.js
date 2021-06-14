import {useCallback, useState } from "react";  

const useInput = (isValidCheck)=>{

    const [value,setValue] = useState("");
    const [isTouched,setTouched] = useState(false);
    const isValueValid = isValidCheck(value);
    const isValid = isValueValid || !isTouched;
    
    const inputBlurHandler = useCallback(()=>{
        setTouched(true);
    },[setTouched]);

    const changeValueHandler = useCallback((newValue)=>{
        setValue(newValue.target.value);
    },[setValue]);


    return {changeValueHandler,value,isTouched,isValid,inputBlurHandler};
}

export default useInput;