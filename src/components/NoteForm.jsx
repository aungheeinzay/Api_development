
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { Formik,Field,Form, } from 'formik';
import StyleErrorMsg from './StyleErrorMsg';
import { toast,ToastContainer,Bounce } from 'react-toastify';
import * as Yup from "yup"
const NoteForm = ({isCreate}) => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const initialValues={
                title:isCreate ? "" : state.title,
                content:isCreate? "" :state.content
            
                }

    // const validate = (values)=>{
    //     const errors = {}
    //     if(values.title.trim().length<1){
    //         errors.title="title must have "
    //     }
    //     if(values.content.trim().length<1){
    //         errors.content="description must have"
    //     }
    //     return errors
    // }
    const NoteFormShema = Yup.object({
        title:Yup.string()
        .max(30,"title is too long")
        .required("title is required"),

        content:Yup.string()
        .required("content is required")
    })

    const submitHandler =async (values)=>{
        if(isCreate){
            await fetch(`${import.meta.env.VITE_API}/noteCreate`,{
                method:'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(values)
            })
            
            return navigate("/")
            
        }
        if(!isCreate){
            await fetch(`${import.meta.env.VITE_API}/updateNote/${state._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)
            })
            toast.success("updated note")
            console.log("updated post");
            return navigate("/")
            
        }
        
        
    }
    return (
        <section className=''>
    
            <h1 className='text-2xl font-bold mb-5'>
                {
                    isCreate ? " Create a new note" : "Edit your note"
                }
                </h1>
            <Link to={"/"} className='float-right'>
               <ArrowLeftIcon width={22}/>
            </Link>
           
            <Formik 
            initialValues={initialValues} 
            // validate={validate}
            validationSchema={NoteFormShema}
            onSubmit={submitHandler}>
                <Form action="" className='mt-5'>
                
                <div className='mb-3'>
                    <label htmlFor="title"
                     className='font-medium block'>note title</label>
                    <Field type="text" name="title" id="title"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                     <StyleErrorMsg name="title"/>
                </div>
                <div className='mb-5'>
                    <label htmlFor="content" className='font-medium block'>content</label>
                    <Field as="textarea" rows={4} type="text" name="content" id="content"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                     <StyleErrorMsg name="content"/>
                </div>
                <button type='submit'
                 className='text-white bg-teal-600 font-medium w-full text-center p-2 rounded-md'>{isCreate ? "note" : "update note"}</button>
            </Form> 

            </Formik>
             <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
/>
        </section>
    );
}

export default NoteForm;
