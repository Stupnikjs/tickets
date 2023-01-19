import React, {useState} from 'react';
import Router from 'next/router'; 
import useRequest from '../../hooks/use-request';

const signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: "post",
        body: {
            email , password
        }, 
        onSuccess: () =>  Router.push('/')
        
    })

    const onSubmit = async(event) => {
        event.preventDefault()
        
       await doRequest()

       
    }
    return (
        <form action="" onSubmit={onSubmit}>
            <h1> sign In </h1>
            <div className="form-group">
                <label htmlFor="">Email Address</label>
                <input className='form-control' onChange={e => setEmail(e.target.value)} type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="">Password</label>
                <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            
               {errors}
            <button className='btn btn-primary'> Sign in </button>
            
        </form>
    );
};

export default signup;