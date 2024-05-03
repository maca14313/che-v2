"use client"


import { cancelsearch, checkdriveracceptance, checkmessagesfromdriver, checktogetherfromclient, cleardrivermessages, regclientdata, resetdriveracceptance, resetride, sendmessagefromclient, sendpassengerlocation } from '@/app/lib/dbClient'
import { useEffect, useState, useRef } from 'react'
import { Geolocation } from '@capacitor/geolocation'

import { IoMdRefresh } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";

import { FaHouse } from "react-icons/fa6";
import { FaTaxi } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { BsBarChartFill } from "react-icons/bs";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import NavBar from '@/app/comp/NavBar/page';
import { resetdriverlocupdate } from '@/app/lib/dbAdmin';















function FindDriverForClient() {

  
  const [driverWithClient,setDriverWithClient]=useState('')

  const [clientPhone,setClientPhone]=useState('')
  const [phone,setPhone]=useState(null)
  const [name,setName]=useState('')
  const [from,setFrom]=useState('')
  const [goTo,setGoTo]=useState('')
  const [price,setPrice]=useState('')


  const [canceledDriverId,setCanceledDriverId]=useState('')
  //const [driverGrandFatherName,setDriverGrandFatherName]=useState(JSON.parse(localStorage.getItem('driverGrandFatherName')))
  const [driverInfo,setDriverInfo]=useState('')


  



   const [messageInput,setMessageInput]=useState(0)




  const [searchBtnOnOf,setSearchBtnOnOf] = useState(clientPhone!=''?'1':null);
  const [clientNumberFormOnOf,setClientNumberFormOnOf] = useState(clientPhone!=''?1:0);


  const [loading,setLoading] = useState(null);

  const [driverFound,setDriverFound] = useState(false);




  

  
  const [closest,setClosest]=useState('')

  const [loc, setLoc] = useState();
  const [loc2, setLoc2] = useState();
  const [locGeo, setLocGeo] = useState([]);
  const [locGeoLat, setLocGeoLat] = useState([]);
  const [locGeoLon, setLocGeoLon] = useState([]);

  const [clientLat,setClientLat]=useState('')
  const [clientLong,setClientLong]=useState('')


  
  const [acceptanceCounter,setAcceptanceCounter] = useState(null);



 const [startCheckDriverAcceptance,setStartCheckDriverAcceptance] = useState(0);
 const [checkDriverAcceptance,setCheckDriverAcceptance] = useState('');

 const [delay,setDelay] = useState(0);
 const [regectedDelay,setRegectedDelay] = useState(0);
 const [withDriver,setWithDriver] = useState(0);
 const [driverInfoView,setDriverInfoView] = useState(0);
 const [noDriver,setNoDriver] = useState(0);
 const [noNetwork,setNoNetwork] = useState(0);
 const [shourBtn,setShourBtn] = useState(0);

 const [notToGether,setNotToGether] = useState(0);


 const [messageOnoOfBtn,setMessageOnOfBtn] = useState(0);



 let noResponse=useRef();
 let noResponse2=useRef();

 const router = useRouter();


 useEffect(() => {
  setDriverWithClient(localStorage.getItem('withClient')!="undefined" && localStorage.getItem('withClient')!=null?JSON.parse(localStorage.getItem('withClient')):'')
  setClientPhone(localStorage.getItem('clientPhone')!="undefined" && localStorage.getItem('clientPhone')!=null?JSON.parse(localStorage.getItem('clientPhone')):'')
  setName(JSON.parse(localStorage.getItem('clientName')))
  setFrom(JSON.parse(localStorage.getItem('from')))
  setGoTo(JSON.parse(localStorage.getItem('goTo')))
  setPrice(JSON.parse(localStorage.getItem('price')))
  setCanceledDriverId(JSON.parse(localStorage.getItem('canceledDriverId')))
  setDriverInfo(localStorage.getItem('logedDriverData')!="undefined" && localStorage.getItem('logedDriverData')!=null?JSON.parse(localStorage.getItem('logedDriverData')):'')
  setClosest(JSON.parse(localStorage.getItem('driverData')))
  setCheckDriverAcceptance(localStorage.getItem('checkDriverAcceptance')!='undefined' && localStorage.getItem('checkDriverAcceptance')!=null?JSON.parse(localStorage.getItem('checkDriverAcceptance')):[]);

  setClientLat(localStorage.getItem('clientLat')!='undefined' && localStorage.getItem('clientLat')!=null?JSON.parse(localStorage.getItem('clientLat')):'')
  setClientLong(localStorage.getItem('clientLong')!='undefined' && localStorage.getItem('clientLong')!=null?JSON.parse(localStorage.getItem('clientLong')):'')
  
 }, []);

///////////////////////////////////////////////////////////////////////////////
 const [data, setdata] = useState([]);

 useEffect(() => {
  if (driverWithClient==1) {
     router.push(`/driver/DriverAvailable`)
     
    } else if(driverInfo?.name){
      router.push(`/driver/DriverHome`)
    }
 },[]);

 useEffect(() => {
  const printCurrentPosition = async () => {

    const showLoc=(coordinates)=>{
        setLoc(coordinates?.coords)
     
    }
  
    const error=(err)=>{
     console.warn(
        `ERROR(${err.code}): ${err.message}`
      ); 
    }
  
    const options={
  
      enableHighAccuracy: true,
              timeout: 50000,
              maximumAge:0,
    }
    const coordinates = await Geolocation.watchPosition(options,showLoc,error);
  
    console.log('Current position:', coordinates?.coords);
    setLocGeo(coordinates?.coords?.latitude)
    setLocGeoLat(coordinates?.coords?.latitude)
    setLocGeoLon(coordinates?.coords?.longitude)
    setLoc(coordinates?.coords)
  };
  printCurrentPosition()
 }, []);
 
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
              maximumAge:0,
    }
    const coordinates = await Geolocation.getCurrentPosition(showLoc,error,options);
  
    console.log('Current position:', coordinates?.coords);
    setLocGeo(coordinates?.coords?.latitude)
    setLocGeoLat(coordinates?.coords?.latitude)
    setLocGeoLon(coordinates?.coords?.longitude)
    setLoc2(coordinates?.coords)
  };
  printCurrentPosition()
 }, []); 


 const driverAcceptance= checkDriverAcceptance?.driverAcceptance
