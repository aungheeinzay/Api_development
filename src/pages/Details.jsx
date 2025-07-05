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
const {title,content,userId,createdAt,cover_photo} =note;
    return (
         <>
         {
            loading && <Loading/> ||
            <div className='sm:w-3/5 w-[340px] mx-auto mt-10 border-teal-600 border-t-4 shadow-lg p-3'>
            <Link to={"/"} className='float-right'>
               <ArrowLeftIcon width={22}/>
            </Link>
            <p className="text-teal-500 flex gap-3"><span><UserIcon width={20}/></span> {userId.username || "unknown"}</p>
            <p className="text-teal-500 flex gap-3">
                <span>
                    <ClockIcon width={20}/>
                </span>{postedTime(createdAt)}</p>
                <h1 className='text-mediom'>{title}.</h1>
               {
                cover_photo && 
                <>
                 <div className="w-full aspect-video rounded-lg overflow-hidden ">
                    <img src={`${import.meta.env.VITE_API}/`+cover_photo} alt="lee" className="w-full object-cover"/>
                </div>
                <hr className="mt-5 bg-slate-600"/>
                </>
               }
                <p className='text-sm  break-words whitespace-normal text-wrap'>{content}</p>
                   
            </div>
         }
         </>
    );
}

export default Details;
