"use client"
import React, { useEffect, useState } from 'react'



export default function NavBar() {
    const [langu,setLangu]=useState(1);

      
  return (
    <div className='navbar'>
<div className='con1'>
        <div className='con1son1' style={{display:'none'}}><h1>hello</h1></div>
        <ul className='con1son2'>
          <li className='languLi' >English</li>
          <li className='languLi' >oromiffa</li>
          <li className='languLi' ><small>አማርኛ</small></li>
        


          <li className='languLi' >العربيه</li>
          <li className='languLi'>English</li>
          <li className='languLi'>oromiffa</li>
          <li className='languLi'><small>አማርኛ</small></li>
          <li className='languLi'>العربيه</li>
          
        </ul>

    
            
      </div>
     
      </div>  )
}

