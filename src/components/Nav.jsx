import { Link, useNavigate } from "react-router-dom";
import { user_context } from "../contexts/UserContext";
import { useContext } from "react";

const Nav = () => {
    const {token,updateToken,setToken} = useContext(user_context)
    const navigate = useNavigate()
   const removeAuth=()=>{
    setToken(null)
    localStorage.removeItem("token")
    return navigate("/")
   }
    return (
        <nav className='shadow-lg flex justify-between align-middle'>
           <Link to="/"> <h1 className='text-teal-600 font-bold text-3xl p-2'>Dnote.io</h1></Link>
            <ul className="flex flex-row justify-center items-center gap-3 me-3">
               {
                !token ? <>
                 <Link to="/login"
                >
                    <li className="text-teal-600 font-semibold text-lg">Login</li>
                </Link>
                <Link to="/register" >
                    <li className="text-teal-600 font-semibold text-lg">Register</li>
                </Link>
                </> : <p onClick={removeAuth} className="text-teal-600 font-semibold text-lg cursor-pointer">logout</p>
               }
            </ul>
        </nav>
    );
}

export default Nav;
