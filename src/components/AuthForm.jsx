import { Field, Form, Formik } from 'formik';
import * as Yup from "yup"
import StyleErrorMsg from './StyleErrorMsg';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { user_context } from '../contexts/UserContext';
import { Oval } from 'react-loader-spinner';

const AuthForm = ({isLogin}) => {
    const [isLoading,setIsLoading] = useState(false)
    const {updateToken} =useContext(user_context)
    const [error,setError] = useState({})
    const navigate = useNavigate()
    const initialValues = {
        username:"",
        email:"",
        password:""
    }
    const specialCharacter=["@","!","#","$","&","*","^"]
    const authFormSchema =isLogin ? null : Yup.object({
        username:Yup.string().min(3,"username is too short!").max(17,"username is too long!"),
        email:Yup.string().email("invalid email ").required("email is required"),
        password:Yup.string().min(4,"password is weak").max(20,"password is too log")
        .test("has-special-char","password must have a special character",
            (value)=>{
                return specialCharacter.some(char=>value.includes(char))
            }).required("password is requird")
    })


    let API;
    const authSubmit =async(values)=>{
        setIsLoading(true)
        if(isLogin){
            API = `${import.meta.env.VITE_API}/login`;
        }else{
            API=`${import.meta.env.VITE_API}/register`
        }
        const res = await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        
        })
       setIsLoading(false)
       const data = await res.json() 
        if(!isLogin && res.ok===true){
        
        console.log(data)
            return navigate("/login")
        }
        if(isLogin && res.ok===true){
             
        console.log(data)
            updateToken(data)
            return navigate("/")
        }
        if(res.status===400){
            const {error} =data
            console.log(error)
            setError(error)
            
        }
    }

    return (
        
        
        <Formik className="w-full " 
        initialValues={initialValues}
        onSubmit={authSubmit}
        validationSchema={authFormSchema}>
            
            {
                (values)=>(
                    <>
                    {/* <div className="w-1/2 shadow-xl h-80 absolute bg-white left-1/2 -translate-x-1/2 rounded-2xl z-20"></div>
                    <div className="w-60 shadow-xl top-96 h-40 absolute left-60 rounded-2xl z-10"></div>
                    <div className="w-60 shadow-xl top-20 h-40 absolute bg-white right-40 rounded-2xl z-20"></div> */}
                    <Form className='w-4/5 left-1/2 -translate-x-1/2 md:w-1/2 px-5 absolute z-30 bg-white shadow-xl p-10 rounded-lg'>
                    
                    {
                        !isLogin && 
                        <div>
                        <label htmlFor="username" 
                        className='text-lg block'>username</label>
                        <Field type ="text" name="username" id="username"
                        className="ps-1 w-full text-lg border-2 rounded-lg py-1 border-teal-600"/>
                        <StyleErrorMsg name="username"/>
                    </div>
                    }
                    {
                        isLogin && error && <p className='text-red-600 text-center'>{error.msg}</p>
                    }
                    <div>
                        <label htmlFor="email" 
                        className='text-lg block'>email</label>
                        <Field type ="email" name="email" id="email"
                        className="ps-1 w-full text-lg border-2 rounded-lg py-1 border-teal-600"/>
                        {
                           !isLogin && error && <p className='text-red-600'>{error.msg}</p>
                        }
                        <StyleErrorMsg name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password" 
                        className='text-lg block'>password</label>
                        <Field type ="password" name="password" id="password"
                        className="ps-1 w-full text-lg border-2 rounded-lg py-1 border-teal-600"/>
                        <StyleErrorMsg name="password"/>
                    </div>
                    <button disabled={isLoading} type='submit'
                    className='w-full text-center bg-teal-600 text-white py-2 rounded-lg mt-3 flex justify-center gap-3'>
                    {
                        isLoading &&  <Oval
                                                visible={true}
                                                height="20"
                                                width="20"
                                                color="#ccf5e0"
                                                ariaLabel="oval-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                />
                    }
                        {
                            isLogin ? "Login" : "Register"
                        }
                    </button>

                    </Form>
                    </>
                )
            }
            
        </Formik>
    );
}

export default AuthForm;
