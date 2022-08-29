import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


export default function PaginationTab({setPage}) {


  const handlePageChange=(page)=>{
    setPage(page);
    window.scroll(0,0);

  }
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <Pagination size='large' count={50} shape="rounded" style={{backgroundColor:"white"}} onChange={(e)=>handlePageChange(e.target.textContent)}/>
    </div>
  );
}
