import { TrashIcon,PencilSquareIcon,EyeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { postedTime } from "../utils/date";
import { ToastContainer,Bounce,toast } from "react-toastify";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
const Note = ({note,getNote}) => {
    const{_id,title,content,createdAt} = note;
    const[loading,setLoading] =useState(false)
    const deleteHandler = async()=>{
        setLoading(true)
        try{
            const res = await fetch(`${import.meta.env.VITE_API}/deleteNote/${_id}`,{
                method:"DELETE"
            })
            
            if(res.status===204){
                
                toast.success("note is deleted")
                getNote();
                setLoading(false)
            }
            
        }catch(err){
            console.log(err);
            
        }
    }

    return (
        <div className='w-full border-teal-600 border-t-4 shadow-lg p-3 rounded-md'>
                <div className="flex justify-between align-middle">
                    <h1 className='text-lg'>{title}</h1>
                    <p className="text-sm opacity-60">{postedTime(createdAt)}</p>
                </div>
                <p className='text-sm mb-3 text-wrap break-words whitespace-normal'>{content.slice(0,120)}</p>
                <hr />
                <div className="flex items-center justify-end gap-2 p-2">
                  <div className="relative group w-6 h-6 grid place-items-center hover:bg-gray-300 rounded-full">
  {/* Tooltip text */}
  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
    Delete
  </span>

  {
    loading ? (
      <Oval
        visible={true}
        height="20"
        width="20"
        color="#ccf5e0"
        ariaLabel="oval-loading"
      />
    ) : (
      <TrashIcon
        width={20}
        className="text-red-600 cursor-pointer"
        onClick={deleteHandler}
      />
    )
  }
</div>

                    <Link to={"/edit/"+_id} state={note} >
                    <div className="hover:bg-gray-300 rounded-full w-6 h-6 grid place-items-center group relative">
                        <span className="text-white bg-teal-600 absolute -top-7 
                        text-xs rounded py-1 px-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100">
                            edit
                        </span>
                    <PencilSquareIcon width={20} className="text-teal-600"/>
                    </div>
                    </Link>
                    <Link to={"/details/"+_id}>
                     <div className="hover:bg-gray-300 relative rounded-full w-6 h-6 grid place-items-center group">
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-teal-600 text-xs
                         text-white rounded py-1 px-2 opacity-0 group-hover:opacity-100"
                        >detail</span>
                    <EyeIcon width={20} className="text-gray-500"/>
                    </div>
                    </Link>
                </div>
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
            </div>
    );
}

export default Note;
