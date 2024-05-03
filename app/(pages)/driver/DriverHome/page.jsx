"use client"

import React, { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import {clearclientinfo, senddriverlocation } from '@/app/lib/dbDriver';
import NavBar from '@/app/comp/NavBar/page';
import DriverFotter from '../DriverFotter/page';








function DriverHome({params}) {
  const router = useRouter();

  
  //const name=params.name[0]
  //const id=params.name[1]
  const [id,setId]=useState('')
  const [name,setName]=useState('')
  const [loc, setLoc] = useState();

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem('logedDriverData')).id)
    setName(JSON.parse(localStorage.getItem('logedDriverData')).name)
   
   }, []);
///////////////////////////////////////////////////////////

useEffect(() => {
  const printCurrentPosition = async () => {

    const showLoc=(coordinates)=>{
       
    }
  
    const error=(err)=>{
     console.warn(
        `ERROR(${err.code}): ${err.message}`
      ); 
    }
  
    const options={
  
      enableHighAccuracy: true,
              timeout: 50000,
              maximumAge: 10000
    }
    const coordinates = await Geolocation.getCurrentPosition(showLoc,error,options);
  
    console.log('Current position:', coordinates.coords);
   
    setLoc(coordinates.coords)
  };

  const sendDriverLocation=async()=>{
    const driverLocation=await senddriverlocation({id,latitude:0,longitude:0})
}
  
  printCurrentPosition()
  sendDriverLocation()
  

 },[]); 

/////////////////////////////////////////////////////////// 


//const driverWithClient=JSON.parse(localStorage.getItem('withClient')) 
const [clearedInfo,setClearedInfo]=useState('')
   

const finished=async()=>{
  try {
     
     const clearClientInfo=await clearclientinfo(id)

     setClearedInfo(clearClientInfo)
     if (clearClientInfo=='cleared') {
          localStorage.removeItem('checkRequist')
          localStorage.removeItem('withClient')
          localStorage.removeItem('message1')
          localStorage.removeItem('message2')
          localStorage.removeItem('message3')
          localStorage.removeItem('message4')
          localStorage.removeItem('message5')
          localStorage.removeItem('message6')
          localStorage.removeItem('message7')
          localStorage.removeItem('message8')
          localStorage.removeItem('message9')
          localStorage.removeItem('message10')
      
       return 'cleared'

     }
    } catch (error) {
     console.log(error)

    }

   
}

const onClick=async()=>{
  const cleared=await finished()
  if (cleared=='cleared') {
  router.push(`/driver/DriverAvailable`)
  //window.location.reload()
  } else {
    alert('no network')
  }
}

const [navI,setNavI]=useState()
useEffect(() => {
  
  setNavI(navigator.onLine)
}, []);


var chy2=`https://maps.google.com/maps?q=${loc?.latitude},${loc?.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

return (
  <div className="homepage">
    <NavBar/>
    <div className='homeBodyCon'>

                   {navI?<iframe width="100%" height="100%" id="gmap_canvas" src={chy2} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" className='iframeMap'></iframe>:<div className='iframeMapNoInternet'  style={{width:'100%',height:'90%',marginBottom:'10px'}}>No Connection</div>}

   <div className='searchCarBtnDriverHomeCon'>
  
       <button onClick={onClick} type='submit' className='searchBtn' >Go-online</button>

  </div>
    </div>
<DriverFotter/>
    </div>
  )
}

export default DriverHome