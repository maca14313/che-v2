'use client'

import React, { useState } from 'react'
import Link from 'next/link';


function SingleDriverInfo() {

  const [driverMatch,setDriverMatch]=useState()

  const [name,setName]=useState('')
  const [fatherName,setFatherName]=useState('')
  const [grandFatherName,setGrandFatherName]=useState('')
  const [gender,setGender]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [phoneNumber2,setPhoneNumber2]=useState('');
  const [city,setCity]=useState('');
  const [address,setAddress]=useState('');
  const [kebale,setKebale]=useState('');
  const [carType,setCarType]=useState('');
  const [carPlate,setCarPlate]=useState('');
  const [driverId,setDriverId]=useState('');
  const [password,setPassword]=useState('');

  return (
    <div className='driveSignInCon'>

         <form className='updateForm' onSubmit={''}>
 
<div className='updateInput'>Name</div>
<input className='updateInput' s type="text" onChange={(e)=>setName(e.target.value)}  placeholder='Name' required />
<div className='updateInput'>Father Name</div>
<input className='updateInput' type="text" onChange={(e)=>setFatherName(e.target.value)}  placeholder='Father Name' required/>
<div className='updateInput'>Grand Father Name</div>
<input className='updateInput' type="text" onChange={(e)=>setGrandFatherName(e.target.value)} placeholder='Grand Father Name' required/>
<div className='updateInput'>Gender</div>
<input className='updateInput' type="text" onChange={(e)=>setGender(e.target.value)} placeholder='Gender' required/>
<div className='updateInput'>Phone Number</div>
<input className='updateInput' type="number" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='Phone Number' required />
<div className='updateInput'>Phone Number2</div>
<input className='updateInput' type="number" onChange={(e)=>setPhoneNumber2(e.target.value)} placeholder='Phone Number2' required />
<div className='updateInput'>City</div>
<input className='updateInput' type="text" onChange={(e)=>setCity(e.target.value)}  placeholder='City' required />
<div className='updateInput'>Address</div>
<input className='updateInput' type="number" onChange={(e)=>setAddress(e.target.value)}  placeholder='Address' required />
<div className='updateInput'>Kebale</div>
<input className='updateInput' type="text" onChange={(e)=>setKebale(e.target.value)}  placeholder='Kebale' required />
<div className='updateInput'>CarType</div>
<input className='updateInput' type="text" onChange={(e)=>setCarType(e.target.value)}  placeholder='CarType' required />
<div className='updateInput'>CarPlate</div>
<input className='updateInput' type="number" onChange={(e)=>setCarPlate(e.target.value)}  placeholder='CarPlate' required />
<div className='updateInput'>Id</div>
<input className='updateInput' type="number" onChange={(e)=>setDriverId(e.target.value)}  placeholder='Id' required />
<div className='updateInput'>Password</div>
<input className='updateInput' type="number" onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' required />
<div className='updateInput'></div>

 <button type='submit' className='driveSignInRegisterFormBtn'>Update</button>



</form>


    </div>
  )
}

export default SingleDriverInfo