useEffect(() => {

  if (clientPhone=='') {
    setSearchBtnOnOf(null)
  }
  
  
  if (driverAcceptance==1) {
    start()
    setLoading(null)
    setStartCheckDriverAcceptance(0)
    setWithDriver(1)
    setSearchBtnOnOf(null)
    setDriverInfoView(true)
    return () => clearTimeout(noResponse2.current);

  }
 

 if (driverAcceptance==2) {
    clearTimeout(noResponse2.current);
    setSearchBtnOnOf(null)
    setRegectedDelay(1)
    const resetDriverAcceptance=async()=>{

      const checkResetAcceptanceDriver= await resetdriveracceptance(clientPhone)

     setCheckDriverAcceptance([])
    }
   
    switch (null) {
      case JSON.parse(localStorage.getItem('unacceptance1')):
        localStorage.setItem('unacceptance1',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')

        setAcceptanceCounter(1)
        resetDriverAcceptance()

        break;
      case JSON.parse(localStorage.getItem('unacceptance2')):
        localStorage.setItem('unacceptance2',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(2)
       // setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()

        break;
      case JSON.parse(localStorage.getItem('unacceptance3')):
        localStorage.setItem('unacceptance3',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(3)
        //setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance4')):
        localStorage.setItem('unacceptance4',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(4)
        //setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance5')):
        localStorage.setItem('unacceptance5',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(5)
       // setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance6')):
        localStorage.setItem('unacceptance6',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(6)
        //setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance7')):
        localStorage.setItem('unacceptance7',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(7)
        //setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance8')):
        localStorage.setItem('unacceptance8',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(8)
       // setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('unacceptance9')):
        localStorage.setItem('unacceptance9',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(9)
       // setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      case JSON.parse(localStorage.getItem('uacceptance10')):
        localStorage.setItem('unacceptance10',JSON.stringify(checkDriverAcceptance.driverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(10)
        //setStartCheckDriverAcceptance(0)
        resetDriverAcceptance()
        break;
      default:
        console.log("I don't own a pet");
        break;
    }


  }


  if (delay==1) {

         setDelay(0)
         
  
   const resetDriverAcceptance=async()=>{

      const cancelSearchOfClient=await cancelsearch(canceledDriverId)


    }
   resetDriverAcceptance()
          
    switch (null) {
      case JSON.parse(localStorage.getItem('unacceptance1')):
        localStorage.setItem('unacceptance1',JSON.stringify(canceledDriverId))
        
        localStorage.removeItem('checkDriverAcceptance')

        setAcceptanceCounter(1)

       

        break;
      case JSON.parse(localStorage.getItem('unacceptance2')):
        localStorage.setItem('unacceptance2',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(2)

    

        break;
      case JSON.parse(localStorage.getItem('unacceptance3')):
        localStorage.setItem('unacceptance3',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(3)

       
        
        break;
      case JSON.parse(localStorage.getItem('unacceptance4')):
        localStorage.setItem('unacceptance4',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(4)

       
       
        break;
      case JSON.parse(localStorage.getItem('unacceptance5')):
        localStorage.setItem('unacceptance5',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(5)

     
        break;
      case JSON.parse(localStorage.getItem('unacceptance6')):
        localStorage.setItem('unacceptance6',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(6)

       
        break;
      case JSON.parse(localStorage.getItem('unacceptance7')):
        localStorage.setItem('unacceptance7',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(7)

       
        break;
      case JSON.parse(localStorage.getItem('unacceptance8')):
        localStorage.setItem('unacceptance8',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(8)

      
        break;
      case JSON.parse(localStorage.getItem('unacceptance9')):
        localStorage.setItem('unacceptance9',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(9)    

      
        break;
      case JSON.parse(localStorage.getItem('unacceptance10')):
        localStorage.setItem('unacceptance10',JSON.stringify(canceledDriverId))
        localStorage.removeItem('checkDriverAcceptance')
        setAcceptanceCounter(10)

        
        break;
      default:
        console.log("I don't own a pet");
        break;
    }


  }
  

}, [checkDriverAcceptance,delay]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const setingClientInfo=async(e)=>{
  e.preventDefault();

    try {

     /* const sendClientData=await axios.post(`${apiHttp}/regclientdata`,{
        clientPhoneNumber:phone,
        clientName:name,
      })*/
      const clientPhoneNumber=phone
      const clientName=name
      const sendClientData=await regclientdata(clientPhoneNumber,clientName)


           //const clientDatas=sendClientData.data
           const clientDatas=sendClientData

         
          console.log(clientDatas.clientName)
      localStorage.setItem('clientPhone',JSON.stringify(clientDatas.clientPhoneNumber))
      localStorage.setItem('clientName',JSON.stringify(clientDatas.clientName))
      setClientPhone(clientDatas.clientPhoneNumber)
        window.location.reload()
        
      
    } catch (error) {
      setNoNetwork(1)
    }
  
 }


 const sendPassengerLocation=async(e)=>{
  resetdriverlocupdate()

  e.preventDefault() 
     if (loc?.latitude!=undefined) {
      try {
        resetAll2()

        const passengerData={
          clientPhone:clientPhone,
          name:name,
          latitude:clientLat,
          longitude:clientLong,
          from:from?from:JSON.parse(localStorage.getItem('from')),
          goTo:goTo?goTo:JSON.parse(localStorage.getItem('goTo')),
          price:price?price:JSON.parse(localStorage.getItem('price')), 
          driverId1:0,
          driverId2:0,
          driverId3:0,
          driverId4:0,
          driverId5:0,
          driverId6:0,
          driverId7:0,
          driverId8:0,
          driverId9:0,
          driverId10:0,
        }
        const passengerLocation=await sendpassengerlocation(passengerData)
        console.log(passengerLocation)
       
        const searchRes =passengerLocation
          if (searchRes.good=='good') {
          setCanceledDriverId(searchRes.id)
          localStorage.setItem('canceledDriverId',JSON.stringify(searchRes.id))
          setSearchBtnOnOf(null)
          setLoading(1)
          setClosest(passengerLocation)
          setStartCheckDriverAcceptance(1)
        }else{
          setNoDriver(1)
        }

      
      } catch (error) {
        setNoNetwork(1)
      }
     }
   
    }


    const searchCancel=async()=>{
      try {
        window.location.reload()
        setCheckDriverAcceptance([])
        localStorage.removeItem('checkDriverAcceptance')
        localStorage.removeItem('canceledDriverId')
        localStorage.removeItem('unacceptance1')
        localStorage.removeItem('unacceptance2')
        localStorage.removeItem('unacceptance3')
        localStorage.removeItem('unacceptance4')
        localStorage.removeItem('unacceptance5')
        localStorage.removeItem('unacceptance6')
        localStorage.removeItem('unacceptance7')
        localStorage.removeItem('unacceptance8')
        localStorage.removeItem('unacceptance9')
        localStorage.removeItem('unacceptance10')

        const cancelSearchOfClient=await cancelsearch(canceledDriverId)
        const checkResetAcceptanceDriver= await resetdriveracceptance(clientPhone)

      } catch (error) {
        
      }
}

let intervalID; 
        useEffect(() => {
            if (startCheckDriverAcceptance==1) {

              intervalID = setInterval(async() => {
                const checkDriver=await checkdriveracceptance(clientPhone)
                console.log(checkDriver) 
                  setCheckDriverAcceptance(checkDriver)
                  localStorage.setItem('checkDriverAcceptance',JSON.stringify(checkDriver))
              }, 5000);
  
              return () => clearInterval(intervalID);
             } else {
              
             }
         
        }, [startCheckDriverAcceptance]);


        useEffect(() => {

          if (startCheckDriverAcceptance==1 && acceptanceCounter==null ) {
      
              noResponse.current= setTimeout(async() => {
      
                const checkDriver=await checkdriveracceptance(clientPhone)

                         const ifAccepted=checkDriver
                if (ifAccepted.driverAcceptance!=1) {
                  console.log('noot accepted')
                  setDelay(1)
                  start()
                }
                
              }, 30000);
      
              return () => clearTimeout(noResponse.current);
             
             } else {
              
             }  
         
        }, [startCheckDriverAcceptance,acceptanceCounter]); 


        const resetAll=async()=>{
              

          const checkResetRide=await resetride(clientPhone)
             if (checkResetRide=='resetride') {
              window.location.reload()
              
              setCheckDriverAcceptance([])
              localStorage.removeItem('checkDriverAcceptance')
              localStorage.removeItem('canceledDriverId')
              localStorage.removeItem('unacceptance1')
              localStorage.removeItem('unacceptance2')
              localStorage.removeItem('unacceptance3')
              localStorage.removeItem('unacceptance4')
              localStorage.removeItem('unacceptance5')
              localStorage.removeItem('unacceptance6')
              localStorage.removeItem('unacceptance7')
              localStorage.removeItem('unacceptance8')
              localStorage.removeItem('unacceptance9')
              localStorage.removeItem('unacceptance10')

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

      
             }
            }


            const resetAll2=async()=>{

              const checkResetRide=await resetride(clientPhone)
                 if (checkResetRide=='resetride') {
                  setCheckDriverAcceptance([])
                  localStorage.removeItem('checkDriverAcceptance')
                  localStorage.removeItem('canceledDriverId')
                  localStorage.removeItem('unacceptance1')
                  localStorage.removeItem('unacceptance2')
                  localStorage.removeItem('unacceptance3')
                  localStorage.removeItem('unacceptance4')
                  localStorage.removeItem('unacceptance5')
                  localStorage.removeItem('unacceptance6')
                  localStorage.removeItem('unacceptance7')
                  localStorage.removeItem('unacceptance8')
                  localStorage.removeItem('unacceptance9')
                  localStorage.removeItem('unacceptance10')

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

                 }
                }


                useEffect(() => {
                  resetdriverlocupdate()

                 if(checkDriverAcceptance?.driverAcceptance==2 || delay==1){
                  console.log('delay1')
                  try {
                    const resetDriverAcceptance=async()=>{
                      const checkResetAcceptanceDriver= await resetdriveracceptance(clientPhone)
                     setCheckDriverAcceptance([])
                    }
                    resetDriverAcceptance()
                  } catch (error) {
                    
                  }
                
                  localStorage.removeItem('checkDriverAcceptance')
                    //console.log(acceptanceCounter)
                    const sendPassengerLocation=async()=>{
                      const passengerData= {
                        clientPhone:clientPhone,
                        name:name,
                        latitude:JSON.parse(localStorage.getItem('clientLat'))?JSON.parse(localStorage.getItem('clientLat')):'0',
                        longitude:JSON.parse(localStorage.getItem('clientLong'))?JSON.parse(localStorage.getItem('clientLong')):'0',
                        from:JSON.parse(localStorage.getItem('from'))?JSON.parse(localStorage.getItem('from')):'0',
                        goTo:JSON.parse(localStorage.getItem('goTo'))?JSON.parse(localStorage.getItem('goTo')):'0',
                        price:JSON.parse(localStorage.getItem('price'))?JSON.parse(localStorage.getItem('price')):'0',
                        driverId1:JSON.parse(localStorage.getItem('unacceptance1'))?JSON.parse(localStorage.getItem('unacceptance1')):0,
                        driverId2:JSON.parse(localStorage.getItem('unacceptance2'))?JSON.parse(localStorage.getItem('unacceptance2')):0,
                        driverId3:JSON.parse(localStorage.getItem('unacceptance3'))?JSON.parse(localStorage.getItem('unacceptance3')):0,
                        driverId4:JSON.parse(localStorage.getItem('unacceptance4'))?JSON.parse(localStorage.getItem('unacceptance4')):0,
                        driverId5:JSON.parse(localStorage.getItem('unacceptance5'))?JSON.parse(localStorage.getItem('unacceptance5')):0,
                        driverId6:JSON.parse(localStorage.getItem('unacceptance6'))?JSON.parse(localStorage.getItem('unacceptance6')):0,
                        driverId7:JSON.parse(localStorage.getItem('unacceptance7'))?JSON.parse(localStorage.getItem('unacceptance7')):0,
                        driverId8:JSON.parse(localStorage.getItem('unacceptance8'))?JSON.parse(localStorage.getItem('unacceptance8')):0,
                        driverId9:JSON.parse(localStorage.getItem('unacceptance9'))?JSON.parse(localStorage.getItem('unacceptance9')):0,
                        driverId10:JSON.parse(localStorage.getItem('unacceptance10'))?JSON.parse(localStorage.getItem('unacceptance10')):0,
                      }

                      const passengerLocation=await sendpassengerlocation(passengerData)
                     
                     
                      const searchRes =passengerLocation
                    if (searchRes.good=='good') {
                    setCanceledDriverId(searchRes.id)
                    localStorage.setItem('canceledDriverId',JSON.stringify(searchRes.id))
                    setClosest(passengerLocation)
        
                   
        
                    noResponse2.current= setTimeout(async() => {
                      const checkDriver=await checkdriveracceptance(clientPhone)

                               const ifAccepted=checkDriver
                      if (ifAccepted.driverAcceptance!=1) {
                        console.log('noot accepted2')
                        setDelay(1)
                        start()
                      }
                      
                    }, 30000);
            
                    return () => clearTimeout(noResponse2.current);
        
                   
                    
                   
        
                
              
              
                     
               
        
                  }else{
                    console.log('delay0')
                    window.location.reload()
                    setNoDriver(1)
                    setSearchBtnOnOf(1)
                    setLoading(null)
                    setStartCheckDriverAcceptance(0)
                    setCheckDriverAcceptance([])
                    localStorage.removeItem('checkDriverAcceptance')
                    localStorage.removeItem('canceledDriverId')
                    localStorage.removeItem('unacceptance1')
                    localStorage.removeItem('unacceptance2')
                    localStorage.removeItem('unacceptance3')
                    localStorage.removeItem('unacceptance4')
                    localStorage.removeItem('unacceptance5')
                    localStorage.removeItem('unacceptance6')
                    localStorage.removeItem('unacceptance7')
                    localStorage.removeItem('unacceptance8')
                    localStorage.removeItem('unacceptance9')
                    localStorage.removeItem('unacceptance10')

                    const cancelSearchOfClient=await cancelsearch(canceledDriverId)
                    const checkResetAcceptanceDriver= await resetdriveracceptance(clientPhone)
                    
                  }
        
                     }
                      sendPassengerLocation()
        
                  } else {
                    
                  }
                 
                }, [acceptanceCounter,delay]);


                const start = () => {
                } 
                
                const refreshPage = ()=>{
                  window.location.reload();
               }

//////////////////////////////////// message ///////////////////////////////////////////JSON.parse(localStorage.getItem('message1'))
const [message1,setMessage1]=useState('')
const [message2,setMessage2]=useState('')
const [message3,setMessage3]=useState('')
const [message4,setMessage4]=useState('')
const [message5,setMessage5]=useState('')
const [message6,setMessage6]=useState('')
const [message7,setMessage7]=useState('')
const [message8,setMessage8]=useState('')
const [message9,setMessage9]=useState('')
const [message10,setMessage10]=useState('')

useEffect(() => {
setMessage1(localStorage.getItem('message1')!='undefined' && localStorage.getItem('message1')!=null?JSON.parse(localStorage.getItem('message1')):'')
setMessage2(localStorage.getItem('message2')!='undefined' && localStorage.getItem('message2')!=null?JSON.parse(localStorage.getItem('message2')):'')
setMessage3(localStorage.getItem('message3')!='undefined' && localStorage.getItem('message3')!=null?JSON.parse(localStorage.getItem('message3')):'')
setMessage4(localStorage.getItem('message4')!='undefined' && localStorage.getItem('message4')!=null?JSON.parse(localStorage.getItem('message4')):'')
setMessage5(localStorage.getItem('message5')!='undefined' && localStorage.getItem('message5')!=null?JSON.parse(localStorage.getItem('message5')):'')
setMessage6(localStorage.getItem('message6')!='undefined' && localStorage.getItem('message6')!=null?JSON.parse(localStorage.getItem('message6')):'')
setMessage7(localStorage.getItem('message7')!='undefined' && localStorage.getItem('message7')!=null?JSON.parse(localStorage.getItem('message7')):'')
setMessage8(localStorage.getItem('message8')!='undefined' && localStorage.getItem('message8')!=null?JSON.parse(localStorage.getItem('message8')):'')
setMessage9(localStorage.getItem('message9')!='undefined' && localStorage.getItem('message9')!=null?JSON.parse(localStorage.getItem('message9')):'')
setMessage10(localStorage.getItem('message10')!='undefined' && localStorage.getItem('message10')!=null?JSON.parse(localStorage.getItem('message10')):'')

  
}, []);

 const sendMessages=async(e)=>{
  e.preventDefault() 
    try {
      const sendMessage=await sendmessagefromclient(messageInput,clientPhone)

        const message=sendMessage
              
              switch (null) {
                case JSON.parse(localStorage.getItem('message1')):
                  localStorage.setItem('message1',JSON.stringify(message))
                  setMessage1(message)
      
                  break;
                case JSON.parse(localStorage.getItem('message2')):
                  localStorage.setItem('message2',JSON.stringify(message))
                  setMessage2(message)
      
                 
                  break;
                case JSON.parse(localStorage.getItem('message3')):
                  localStorage.setItem('message3',JSON.stringify(message))
                  setMessage3(message)
      
                  
                  break;
                case JSON.parse(localStorage.getItem('message4')):
                  localStorage.setItem('message4',JSON.stringify(message))
                  setMessage4(message)
      
      
                  break;
                case JSON.parse(localStorage.getItem('message5')):
                  localStorage.setItem('message5',JSON.stringify(message))
                  setMessage5(message)
      
                 
                  break;
                  
                case JSON.parse(localStorage.getItem('message6')):
                  localStorage.setItem('message6',JSON.stringify(message))
                  setMessage6(message)
      
                  
                  
                  break;
                case JSON.parse(localStorage.getItem('message7')):
                  localStorage.setItem('message7',JSON.stringify(message))
                  setMessage7(message)
      
                  
                  break;
                case JSON.parse(localStorage.getItem('message8')):
                  localStorage.setItem('message8',JSON.stringify(message))
                  setMessage8(message)
      
                 
                  break;
                case JSON.parse(localStorage.getItem('message9')):
                  localStorage.setItem('message9',JSON.stringify(message))
                  setMessage9(message)
      
                 
                  break;
                case JSON.parse(localStorage.getItem('message10')):
                  localStorage.setItem('message10',JSON.stringify(message))
                  setMessage10(message)
      
                  
                  break; 
                  case JSON.parse(localStorage.getItem('message11')):


                  
     
                    localStorage.removeItem('message1')
                    localStorage.setItem('message1',JSON.stringify(JSON.parse(localStorage.getItem('message2'))))
                    setMessage1(JSON.parse(localStorage.getItem('message2')))
      
                    localStorage.removeItem('message2')
                    localStorage.setItem('message2',JSON.stringify(JSON.parse(localStorage.getItem('message3'))))
                    setMessage2(JSON.parse(localStorage.getItem('message3')))
      
                    localStorage.removeItem('message3')
                    localStorage.setItem('message3',JSON.stringify(JSON.parse(localStorage.getItem('message4'))))
                    setMessage3(JSON.parse(localStorage.getItem('message4')))
      
                    localStorage.removeItem('message4')
                    localStorage.setItem('message4',JSON.stringify(JSON.parse(localStorage.getItem('message5'))))
                    setMessage4(JSON.parse(localStorage.getItem('message5')))

                    localStorage.removeItem('message5')
                    localStorage.setItem('message5',JSON.stringify(JSON.parse(localStorage.getItem('message6'))))
                    setMessage5(JSON.parse(localStorage.getItem('message6')))
      
                    localStorage.removeItem('message6')
                    localStorage.setItem('message6',JSON.stringify(JSON.parse(localStorage.getItem('message7'))))
                    setMessage6(JSON.parse(localStorage.getItem('message7')))
      
                    localStorage.removeItem('message7')
                    localStorage.setItem('message7',JSON.stringify(JSON.parse(localStorage.getItem('message8'))))
                    setMessage7(JSON.parse(localStorage.getItem('message8')))
      
                    localStorage.removeItem('message8')
                    localStorage.setItem('message8',JSON.stringify(JSON.parse(localStorage.getItem('message9'))))
                    setMessage8(JSON.parse(localStorage.getItem('message9')))
      
                    localStorage.removeItem('message9')
                    localStorage.setItem('message9',JSON.stringify(JSON.parse(localStorage.getItem('message10'))))
                    setMessage9(JSON.parse(localStorage.getItem('message10')))
      
                    localStorage.removeItem('message10')
                    localStorage.setItem('message10',JSON.stringify(message))
                    setMessage10(message) 
      
                    break;  
                default:
                  console.log("I don't own a pet");
                  break;
              }

            

    } catch (error) {
      
    }
}
        
let together;

  const [clientMessageView,setClientMessageView]=useState('')


  useEffect(()=>{

    if(checkDriverAcceptance?.driverAcceptance=='1'){
     together=setInterval(async()=>{
       try {
         const checkMessages= await checkmessagesfromdriver(clientPhone)
         const message=checkMessages
         setClientMessageView(message?.textMessage)
         

        if(message?.noMessage!='noMessage'){
         setMessageOnOfBtn(1)
         switch (null) {
           case JSON.parse(localStorage.getItem('message1')):
             localStorage.setItem('message1',JSON.stringify(message))
             setMessage1(message)
             await cleardrivermessages(clientPhone)
             
       
             break;
           case JSON.parse(localStorage.getItem('message2')):
             localStorage.setItem('message2',JSON.stringify(message))
             setMessage2(message)
             await cleardrivermessages(clientPhone)
 
            
             break;
           case JSON.parse(localStorage.getItem('message3')):
             localStorage.setItem('message3',JSON.stringify(message))
             setMessage3(message)
             await cleardrivermessages(clientPhone)
 
             
             break;
           case JSON.parse(localStorage.getItem('message4')):
             localStorage.setItem('message4',JSON.stringify(message))
             setMessage4(message)
             await cleardrivermessages(clientPhone)
 
 
             break;
           case JSON.parse(localStorage.getItem('message5')):
             localStorage.setItem('message5',JSON.stringify(message))
             setMessage5(message)
             await cleardrivermessages(clientPhone)
 
            
             break;
             
           case JSON.parse(localStorage.getItem('message6')):
             localStorage.setItem('message6',JSON.stringify(message))
             setMessage6(message)
             await cleardrivermessages(clientPhone)
 
             
             
             break;
           case JSON.parse(localStorage.getItem('message7')):
             localStorage.setItem('message7',JSON.stringify(message))
             setMessage7(message)
             await cleardrivermessages(clientPhone)
 
             
             break;
           case JSON.parse(localStorage.getItem('message8')):
             localStorage.setItem('message8',JSON.stringify(message))
             setMessage8(message)
             await cleardrivermessages(clientPhone)
 
            
             break;
           case JSON.parse(localStorage.getItem('message9')):
             localStorage.setItem('message9',JSON.stringify(message))
             setMessage9(message)
             await cleardrivermessages(clientPhone)
 
            
             break;
           case JSON.parse(localStorage.getItem('message10')):
             localStorage.setItem('message10',JSON.stringify(message))
             setMessage10(message)
             await cleardrivermessages(clientPhone)
 
             
             break; 
             case JSON.parse(localStorage.getItem('message11')):
 
               localStorage.removeItem('message1')
               localStorage.setItem('message1',JSON.stringify(JSON.parse(localStorage.getItem('message2'))))
               setMessage1(JSON.parse(localStorage.getItem('message2')))
 
               localStorage.removeItem('message2')
               localStorage.setItem('message2',JSON.stringify(JSON.parse(localStorage.getItem('message3'))))
               setMessage2(JSON.parse(localStorage.getItem('message3')))
 
               localStorage.removeItem('message3')
               localStorage.setItem('message3',JSON.stringify(JSON.parse(localStorage.getItem('message4'))))
               setMessage3(JSON.parse(localStorage.getItem('message4')))
 
               localStorage.removeItem('message4')
               localStorage.setItem('message4',JSON.stringify(JSON.parse(localStorage.getItem('message5'))))
               setMessage4(JSON.parse(localStorage.getItem('message5')))
 
              localStorage.removeItem('message5')
               localStorage.setItem('message5',JSON.stringify(JSON.parse(localStorage.getItem('message6'))))
               setMessage5(JSON.parse(localStorage.getItem('message6')))
 
               localStorage.removeItem('message6')
               localStorage.setItem('message6',JSON.stringify(JSON.parse(localStorage.getItem('message7'))))
               setMessage6(JSON.parse(localStorage.getItem('message7')))
 
               localStorage.removeItem('message7')
               localStorage.setItem('message7',JSON.stringify(JSON.parse(localStorage.getItem('message8'))))
               setMessage7(JSON.parse(localStorage.getItem('message8')))
 
               localStorage.removeItem('message8')
               localStorage.setItem('message8',JSON.stringify(JSON.parse(localStorage.getItem('message9'))))
               setMessage8(JSON.parse(localStorage.getItem('message9')))
 
               localStorage.removeItem('message9')
               localStorage.setItem('message9',JSON.stringify(JSON.parse(localStorage.getItem('message10'))))
               setMessage9(JSON.parse(localStorage.getItem('message10')))
 
               localStorage.removeItem('message10')
               localStorage.setItem('message10',JSON.stringify(message))
               setMessage10(message)  
 
               
               await cleardrivermessages(clientPhone)
   
               
               break;  
           default:
             console.log("I don't own a pet");
             break;
         }
       
        }
 
        const checkTogether= await checktogetherfromclient(clientPhone?clientPhone:'0',checkDriverAcceptance.driverPhoneNumber1?checkDriverAcceptance.driverPhoneNumber1:'0')
            if(checkTogether=='no'){
            setNotToGether(1)
             
            }
           
       } catch (error) {
         
       }
      },5000)
 
      return ()=>clearInterval(together)

   }
    
 },[checkDriverAcceptance,withDriver,message10,message1,message2,message3,message4,message5,message6,message7,message8,message9])

const [clientLoc,setClientLoc]=useState(`https://maps.google.com/maps?q=${clientLat},${clientLong}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
useEffect(() => {

  setClientLoc(`https://maps.google.com/maps?q=${clientLat},${clientLong}&t=&z=15&ie=UTF8&iwloc=&output=embed`)

}, [clientLat,clientLong]);

 useEffect(() => {
  const getData=async()=>{
    try {
      
      const response = await  sendpassengerlocation(passengerData);
      console.log(response)
     //setdata(response);      
      }
      
      catch (error) {
      
      console.log(error);
      
      
      }
  }
  //getData()  

  
 }, []);

 const [navI,setNavI]=useState()
useEffect(() => {
  
  setNavI(navigator.onLine)
}, []);

 console.log(driverInfo)


console.log(clientLat)
  return (
     <div className="homepage">
     <NavBar/>

  <div className='homeBodyCon'>

  
  {navI?<iframe className='iframeMap' width="100%"    id="gmap_canvas" src={clientLoc} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" style={{marginBottom:searchBtnOnOf==1?'20%':'2%'}} ></iframe>:<div className='iframeMapNoInternet iframeMap' >No Connection</div>} 


  <div style={{display:notToGether==1?'':'none'}} className="notification">
   <div>Driver have left</div> <button class="notificationBtn" onClick={resetAll}>OK</button>

    
 </div>


        {clientNumberFormOnOf==0? <form className='clientNumberForm clientNumberFormSmall' onSubmit={setingClientInfo} style={{display:driverInfo!=''?'none':''}}>
          
         <div className='clientNumberFormInputError' style={{display:noNetwork==1?'':'none'}} ><h6>No Network</h6></div>

          <input className='clientNumberFormInput' type="text" required placeholder='Name' onChange={(e)=>setName(e.target.value)} title='over load' maxlength = "20" />
          <input className='clientNumberFormInput' type="tel" required placeholder='Mobile Number ' onChange={(e)=>setPhone(e.target.value)} title="Please use a 10 digit telephone number with no dashes or dots" pattern="[0-9]{10}"  />
          <div className='clientNumberFormInputBtnCon'><button className='clientNumberFormBtn' type='submit'>Next</button></div>
          
         </form>:'' }

         
                                                                                                   
         
         {searchBtnOnOf==1? <div className='searchCarBtnBodyCfooter searchCarBtnBodyFindClientCon'> 
        
         <form className='clientNumberFormTo' onSubmit={sendPassengerLocation}  style={{display:driverInfo!=''?'none':''}}>
          
          <div className='driverNotFoundTo' style={{display:noNetwork==1?'':'none'}} ><h6>No Network</h6></div>
                   <div className='driverNotFoundTo' style={{display:noDriver==1?'':'none'}}><h6>No Driver</h6></div>


 
             <input className='clientNumberFormInputTo' type="text" required placeholder='Latitude'   title='over load' maxlength = "100" onChange={(e)=>(
            setClientLat(e.target.value),
            localStorage.setItem('clientLat',JSON.stringify(e.target.value))

            )}/>
             <input className='clientNumberFormInputTo' type="text" required placeholder='Longitude' title='over load' maxlength = "100" onChange={(e)=>(
            setClientLong(e.target.value),
            localStorage.setItem('clientLong',JSON.stringify(e.target.value))

            )}/>

             <input className='clientNumberFormInputTo' type="text" required placeholder='From'  onChange={(e)=>(
            setFrom(e.target.value),
            localStorage.setItem('form',JSON.stringify(e.target.value))

            )} title='over load' maxlength = "100"/>
           <input className='clientNumberFormInputTo' type="text" required placeholder='To' onChange={(e)=>(
            setGoTo(e.target.value),
            localStorage.setItem('goTo',JSON.stringify(e.target.value))

            )} title='over load' maxlength = "100"/>
           <input className='clientNumberFormInputTo' type="number" required placeholder='Birr' onChange={(e)=>(
            setPrice(e.target.value),
            localStorage.setItem('price',JSON.stringify(e.target.value))

            )} title="Please use a 4 digit number" maxlength = "4"   />
 
             
          
             <button type='submit' className='searchBtn'  >Search</button>

          </form>
          
      
         </div>:''}
        

        {loading==1?<div className='CircularProgressConN' > 
        <div class="loaderCancel" onClick={searchCancel}>x</div>
        <div class="loader">Loading...</div> </div>:''}

     

        {withDriver==1? <div className='loadingCon' style={{maxHeight:driverInfoView==true?'130px':'110px',minHeight:driverInfoView==true?'130px':'110px'}}>

        <div className='iconConRefreshDriverInfo' style={{display:driverInfoView==1?'':'none'}}> <Link style={{margin:'-5px'}} href={''}> <IoMdRefresh onClick={refreshPage}  style={{
          width:'30px',
          height:'30px',
          color:'#0077ff'
          }}/> </Link> </div>

       <IoMdArrowDropdown onClick={()=>(
            setDriverInfoView(false),
            setDriverFound(!driverFound),
            setMessageOnOfBtn(0)
            )}   style={{
            display:driverInfoView==false?'none':'',
            width:'70px',
            height:'70px',
            marginRight:'25px',
            marginBottom:'3px',
            color:'black',
            borderRadius: '10px',
            position:'absolute',
            top:'-37px',
            right:'-30px',
  
            "&:hover":{
              borderRadius:'50%',
              padding:'2px',
              color:'salmon'
  
            }
            ,
            "&:active":{
              borderRadius:'50%',
              padding:'2px',
              color:'lightgray'
  
            },}}/> <IoMdArrowDropdown onClick={()=>(
                setDriverInfoView(1),
                setDriverFound(!driverFound),
                setShourBtn(0)
                )}    style={{
            display:driverInfoView==1 ?'none':'',
            width:'70px',
            height:'70px',
            marginRight:'25px',
            marginBottom:'3px',
            color:'black',
            borderRadius: '10px',
            position:'absolute',
            top:'-37px',
            right:'-30px',

  
            "&:hover":{
              borderRadius:'50%',
              padding:'2px',
              color:'salmon'
  
            }
            ,
            "&:active":{
              borderRadius:'50%',
              padding:'2px',
              color:'lightgray'
  
            },}}/>




         



          {shourBtn==1?<div className='shourBtnConTitle'>are you sure </div>:''}
         {shourBtn==1?<div className='shourBtnCon' > <button className='shourBtnConYes' onClick={resetAll}>YES</button> <button className='shourBtnConNo' onClick={()=>(
           setDriverInfoView(1),
           setDriverFound(!driverFound),
           setShourBtn(0)
         )}>NO</button></div>:''}

        {driverInfoView==false?<button className='CircularProgressConCancel2' style={{display:driverInfoView==3?'none':''}} onClick={()=>(
          setShourBtn(1),
          setDriverInfoView(3)
     )}><div>Finish</div></button>:''}

       

{driverInfoView==1?<div className='driverInfoCon'>

 

  <div className='driverImgCon'>Img</div>
  
  <div className='driverInfoConInfo'>Name <div className='driverInfoConInfoSpan'><span>{checkDriverAcceptance?.driverName}</span> <span style={{paddingLeft:'10px'}}>{checkDriverAcceptance?.driverFatherName}</span></div> </div>
  <div className='driverInfoConInfo'>CarType  <div className='driverInfoConInfoSpan'>{checkDriverAcceptance?.driverCarType}</div></div>
  <div className='driverInfoConInfo'>CarPlate <div className='driverInfoConInfoSpan'> {checkDriverAcceptance?.driverCarPlate}</div></div>


  
{driverInfoView==1? <>  <div className='callDriverCon'><a style={{display:'flex',justifyContent:'center',alignItems:'center'}}  href={"tel://"+checkDriverAcceptance?.driverPhoneNumber1}> <div style={{fontSize:'14px'}}>1</div> <IoIosCall style={{
         
         color:'lightgreen',
         width:'20px',
         height:'20px',
         color:'#2c8af6',
         borderRadius: '50%',



         "&:hover":{
           backgroundColor:"whitesmoke",
           borderRadius:'50%',
           padding:'2px',
           color:'salmon'

         }
         ,
         "&:active":{
           backgroundColor:"whitesmoke",
           borderRadius:'50%',
           padding:'2px',
           color:'lightgray'

         },}}/></a><a style={{display:'flex',justifyContent:'center',alignItems:'center'}} href={"tel://"+checkDriverAcceptance?.driverPhoneNumber2}><div style={{fontSize:'14px'}}>2</div><IoIosCall style={{
           width:'20px',
           height:'20px',
           color:'#2c8af6',
           borderRadius: '50%',


 
           "&:hover":{
             backgroundColor:"whitesmoke",
             borderRadius:'50%',
             padding:'2px',
             color:'salmon'
 
           }
           ,
           "&:active":{
             backgroundColor:"whitesmoke",
             borderRadius:'50%',
             padding:'2px',
             color:'lightgray'
 
           },}}/></a>
           

           <a style={{display:'flex',justifyContent:'center',alignItems:'center'}} ><div style={{fontSize:'14px'}}></div><MdMessage onClick={()=>(
             setMessageOnOfBtn(1)
           )} style={{
           width:'23px',
           height:'23px',
           color:'orange',
           borderRadius: '10px',


 
           "&:hover":{
             backgroundColor:"whitesmoke",
             borderRadius:'50%',
             padding:'2px',
             color:'salmon'
 
           }
           ,
           "&:active":{
             backgroundColor:"whitesmoke",
             borderRadius:'50%',
             padding:'2px',
             color:'lightgray'
 
           },}}/></a>
           </div>
       
             </> 
           
           :''}



</div>:''}
             


           
  {messageOnoOfBtn==1?<div className='messageConClient'>
              <form action="" className='messageFormClient' onSubmit={sendMessages}>

              <div className='messageViewConClient' style={{display:localStorage.getItem('message1')!=null?'':'none'}}>

              <div className='messageView' style={{alignSelf:message10?.messageId==1?'end':'',marginRight:message10?.messageId==1?'25px':'',backgroundColor:message10?.messageId==2?'#d8d8e1':'#c4e1c5',color:message10?.messageId==2?'black':'black',display:message10!=null?'':'none'}}>{message10?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message9?.messageId==1?'end':'',marginRight:message9?.messageId==1?'25px':'',backgroundColor:message9?.messageId==2?'#d8d8e1':'#c4e1c5',color:message9?.messageId==2?'black':'black',display:message9!=null?'':'none'}}>{message9?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message8?.messageId==1?'end':'',marginRight:message8?.messageId==1?'25px':'',backgroundColor:message8?.messageId==2?'#d8d8e1':'#c4e1c5',color:message8?.messageId==2?'black':'black',display:message8!=null?'':'none'}}>{message8?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message7?.messageId==1?'end':'',marginRight:message7?.messageId==1?'25px':'',backgroundColor:message7?.messageId==2?'#d8d8e1':'#c4e1c5',color:message7?.messageId==2?'black':'black',display:message7!=null?'':'none'}}>{message7?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message6?.messageId==1?'end':'',marginRight:message6?.messageId==1?'25px':'',backgroundColor:message6?.messageId==2?'#d8d8e1':'#c4e1c5',color:message6?.messageId==2?'black':'black',display:message6!=null?'':'none'}}>{message6?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message5?.messageId==1?'end':'',marginRight:message5?.messageId==1?'25px':'',backgroundColor:message5?.messageId==2?'#d8d8e1':'#c4e1c5',color:message5?.messageId==2?'black':'black',display:message5!=null?'':'none'}}>{message5?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message4?.messageId==1?'end':'',marginRight:message4?.messageId==1?'25px':'',backgroundColor:message4?.messageId==2?'#d8d8e1':'#c4e1c5',color:message4?.messageId==2?'black':'black',display:message4!=null?'':'none'}}>{message4?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message3?.messageId==1?'end':'',marginRight:message3?.messageId==1?'25px':'',backgroundColor:message3?.messageId==2?'#d8d8e1':'#c4e1c5',color:message3?.messageId==2?'black':'black',display:message3!=null?'':'none'}}>{message3?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message2?.messageId==1?'end':'',marginRight:message2?.messageId==1?'25px':'',backgroundColor:message2?.messageId==2?'#d8d8e1':'#c4e1c5',color:message2?.messageId==2?'black':'black',display:message2!=null?'':'none'}}>{message2?.textMessage}</div>
              <div className='messageView' style={{alignSelf:message1?.messageId==1?'end':'',marginRight:message1?.messageId==1?'25px':'',backgroundColor:message1?.messageId==2?'#d8d8e1':'#c4e1c5',color:message1?.messageId==2?'black':'black',display:message1!=null?'':'none'}}>{message1?.textMessage}</div>
             

{/*{JSON.parse(localStorage.getItem('message10'))?JSON.parse(localStorage.getItem('message10')):''} */}








             


              </div>

              <div className='messageBtnClient messageBtnClientBack messageBtnClientRefresh' style={{display:driverInfoView==1?'':'none'}}> <Link style={{margin:'-5px'}} href={''}> <IoMdRefresh onClick={()=>(refreshPage())}  style={{
          width:'25px',
          height:'25px',
          color:'#0077ff',
          marginTop:'10px',
          "&:hover":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'salmon'
           }
          ,
          "&:active":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'lightgray'

          },}}/> </Link> </div>
          
<div className='messageBtnClient messageBtnClientBack'>
<MdKeyboardBackspace onClick={()=>(
                
                setDriverFound(!driverFound),
                setMessageOnOfBtn(0)
                )}  style={{
                  width:'25px',
                  height:'25px',
                  color:'white',
                  borderRadius: '10px',
                  marginTop:'10px',

            "&:hover":{
              color:'salmon'
            }
            ,
            "&:active":{
              color:'lightgray'
  
            },}}/>
            </div>

                      


                <input className='messageInputClient' type="text" placeholder='message'  onChange={(e)=>setMessageInput(e.target.value)} />
                <button type='submit' className='messageBtnClient'>{'>'}</button>


              </form>
             </div>:''}


</div>:''}





     
</div>

<div className='footerCon' style={{display:checkDriverAcceptance?.driverName || loading==1 ?'none':''}}>
    <div className='iconCon'> <Link style={{margin:'-5px'}} href={driverInfo?.name?`/driver/DriverHome`:'/'} onClick={refreshPage} ><FaHouse style={{
          width:'20px',
          height:'20px',
          color:'#0077ff',
          "&:hover":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'salmon'

          },
          "&:active":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'lightgray'

          },
         }}/> </Link> <div className='iconName'>Home</div></div>
  {searchBtnOnOf==1?'':<div className='iconCon' > <Link style={{margin:'-5px'}} href={'/driver/LogIn'}><FaTaxi style={{
          width:'20px',
          height:'20px',
          color:'#0077ff',
          "&:hover":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'salmon'

          }
          ,
          "&:active":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'lightgray'
            

          },}}/> </Link><div className='iconName'>Driver</div></div>}  
           <div className='iconCon'> <Link style={{margin:'-5px'}} href={'/driver/LogIn'}><IoPerson style={{
          width:'20px',
          height:'20px',
          color:'#0077ff',
          "&:hover":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'salmon'

          }
          ,
          "&:active":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'lightgray'
            

          },}}/> </Link><div className='iconName'>Data</div></div>
   
    <div className='iconCon'> <Link style={{margin:'-5px'}} href={''}> <IoIosRefresh onClick={refreshPage}  style={{
          width:'20px',
          height:'20px',
          color:'#0077ff',
          "&:hover":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'salmon'
           }
          ,
          "&:active":{
            backgroundColor:"whitesmoke",
            borderRadius:'50%',
            padding:'2px',
            color:'lightgray'

          },}}/> </Link> <div className='iconName'>Refresh</div></div>






    </div>
    
    </div>

)


}


export default FindDriverForClient