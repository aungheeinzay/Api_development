import {differenceInMinutes,isYesterday,format, differenceInHours, isToday,} from "date-fns"

export const postedTime=(time)=>{
        const now = new Date();
        if(differenceInMinutes(now,time)<1){
            
            return "just note"
        }
        if(differenceInMinutes(now,time)<60){
            const minutes = differenceInMinutes(now,time)
            return `${minutes} mins ago`
        }
        if(differenceInHours(now,time)<24 && isToday(time)){
            const hours = differenceInHours(now,time)
            return `${hours>12 ? hours-12 : hours} h${hours<1 ? "" : "s"} ago`
        }
        if(isYesterday(time)){
            return "yesterday"
        }
        return format(createdAt,'MM/dd')
    }