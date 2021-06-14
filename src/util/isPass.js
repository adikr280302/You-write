const isPass = (value)=>{
    if(value.trim().length>=5)
        return true;
    else    return false;
};

export default isPass;