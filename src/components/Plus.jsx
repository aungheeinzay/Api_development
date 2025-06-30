import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
const Plus = () => {
    return (
        <Link to={"/create"} className="group bg-teal-600 p-2 text-white rounded-full w-50 h-50 fixed bottom-10 right-10" >
            <span className="bg-teal-600 text-white opacity-0 absolute -top-7 left-1/2  -translate-x-1/2 text-xs py-1 px-2 rounded pointer-events-none z-10 transition-opacity group-hover:opacity-100">share</span>
                <PlusIcon width={30} height={30}/>
            </Link>
    );
}

export default Plus;
