import React, { useEffect, useState,useContext } from 'react';
import Note from '../components/Note';
import Plus from '../components/Plus';
import Loading from '../components/Loading';
import { ToastContainer,Bounce,toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { getPaginationRange } from '../utils/paginaton';
import { user_context } from '../contexts/UserContext';

const Index = () => {
    const {token} =useContext(user_context)
    const location = useLocation()
    const [notes,setNote] = useState([])
    const [loading,setLoading] = useState(true)
    const [totalNotes,setTotalNotes] = useState()
    const [currentPage,setCurrentPage] = useState(1)
    const [countPages,setCountPages] =useState(1)
    
    // const pageNumberMaker=()=>{
    //     const pageNumbers=[]
    //     for(let i=1 ; i<countPages+1 ; i++){
    //         pageNumbers.push(
    //             <button onClick={()=>setCurrentPage(i)}
    //             className={`border-teal-600 border-2 rounded-lg px-2 ${i==currentPage && "bg-teal-600 text-white"}`} key={i}>
    //                 {i}
    //             </button>
    //         )
    //     }
    //     return pageNumbers
    // }
    const pageNumbers = getPaginationRange(currentPage,countPages,1)
    const getNote = async(page)=>{
    
    const res = await fetch(`${import.meta.env.VITE_API}/note?page=${page}`)
    const {notes,totalPages} =await res.json()
    
    
    setLoading(false)
    setCountPages(totalPages)
    setTotalNotes(totalNotes)
    setNote(notes)
}
    useEffect(()=>{
        getNote(currentPage)
        
    },[currentPage])

    const nextPagination =()=>{
        if(currentPage<countPages){
            setCurrentPage(prev=>prev+1)
        }
    }

    const prevPagination=()=>{
        if(currentPage>1){
            setCurrentPage(prev=>prev-1)
        }
    }
    return (
        <section  className='w-full'>
        <div className='grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-3  px-2 mt-10  '>
            
           {
           loading && <Loading/>
            || 
            notes.map((note)=>(
                <Note key={note._id} note={note} getNote={getNote}/>
            ))
           }
        </div>
        {
            notes.length>0 ? <div className='w-full mx-auto flex justify-center gap-3 mt-5'>
           
           <button disabled={currentPage==1} className='bg-teal-600 text-white
                                py-1 px-4 rounded-lg'
                                onClick={prevPagination}>prev</button>
            {/* {pageNumberMaker()} */}
            {
                pageNumbers.map((page,i)=>
                    page==="..." ? (
                        <span key={i} className='px-2 text-teal-600'>
                            ...
                        </span>
                    ) : (
                        <button key={page} 
                        onClick={()=>setCurrentPage(page)}
                        className={`px-2 py-1 rounded-lg border-teal-600
                        ${currentPage===page && "bg-teal-600 text-white"}`}>
                            {page}
                        </button>
                    )
                )
            }
           <button disabled={currentPage===countPages}
            className='bg-teal-600 text-white
                                py-1 px-4 rounded-lg'
                                onClick={nextPagination}>next</button>
        </div> : <p className='text-teal-600 text-lg text-center'>no note yet</p>
        }
        {
            token && <Plus/>
        }
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
