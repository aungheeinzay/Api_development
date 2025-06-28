import { TrashIcon,PencilSquareIcon,EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
    return (
        <div className='w-2/5 border-teal-600 border-t-4 shadow-lg p-3'>
                <h1 className='text-mediom'>Lorem ipsum dolor sit amet.</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque placeat asperiores soluta, doloribus magnam sapiente est autem molestias? Ratione, nostrum molestiae nemo quas itaque a culpa porro accusamus adipisci eos.</p>
                <div className="flex items-center justify-end gap-2 p-2">
                    <TrashIcon width={20} className="text-red-600"/>
                    <Link to={"/edit/1"}>
                    <PencilSquareIcon width={20} className="text-teal-600"/>
                    </Link>
                    <Link to={"/details/1"}>
                    <EyeIcon width={20} className="text-gray-500"/>
                    </Link>
                </div>
            </div>
    );
}

export default Note;
