export const getPaginationRange =(currentPage,totalPage,nextToPage)=>{
    const range=[];
    const rangeWithDot=[]

    let left=currentPage-nextToPage
    let right = currentPage +nextToPage

    left=Math.max(2,left)
    right =Math.min(totalPage-1,right)
    

    //always show first page
    range.push(1)

    for(let i=left; i<=right; i++){
        range.push(i)
    }

    let prev=null;
    for(let i of range){
        if(prev!=null && i-prev>1){
            rangeWithDot.push("...")
        }
        rangeWithDot.push(i)
        prev=i
    }
    return rangeWithDot
}