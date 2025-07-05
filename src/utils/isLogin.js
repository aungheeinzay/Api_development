import { redirect } from "react-router-dom"


const isLogin = async()=>{
    const jsontoken = localStorage.getItem("token");
    
    if(jsontoken){
    const token = JSON.parse(jsontoken);
    console.log("islogin token",token);
    
    const res = await fetch(`${import.meta.env.VITE_API}/status`,{
        method:"GET",
        headers:{
            Authorization: `Bearer ${token.jwtToken}`
        }
    })

    if(res.status===401){
        localStorage.removeItem("token")
        window.location.reload(false)
        return redirect("/")
    }else{
        return true
    }
    }else{
        return redirect("/")
    }

}

export default isLogin