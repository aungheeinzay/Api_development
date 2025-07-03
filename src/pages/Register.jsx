import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
    return (
        <section className='w-full mt-10'>
            <h1 className='text-center text-teal-600 text-3xl font-semibold'>Register</h1>
            <AuthForm isLogin={false}/>
            
        </section>
    );
}

export default Register;
