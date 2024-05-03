"use client"
import Link from 'next/link';

import { FaHouse } from "react-icons/fa6";
import { FaTaxi } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { BsBarChartFill } from "react-icons/bs";


function DriverFotter() {
//const router=useRouter()
  const refreshPage = ()=>{
   window.location.reload();
 } 
  return (
    <div className='footerCon'>
    <div className='iconCon'> <Link style={{margin:'-5px'}} href={``} onClick={refreshPage} ><FaHouse style={{
      width:'15px',
      height:'15px',
      color:'#0077ff'
     }}/> </Link> <div className='iconName'>Home</div></div>
<div className='iconCon' > <Link style={{margin:'-5px'}} href={'/driver/LogIn'}><FaTaxi style={{
      width:'15px',
      height:'15px',
      color:'#0077ff'}}/> </Link><div className='iconName'>Driver</div></div>
<div className='iconCon'> <Link style={{margin:'-5px'}} href={''}> <IoPerson style={{
      width:'15px',
      height:'15px',
      color:'#0077ff'
      }}/> </Link><div className='iconName'>Data</div></div>
<div className='iconCon'> <Link style={{margin:'-5px'}} href={''}> <BsBarChartFill style={{
      width:'15px',
      height:'15px',
      color:'#0077ff'
      }}/></Link> <div className='iconName'>Settings</div></div>





    </div>  )
}

export default DriverFotter