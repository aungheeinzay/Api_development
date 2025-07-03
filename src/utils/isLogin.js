import { redirect } from "react-router-dom"
import Login from "../pages/Login";

const isLogin = async()=>{
    const jsontoken = localStorage.getItem("token");
    
    if(jsontoken){
    const token = JSON.parse(jsontoken);
    
    const res = await fetch(`${import.meta.env.VITE_API}/status`,{
        method:"GET",
        headers:{
            Authorization: `Bearer ${token.jwtToken}`
        }
    })

    if(res.status===401){
        return redirect("/")
    }else{
        return true
    }
    }else{
        return redirect("/")
    }

}

export default isLogin