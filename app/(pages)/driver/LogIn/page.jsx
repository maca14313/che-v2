'use client'


import { regclientdata } from '@/app/lib/dbClient'
import { logindriver } from '@/app/lib/dbDriver'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";






function LogIn() {
  const [driverInfo,setDriverInfo]=useState('')
  const [clientInfoName,setClientInfoName]=useState('')
  const [clientInfoPhone,setClientInfoPhone]=useState('')

  
  
useEffect(() => {
  setDriverInfo(localStorage.getItem('logedDriverData')!="undefined" && localStorage.getItem('logedDriverData')!=null?JSON.parse(localStorage.getItem('logedDriverData')):'')
  setClientInfoName(localStorage.getItem('clientName')!="undefined" && localStorage.getItem('clientName')!=null?JSON.parse(localStorage.getItem('clientName')):'')
  setClientInfoPhone(localStorage.getItem('clientPhone')!="undefined" && localStorage.getItem('clientPhone')!=null?JSON.parse(localStorage.getItem('clientPhone')):'')
  
}, []);

  //const navigate = useNavigate()
  const router = useRouter();


  const [driverDataRes,setDriverDataRes]=useState([])
  const [driverMatch,setDriverMatch]=useState([])

  const [clientName,setClientName]=useState([])



 
  const [driverId,setDriverId]=useState('');
  const [password,setPassword]=useState('');
  

  const registerDriver=async(e)=>{
      e.preventDefault()
              try {
                   
               const driverLogIn=await logindriver(driverId,password)

              setDriverDataRes(driverLogIn)
              localStorage.setItem('logedDriverData',JSON.stringify(driverLogIn))

              setDriverMatch(driverLogIn)

                  } catch (error) {
                      console.log(error)

                   }
                   }
           
if (driverDataRes?.name) {

  if (JSON.parse(localStorage.getItem('senderPhone'))!==null) {
    router.push(`/driver/DriverAvailable`)
    window.location.reload()
  } else {
    router.push(`/driver/DriverHome`)
 
    window.location.reload()
  }


} else {
  
}
   
 const logOut=()=>{
  router.push('/')
       window.location.reload()
       localStorage.removeItem('logedDriverData')
       localStorage.removeItem('clientName')
       localStorage.removeItem('clientPhone')
       
 }
 const setingClientInfo=async(e)=>{
  e.preventDefault();

    try {

       const clientPhoneNumber=clientInfoPhone
       const sendClientData=await regclientdata(clientPhoneNumber,clientName)

       const clientDatas=sendClientData
         
          console.log(clientDatas.clientName)
      localStorage.setItem('clientPhone',JSON.stringify(clientDatas.clientPhoneNumber))
      localStorage.setItem('clientName',JSON.stringify(clientDatas.clientName))
      //setClientPhone(clientDatas.clientPhoneNumber)
        window.location.reload()
        
      
    } catch (error) {
      //setNoNetwork(1)
    }
  
   


  
 }

 

console.log(driverDataRes)

  return (
    <div className='driveSignInCon'>
        <div className='driveLogOutRegisterForm' style={{display:driverInfo?.name || clientInfoName ?'':'none'}}>
       <img className='logedDriverImg' src={''} alt="" />

       {driverInfo?.name? <> <div className='driveLogOutRegisterFormInfo-1' ><div className='driveLogOutRegisterFormInfoPlName' >Name</div> <div className='driveLogOutRegisterFormInfoName'>{driverInfo?.name}</div> </div>

<div className='driveLogOutRegisterFormInfo-1'><div className='driveLogOutRegisterFormInfoPlName' >FatherName</div> <div className='driveLogOutRegisterFormInfoName'>{driverInfo?.fatherName}</div> </div></>
:<> <div className='driveLogOutRegisterFormInfoCon'>

   <div className='driveLogOutRegisterFormInfo' ><div className='driveLogOutRegisterFormInfoPlName' >Name</div> <div className='driveLogOutRegisterFormInfoName'>{clientInfoName}</div> </div>

       <div className='driveLogOutRegisterFormInfo2'><div className='driveLogOutRegisterFormInfoPlName' >Phone-Number</div> <div className='driveLogOutRegisterFormInfoName'>{clientInfoPhone}</div> </div>
       <form className='editNameForm' onSubmit={setingClientInfo}>
       <input className='editInput' type="text" onChange={(e)=>setClientName(e.target.value)}  placeholder='Edit name' required   maxlength = "20" />
       <button className='editBtn'>save</button>
       </form>
       </div>
       </>}

        <button type='submit' className='driveSignInRegisterFormBtn2' onClick={logOut}>Log-Out</button>

        <div><Link href={driverInfo?.name?`/driver/DriverHome`:'/'}>Home</Link></div>

        </div>




        <form className='driveSignInRegisterForm' onSubmit={registerDriver} style={{display:driverInfo?.name || clientInfoName ?'none':''}}>


        <div style={{marginBottom:'20px',color:'blue',fontSize:'30px'}}>{driverDataRes?driverDataRes.name:''}</div>
        <div style={{marginBottom:'20px',color:'red',fontSize:'30px'}}>{driverMatch?driverMatch.tryAgen:''}</div>

       
        <input className='logInInput' type="number" onChange={(e)=>setDriverId(e.target.value)}  placeholder='Id' required />
        <input className='logInInput' type="password" onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' required />





       





         <button type='submit' className='driveSignInRegisterFormBtn'>Log-In</button>
         <div className='signinLinks'><Link className='signinLinks' href={'/driver/SignIn'}>Register</Link> <Link className='signinLinks' href={'/'}>Home</Link></div>



</form>
    </div>
  )
}
  

  
export default LogIn