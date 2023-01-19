import React, {useEffect} from 'react';
import useRequest from '../../hooks/use-request'
import Router from "next/router"


const signout = () => {
    const { doRequest } = useRequest({
        url : "/api/users/signout", 
        method: "post", 
        body: {},
        onSucess: () => Router.push('/')   
    })
    useEffect(()=> {
  doRequest(); 
    },[])

    return (
        <div>
            
        </div>
    );
};

export default signout;