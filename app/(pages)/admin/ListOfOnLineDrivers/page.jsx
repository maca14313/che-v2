'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getonlinedrivers, getonlinedriverstotalnumber,searchonlinedrivers } from '@/app/lib/dbAdmin';


function ListOfOnLineDrivers() {

    const [membersInfo,setMembersInfo]=useState([])
    const [numberOfDrivers,setNumberOfDrivers]=useState('')
    const [searchText,setSearchText]=useState('')


 useEffect(()=>{
    try {
        const fetchData=async()=>{
            const ListOfMembers=await getonlinedriverstotalnumber()
            const ListOfOnLineDrivers=await getonlinedrivers()

            setNumberOfDrivers(ListOfMembers)
            setMembersInfo(ListOfOnLineDrivers)
        }
       fetchData()
    } catch (error) {
        console.log(error)
    }
   
    
    },[]) 

   

    useEffect(() => {
     if (searchText!='') {
      const search=async()=>{
        try {
          const searchMembers=await searchonlinedrivers(searchText)
           setMembersInfo(searchMembers)
  
        } catch (error) {
          
        }
       }
       search()
     }
    }, [searchText]);



   console.log(membersInfo)
        
  return (
    <div className='regCon'>
         
         <div className='titleOfProfile'><h4>Number of OnLine Drivers</h4> <div className='membersLength' style={{display:numberOfDrivers===''?'none':'flex'}}>{numberOfDrivers}</div> </div> 

             <div className='formCon listOfMembersCon listOfMembersConSearch'>
             <input className='row listCon ' type="text" placeholder='🔎  by name or phone number' onChange={(e)=>setSearchText(e.target.value)} />
             </div>
             
             <Link href={''} className='formCon deleteMemberConPaymentText'>Id-cards  ➡️</Link>

          {membersInfo?.sort((a,b)=>b.id-a.id)?.map((m,index)=>(
  <Link href={''} key={m?.id}>
     <div  className='formCon listOfMembersCon' >
       <div className='row listCon payment-page-info-list-border-none' ><div><span className='spanOfList'><div className='margin_right10' style={{color:'#0077ff',display:m?.fatherName==''?'none':'flex'}} >{index+1}</div>{m?.name}  <span className='margin_left10'>{m?.fatherName}</span> </span> </div> <span style={{color:'#0077ff'}}>{m?.phoneNumber}</span>   </div>    
    </div>
  </Link> 
 
    ))}
 
 </div>    
  )
}

export default ListOfOnLineDrivers