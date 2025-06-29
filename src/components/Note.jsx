import { TrashIcon,PencilSquareIcon,EyeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { postedTime } from "../utils/date";
import { ToastContainer,Bounce,toast } from "react-toastify";

const Note = ({note,getNote}) => {
    const{_id,title,content,createdAt} = note;
    const deleteHandler = async()=>{
        try{
            const res = await fetch(`${import.meta.env.VITE_API}/deleteNote/${_id}`,{
                method:"DELETE"
            })
            if(res.status===204){
                toast.success("note is deleted")
                getNote();
            }
            
        }catch(err){
            console.log(err);
            
        }
    }

    return (
        <div className='w-full border-teal-600 border-t-4 shadow-lg p-3 rounded rounded-md'>
                <div className="flex justify-between align-middle">
                    <h1 className='text-lg'>{title}</h1>
                    <p className="text-sm opacity-60">{postedTime(createdAt)}</p>
                </div>
                <p className='text-sm mb-3 text-wrap'>{content.slice(0,120)}</p>
                <hr />
                <div className="flex items-center justify-end gap-2 p-2">
                    <TrashIcon width={20} className="text-red-600 cursor-pointer" onClick={deleteHandler}/>
                    <Link to={"/edit/"+_id} state={note}>
                    <PencilSquareIcon width={20} className="text-teal-600"/>
                    </Link>
                    <Link to={"/details/"+_id}>
                    <EyeIcon width={20} className="text-gray-500"/>
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
