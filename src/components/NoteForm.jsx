
import { ArrowLeftIcon,ArrowUpTrayIcon,MinusCircleIcon } from '@heroicons/react/24/solid';
import { Link,useLocation,useNavigate, } from 'react-router-dom';
import { Formik,Field,Form, } from 'formik';
import StyleErrorMsg from './StyleErrorMsg';
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';

const NoteForm = ({isCreate}) => {
    const [previewImg,setPreviewImg] = useState(null)
    const [loading,setLoading] = useState(false)
    const fileRef = useRef()
    const navigate = useNavigate()
    const {state} = useLocation()
    const initialValues={
                title:isCreate ? "" : state.title,
                content:isCreate? "" :state.content,
                cover_photo:isCreate? null :state?.cover_photo
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
    const SUPPORTED_FORMATS=['image/png','image/jpg','image/jpeg']
    const NoteFormShema = Yup.object({
        title:Yup.string().max(30,"title is too long").required("title is required"),
        content:Yup.string().required("centent is required"),
        cover_photo:Yup.mixed().nullable().test("FILE_FORMAT","this file is not supported",
            (values)=> {
                if (!values) return true; // allow null
                if (typeof values === 'string') return true; // existing file path, so allow
                return SUPPORTED_FORMATS.includes(values.type); // new file, check type
    
            })
        })
    let API;
    let method;
    const submsitHandler =async (values)=>{
        setLoading(true)
        if(isCreate){
            API=`${import.meta.env.VITE_API}/noteCreate`;
            method="POST"
        }else{
            API =`${import.meta.env.VITE_API}/updateNote/${state._id}`;
            method="PUT"
        }
        const formData = new FormData()
        formData.append("title",values.title)
        formData.append("content",values.content)
        formData.append("cover_photo",values.cover_photo)
        try{
            const res = await fetch(API,{
            method,
            body:formData
        })
        if(res.ok===true){
            setLoading(false)
            return navigate("/")
        }
        }catch(err){
            console.log(err);
        }
    }
        
        

    //file onchange handler
    const  fileHandler=(e,setFieldValue)=>{
        const selectedImg = e.target.files[0];
        if(selectedImg){
            setPreviewImg(URL.createObjectURL(selectedImg))
            setFieldValue("cover_photo",selectedImg)
        }
        
    }
    //clear handler
    const clearCover=(e,setFieldValue)=>{
        e.stopPropagation()
        setPreviewImg(null)
        setFieldValue('cover_photo',null)
        fileRef.current.value=null
    }
    return (
        <section className=''>
    
            <h1 className='text-2xl font-bold mb-5'>
                {
                    isCreate ? " Create a new note" : "Edit your note"
                }
                </h1>
            <Link to={"/"} className='float-right flex gap-2 hover:bg-slate-300 p-2 rounded-md'>
               <ArrowLeftIcon width={22}/>
               back
            </Link>
           
            <Formik 
            initialValues={initialValues} 
            // validate={validate}
            validationSchema={NoteFormShema}
            onSubmit={submsitHandler}>
           {
            ({errors,touched,values,setFieldValue})=>(
                     <Form  className='mt-5' encType='multipart/form-data'>
                
                <div className='mb-3'>
                    <label htmlFor="title"
                     className='font-medium block'>note title</label>
                    <Field type="text" name="title" id="title"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                     <StyleErrorMsg name="title"/>
                </div>
                 <div className='mb-3'>
                    <label htmlFor="cover_photo" className='font-medium block'>cover</label>
                   <input ref={fileRef} hidden type="file" name='cover_photo' id='cover_photo'
                   onChange={(e)=>{
                        fileHandler(e,setFieldValue)
                    }}
                   />
                   <div className='w-full grid place-items-center border border-teal-600 rounded-lg border-dashed h-40 cursor-pointer overflow-hidden relative'
                    onClick={()=>{
                        fileRef.current.click()
                    }} 
                   >
                   
                   {
                    isCreate ? previewImg && <img className='z-10 absolute w-full top-0 left-0 object-cover h-full opacity-50' src={previewImg} alt="photo" />

                    : <img className='z-10 absolute w-full top-0 left-0 object-cover h-full opacity-50'
                     src={previewImg ? previewImg : `${import.meta.env.VITE_API}/`+state.cover_photo} alt="photo" />
                   }
                    <ArrowUpTrayIcon width={30} height={30} className='text-teal-600 font-extrabold z-20'/>
                       
                    {
                    previewImg && <div className='cursor-pointer z-20 absolute top-5 right-5'
                    onClick={e=>clearCover(e,setFieldValue)}>
                        <MinusCircleIcon width={30} height={30} className='text-red-600 font-bold'/>
                    </div> 
                    }
                   </div>
                <StyleErrorMsg name="cover_photo"/>
                </div>
                <div className='mb-5'>
                    <label htmlFor="content" className='font-medium block'>content</label>
                    <Field as="textarea" rows={4} type="text" name="content" id="content"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                     <StyleErrorMsg name="content"/>
                </div>
                <button type='submit'
                 className='text-white bg-teal-600 font-medium w-full text-center p-2 rounded-md flex justify-center gap-2'>
                    {
                        loading && 
                        <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#ccf5e0"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        />
                    }
                    {isCreate ? "note" : "update note"}</button>
            </Form> 

            )
           }
            </Formik>
        </section>
    );
}

export default NoteForm;
