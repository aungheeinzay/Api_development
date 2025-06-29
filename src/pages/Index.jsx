import React, { useEffect, useState } from 'react';
import Note from '../components/Note';
import Plus from '../components/Plus';
import Loading from '../components/Loading';
import { ToastContainer,Bounce,toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation()
    const [notes,setNote] = useState([])
    const [loading,setLoading] = useState(true)
    const getNote = async()=>{

    const res = await fetch(`${import.meta.env.VITE_API}/note`)
    const notes =await res.json()
    setLoading(false)
    setNote(notes)
}
    useEffect(()=>{
        getNote()
        
    },[])
    return (
        <section  className='w-full'>
              {
                    notes.length==0 && <p className='text-xl text-center text-gray-700'>no note yet</p>
                }
        <div className='grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-3  px-2 mt-10  '>
            
           {
           loading && <Loading/>
            || 
            notes.map((note)=>(
                <Note key={note._id} note={note} getNote={getNote}/>
            ))
           }
        </div>
        <Plus/>
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

export default Index;
