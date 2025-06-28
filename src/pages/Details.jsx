import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Details = () => {
    return (
         <div className='w-4/5 mx-auto mt-10 border-teal-600 border-t-4 shadow-lg p-3'>
            <Link to={"/"} className='float-right'>
               <ArrowLeftIcon width={22}/>
            </Link>
                <h1 className='text-mediom'>Lorem ipsum dolor sit amet.</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque placeat asperiores soluta, doloribus magnam sapiente est autem molestias? Ratione, nostrum molestiae nemo quas itaque a culpa porro accusamus adipisci eos.</p>
                   
            </div>
    );
}

export default Details;
