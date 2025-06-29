import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon,ClockIcon,UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { postedTime } from "../utils/date";



const Details = () => {
const{noteId} = useParams()

const[note,setNote] = useState({})
const[loading,setLoading] = useState(true)

const fetchNote = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API}/noteDetail/${noteId}`)
    const note =await res.json()
    setLoading(false)
    setNote(note)
}
useEffect(()=>{
    fetchNote()
},[])
const {title,content,author,createdAt} =note;
    return (
         <>
         {
            loading && <Loading/> ||
            <div className='w-4/5 mx-auto mt-10 border-teal-600 border-t-4 shadow-lg p-3'>
            <Link to={"/"} className='float-right'>
               <ArrowLeftIcon width={22}/>
            </Link>
            <p className="text-teal-500 flex gap-3"><span><UserIcon width={20}/></span> {author}</p>
            <p className="text-teal-500 flex gap-3">
                <span>
                    <ClockIcon width={20}/>
                </span>{postedTime(createdAt)}</p>
                <h1 className='text-mediom'>{title}.</h1>
                <p className='text-sm'>{content}</p>
                   
            </div>
         }
         </>
    );
}

export default Details;
