import { useState,createContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const user_context = createContext()

const UserContext = ({children}) => {
    const [token,setToken] =useState(()=>{
        const storedToken = localStorage.getItem("token")
        return storedToken ? JSON.parse(storedToken) : null
    })
    const updateToken = (atoken)=>{
        const token = JSON.stringify(atoken)
        localStorage.setItem("token",token)
        setToken(atoken)
    }
    console.log("token from context",token);
    
    useEffect(_=>{
        const storedToken = localStorage.getItem("token")
        if(storedToken){
         setToken(JSON.parse(storedToken))
        }
    },[])
   return (
    <user_context.Provider value={{token,updateToken,setToken}}>
        {children}
    </user_context.Provider>
   )
}



export default UserContext;
