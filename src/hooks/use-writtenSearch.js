import axios from 'axios';
import { useEffect,useState } from 'react';
import {useSelector } from 'react-redux';
const useWrittenSearch = (subject , page )=>{

    const token = useSelector(state=>state.auth.token);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [writtens,setWrittens] = useState([]);
    const [hasMore,setHasMore] = useState(false);
   
    
    
    useEffect(()=>{
        setWrittens([]);
    },[subject]);


    useEffect(()=>{
        let cancelThisRequest;
        setLoading(true);
        setError(false);
        if(!token)  return;
        axios({
        method:'GET',
        url: 'https://you-write.herokuapp.com/written/fetch',
        headers: {'Authorization': `Bearer ${token}`},
        params:{
            subject: subject,
            page:page
        },
        cancelToken: new axios.CancelToken((reqFunc)=>cancelThisRequest=reqFunc)
    })
        .then(res=>{
            setWrittens(prevWrittens=>[...prevWrittens,...res.data.writtens]);
            setHasMore(res.data.hasMore);
            setLoading(false);
        })
        .catch(error=>{
            if(axios.isCancel(error))
                return;
            setError(true);
        })
        return (()=>{
            cancelThisRequest();
        })

    },[subject,page,token]);

    return {hasMore,loading,error,writtens};
};

export default useWrittenSearch;