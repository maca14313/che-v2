"use client"

import React, { useEffect, useState } from 'react'

import { IoMdRefresh } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";

import { FaHouse } from "react-icons/fa6";
import { FaTaxi } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";


//import mp1 from './mixkit-arcade-bonus-alert-767.wav';
import { Geolocation } from '@capacitor/geolocation'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { checkClient, checkmessagesfromclient, checktogether, clearclientinfo, clearclientmessages, rejectedclientinfo, rejectedfromdriver, senddatatoclientfromdriver, senddriverlocation, sendmessagefromdriver } from '@/app/lib/dbDriver';
import NavBar from '@/app/comp/NavBar/page';









function DriverSearchBody() {
  
 

  const router = useRouter();


const [id,setId]=useState('')
const [phoneNumber,setPhoneNumber]=useState('')
const [sendLocToDb, setSendLocToDb] = useState(null);

//const [reconnect, setReconnect] = useState(null);


const [loc, setLoc] = useState();
const [locCurrent, setLocCurrent] = useState();


//const [clientPhoneTempo, setClientPhoneTempo] = useState(JSON.parse(localStorage.getItem('clientPhone')));









const [messageOnoOfBtn,setMessageOnOfBtn] = useState(0);
const [messageInput,setMessageInput]=useState(0)

const [acceptanceMessage,setAcceptanceMessage] = useState(null);
const [acceptanceMessageView,setAcceptanceMessageView] = useState(null);



const [sendDriverLocationOnOf,setSendDriverLocationOnOf]=useState(1)


const [available,setAvailable]=useState(true)
const [driverLocationavailable,setDriverLocationAvailable]=useState([])

//socket io



 // const socket = useRef();
  const [message, setMessage] = useState(null);
  //const [senderPhone,setSenderPhone]=useState(JSON.parse(localStorage.getItem('senderPhone')))
  const [arrivalMessage, setArrivalMessage] = useState('');

  const [formOnOf, setFormOnOf] = useState(0);
  const [messageOnOf, setMessageOnOf] = useState(false);

  




 
  const [search,setSearch] = useState(null);
  

  const [onlineUser,setOnlineUser] = useState(null);

  const [counter, setCounter] = useState(0);



        ////////////////////////////////////////////////////////////////////JSON.parse(localStorage.getItem('checkRequist'))?JSON.parse(localStorage.getItem('checkRequist'))://///////////////////////////////////////////////////////////////////////////
  

  const [checkRequist, setCheckRequist] = useState([]);
  console.log(checkRequist)
  const [onlineHeadingOnOf, setOnlineHeadingOnOf] = useState(checkRequist?.checkClient==1?0:1);
  const [checkRequistStop,setCheckRequistStop] = useState([]);
  const [getClientData,setGetClientData] = useState([]);
  const [withClient,setWithClient] = useState();

  const [resetDriverLoc,setResetDriverLoc] = useState([]);
  const [shourBtn,setShourBtn] = useState(0);

  const [notToGether,setNotToGether] = useState(0);

 
  useEffect(() => {
    setId(JSON.parse(localStorage.getItem('logedDriverData')).id)
    setPhoneNumber(JSON.parse(localStorage.getItem('logedDriverData')).phoneNumber)
    setCheckRequist(localStorage.getItem('checkRequist')!="undefined"?JSON.parse(localStorage.getItem('checkRequist')):[]);
    setWithClient(JSON.parse(localStorage.getItem('withClient')));


   }, []);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


useEffect(() => {
  if (acceptanceMessage!=null) {
   setAcceptanceMessageView(1)
   setOnlineHeadingOnOf(null)
   setSendDriverLocationOnOf(null)
  }
  if (acceptanceMessageView==1) {
    
    setSendLocToDb(1)
    setOnlineHeadingOnOf(null)
    setSendDriverLocationOnOf(null)

    
   }

  

   /////////////////////////////////////////// checkRequist.checkClient
   if(checkRequist?.checkClient==1){
    playmp()
    setOnlineHeadingOnOf(null)
    setSendDriverLocationOnOf(null)
    setCheckRequistStop(1)

    


   }

   if (withClient==1) {
    setOnlineHeadingOnOf(null)
    setFormOnOf(true)
    setMessageOnOf(true)
   }
  
}, [acceptanceMessageView,acceptanceMessage,arrivalMessage,checkRequist,withClient]);


//////////////////////////////////////////////////////////
                           /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                          
 useEffect(() => {
                  
 
        if (sendDriverLocationOnOf==1) {

      
        const printCurrentPosition = async () => {

          const showLoc=(coordinates)=>{
              setLoc(coordinates?.coords)
           
          }
        
          const error=(err)=>{
            console.log(err);
           console.warn(
              `ERROR(${err.code}): ${err.message}`
            ); 
          }
        
          const options={
        
            enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 5000,
          }
          const coordinates = await Geolocation.watchPosition(options,showLoc,error);
          const co=coordinates.coords
          console.log('Current position:', co);
          
     
          setLoc(coordinates.coords)
        };
        printCurrentPosition()


      }else{
        const sendDriverLocation=async()=>{

          try {
              const driverLocation=await senddriverlocation({id,latitude:0,longitude:0})
                
          } catch (error) {
              //console.log(error)
    
          }
    
      }
    
      sendDriverLocation()
        
      }
},[sendDriverLocationOnOf]); 




 useEffect(() => {
  if (sendDriverLocationOnOf==1) {
    const sendDriverLocation=async()=>{

      try {
        const driverLocation=await senddriverlocation({id,latitude:loc?.latitude,longitude:loc?.longitude})
        
            setDriverLocationAvailable(driverLocation)
      } catch (error) {
          console.log(error)
      }
  }
  
  sendDriverLocation()
  }
  else{
    const sendDriverLocation=async()=>{

      try {
        const driverLocation=await senddriverlocation({id,latitude:0,longitude:0})
    
      } catch (error) {
          console.log(error)
      }
  }

  sendDriverLocation()  
  }
  
 }, [loc,sendDriverLocationOnOf]);

 let intervalLoc;
 
 useEffect(() => {
  if (sendDriverLocationOnOf==1) {
     
    intervalLoc = setInterval(async() => {
        const driverLocation=await senddriverlocation({id,latitude:loc?.latitude,longitude:loc?.longitude})
       
      console.log('we are online',loc)
    }, 6000);

    return () => clearInterval(intervalLoc);

  }
  else{
    const sendDriverLocation=async()=>{

      try {
        const driverLocation=await senddriverlocation({id,latitude:0,longitude:0})
         
      } catch (error) {
          console.log(error)
      }

  }

  sendDriverLocation()
    
  }
  
  
 },[loc,sendDriverLocationOnOf]); 


let intervalID;
let withClientConnection;
 useEffect(() => {
  
   
           if (checkRequist?.checkClient!=1) {

            intervalID = setInterval(async() => {

              const checkClientData=await checkClient(id)

                 console.log(checkClientData)
                 console.log('Hello world2');
                 setCheckRequist(checkClientData)
                 localStorage.setItem('checkRequist',JSON.stringify(checkClientData))
            }, 5000);

            return () => clearInterval(intervalID);
           
     
  

           } else if (checkRequist?.checkClient==1) {
            //alert('Hello world2');
            withClientConnection=setInterval(async()=>{
                 
            },20000)
           } else{

           }
 }, [sendDriverLocationOnOf,checkRequistStop,checkRequist]);

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let countDown;
const [timeleft, setTimeleft] = useState(15);


    useEffect(() => {


      
         if (checkRequist?.checkClient==1) {
          
          const countDown=setInterval(async()=>{
            console.log('console.log(withClient)',withClient)
            if (withClient==1) {
              clearInterval(countDown);
              return () => clearInterval(countDown);
            }
             if (timeleft<=0 && withClient==null ) {
             clearInterval(countDown);
             try {
              const checkClientData=await rejectedfromdriver(id)
              const clearClientInfo=await rejectedclientinfo(id)

      
              if (checkClientData=='rejected' || clearClientInfo=='rejected') {
                 localStorage.removeItem('checkRequist')
                 localStorage.removeItem('withClient')
                 router.push(`/driver/DriverHome`)
                // window.location.reload()
                 
              }
            } catch (error) {
              alert('no connection')

            }
             }else{
              setTimeleft(timeleft-1)
              console.log(timeleft-1)
             }
          
            
      
          },1000)
          return () => clearInterval(countDown);

      
         } else {
          
         }

     
     
    },[timeleft,checkRequist?.checkClient]); 
    


 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    setLocCurrent(coordinates.coords)

  
    console.log('Current position:', coordinates.coords);
   
  };
  printCurrentPosition()
 }, []); 


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const acceptRequist=async(e)=>{
  e.preventDefault();

                   const checkClientData=await senddatatoclientfromdriver(id)

                   if (checkClientData=='accept') {
                    localStorage.setItem('withClient',JSON.stringify(1))
                    setWithClient(1)
                   }else{

                  

                    alert('client have cancel')
                    router.push(`/driver/DriverHome`)
                    localStorage.removeItem('checkRequist')
                    localStorage.removeItem('withClient')
                    //window.location.reload()
                   }
                    }


     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     const rejectedRequist=async(e)=>{
      e.preventDefault();

          
      try {
       
        const checkClientData=await rejectedfromdriver(id)
        const clearClientInfo=await rejectedclientinfo(id)


        if (checkClientData=='rejected' || clearClientInfo=='rejected') {
            localStorage.removeItem('checkRequist')
           localStorage.removeItem('withClient')
           router.push(`/driver/DriverHome`)
           //window.location.reload()
           
        }
      } catch (error) {
        alert('no connection')

      }
     }


     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      const unsendDriverLocation=async(e)=>{
        e.preventDefault();


                        try {
                         
                           
                            const driverLocation=await senddriverlocation({id,latitude:0,longitude:0})

                            setResetDriverLoc(driverLocation)
                         console.log(driverLocation)
                            
                    
                    
                        } catch (error) {
                          console.log(error)
                          alert('no connection')
                          router.push(`/driver/DriverHome`)
                         // window.location.reload()

                        }
                    
              }

              useEffect(() => {
                  //console.log(resetDriverLoc.latitude)
                  if (resetDriverLoc.latitude==0) {
                    router.push(`/driver/DriverHome`)
                    //window.location.reload()
                  }
              }, [resetDriverLoc]);



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////

   const finished=async()=>{
     try {

        const clearClientInfo=await clearclientinfo(id)


        if (clearClientInfo=='cleared') {
          router.push(`/driver/DriverHome`)
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
          //window.location.reload()
          

        }
       } catch (error) {
        //console.log(error)
        alert('no connection')

       }

      
   }

  let noResponse2;



   //let audio = new Audio(mp1)

   const playmp = () => {
     //audio.play()
   }

   const refreshPage = ()=>{
    window.location.reload();
 }


 /*
const [message1,setMessage1]=useState(localStorage.getItem('message1')!='undefined'?JSON.parse(localStorage.getItem('message1')):'')
const [message2,setMessage2]=useState(localStorage.getItem('message2')!='undefined'?JSON.parse(localStorage.getItem('message2')):'')
const [message3,setMessage3]=useState(localStorage.getItem('message3')!='undefined'?JSON.parse(localStorage.getItem('message3')):'')
const [message4,setMessage4]=useState(localStorage.getItem('message4')!='undefined'?JSON.parse(localStorage.getItem('message4')):'')
const [message5,setMessage5]=useState(localStorage.getItem('message5')!='undefined'?JSON.parse(localStorage.getItem('message5')):'')
const [message6,setMessage6]=useState(localStorage.getItem('message6')!='undefined'?JSON.parse(localStorage.getItem('message6')):'')
const [message7,setMessage7]=useState(localStorage.getItem('message7')!='undefined'?JSON.parse(localStorage.getItem('message7')):'')
const [message8,setMessage8]=useState(localStorage.getItem('message8')!='undefined'?JSON.parse(localStorage.getItem('message8')):'')
const [message9,setMessage9]=useState(localStorage.getItem('message9')!='undefined'?JSON.parse(localStorage.getItem('message9')):'')
const [message10,setMessage10]=useState(localStorage.getItem('message10')!='undefined'?JSON.parse(localStorage.getItem('message10')):'')
*/
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
        const sendMessage=await sendmessagefromdriver(messageInput,checkRequist?.clientPhone)

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
                    // eslint-disable-next-line no-duplicate-case
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
     if(withClient==1){
      together=setInterval(async()=>{
        try {
          const checkMessages= await checkmessagesfromclient(checkRequist?.clientPhone)

          const message=checkMessages
          setClientMessageView(message?.textMessage)

        
         if(message?.noMessage!='noMessage'){
          setMessageOnOfBtn(1)

          switch (null) {
            case JSON.parse(localStorage.getItem('message1')):
              localStorage.setItem('message1',JSON.stringify(message))
              setMessage1(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
              
        
              break;
            case JSON.parse(localStorage.getItem('message2')):
              localStorage.setItem('message2',JSON.stringify(message))
              setMessage2(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
             
              break;
            case JSON.parse(localStorage.getItem('message3')):
              localStorage.setItem('message3',JSON.stringify(message))
              setMessage3(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
              
              break;
            case JSON.parse(localStorage.getItem('message4')):
              localStorage.setItem('message4',JSON.stringify(message))
              setMessage4(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
  
              break;
            case JSON.parse(localStorage.getItem('message5')):
              localStorage.setItem('message5',JSON.stringify(message))
              setMessage5(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
             
              break;
              
            case JSON.parse(localStorage.getItem('message6')):
              localStorage.setItem('message6',JSON.stringify(message))
              setMessage6(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
              
              
              break;
            case JSON.parse(localStorage.getItem('message7')):
              localStorage.setItem('message7',JSON.stringify(message))
              setMessage7(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
              
              break;
            case JSON.parse(localStorage.getItem('message8')):
              localStorage.setItem('message8',JSON.stringify(message))
              setMessage8(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
             
              break;
            case JSON.parse(localStorage.getItem('message9')):
              localStorage.setItem('message9',JSON.stringify(message))
              setMessage9(message)
              await clearclientmessages(checkRequist?.clientPhone)
  
             
              break;
            case JSON.parse(localStorage.getItem('message10')):
              localStorage.setItem('message10',JSON.stringify(message))
              setMessage10(message)
              await clearclientmessages(checkRequist?.clientPhone)

  
              
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
  
  
                
                await clearclientmessages(checkRequist?.clientPhone)

    
                
                break;  
            default:
              console.log("I don't own a pet");
              break;
          }
        
         }
  
         const checkTogether= await checktogether(phoneNumber?phoneNumber:'0',checkRequist?.clientPhone?checkRequist?.clientPhone:'0')

         if(checkTogether=='no'){
         setNotToGether(1)
         }
            
        } catch (error) {
          
        }
       },5000)
  
       return ()=>clearInterval(together)


     }
     
  },[withClient,message10,message1,message2,message3,message4,message5,message6,message7,message8,message9])



var locLat=checkRequist?.clientLat?checkRequist?.clientLat:locCurrent?.latitude;
var locLon=checkRequist?.clientLon?checkRequist?.clientLon:locCurrent?.longitude;

const [navI,setNavI]=useState()
useEffect(() => {
  
  setNavI(navigator.onLine)
}, []);

var mapLoc=`https://maps.google.com/maps?q=${locLat},${locLon}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

console.log(message2)

return (
      <div className="homepage">
            <NavBar/>

    <div className='homeBodyCon homeBodyConSearch'>
       <div style={{display:notToGether==1?'':'none'}} class="notification">
   <div>Client have left</div> <button class="notificationBtn" onClick={finished}>OK</button>
 </div>
                        {navI?<iframe className='iframeMap' width="100%"  id="gmap_canvas" src={mapLoc} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" ></iframe>:<div className='iframeMapNoInternet'  >No Connection</div>} 
 


      {onlineHeadingOnOf==1?
        <div className='onlineheadingCon'>


        <button className='searchCarOnlineView' style={{color:driverLocationavailable?.latitude==undefined || driverLocationavailable?.latitude==0?'white':'',color:driverLocationavailable?.latitude==undefined || driverLocationavailable?.latitude==0 ?'red':'black'}}>{driverLocationavailable?.latitude== undefined || driverLocationavailable?.latitude==0?'connecting ---':navI?'you are online':<div style={{color:'red'}}>No Connection</div>} </button>
 <button onClick={(e)=>(unsendDriverLocation(e))} style={{display:acceptanceMessage?'none':''}}  className='searchBtn'  >Cancel</button>

      </div>
               :''  } 


        {checkRequist?.checkClient==1? <div className='acceptanceConGo' style={{display:withClient==1?'none':''}}>

          
<div className='acceptanceConMsg'><div className='acceptanceConMsgTime'>{timeleft}</div> <div className='acceptanceConMsgPrice'>{checkRequist?.clientPrice}<div className='birrCon'>birr</div></div> </div>
<div className='acceptanceConWhere'><div className='acceptanceConWhereTitle'>From</div><div className='acceptanceConWhereInfo'> {checkRequist?.clientFrom} </div></div>
<div className='acceptanceConWhere'><div className='acceptanceConWhereTitle'>To</div> <div className='acceptanceConWhereInfo'> {checkRequist?.clientGoTo} </div></div>

<div className='acceptanceConBtnCon'>
<button className='shourBtnConYes' onClick={acceptRequist} style={{color:'lightgreen'}}>YES</button> <button className='shourBtnConYes' onClick={rejectedRequist} style={{color:'red'}}>NO</button>
</div>
</div>

:''}




       {messageOnOf==true? <div className='loadingConDriver' style={{maxHeight:formOnOf==true?'200px':'110px',minHeight:formOnOf==true?'200px':'110px'}}>

       <div className='iconConRefreshDriverInfo' style={{display:formOnOf==true?'':'none'}}> <Link style={{margin:'-5px'}} href={''}> <IoMdRefresh onClick={refreshPage}  style={{
          width:'30px',
          height:'30px',
          color:'#0077ff'
          }}/> </Link> </div>

       <IoMdArrowDropdown onClick={()=>(
            setFormOnOf(false),
            setMessageOnOfBtn(0)
            )}  style={{
            display:formOnOf==false || shourBtn==1?'none':'',  
            width:'70px',
            height:'70px',
            marginRight:'25px',
            marginBottom:'3px',
            color:'black',
            borderRadius: '10px',
            position:'absolute',
            top:'-37px',
            right:'-30px'
          }}/> <MdOutlineArrowDropUp onClick={()=>(
                setFormOnOf(1),
                setMessageOnOfBtn(0)
                )} style={{
            display:formOnOf==1 || shourBtn==1?'none':'',
            zIndex:'100',
            width:'70px',
            height:'70px',
            marginRight:'25px',
            marginBottom:'3px',
            color:'black',
            borderRadius: '10px',
            position:'absolute',
            top:'-37px',
            right:'-30px'}}/>
         




        
         {shourBtn==1?<div className='shourBtnCon shourBtnConD' > <button className='shourBtnConYes shourBtnConYes' onClick={finished}>YES</button> <button className='shourBtnConNo' onClick={()=>(
                setFormOnOf(1),
                setShourBtn(0)
         )}>NO</button><div className='shourBtnConTitle shourBtnConTitleD'>are you shour </div></div>:''}

        {formOnOf==false?<button className='CircularProgressConCancel2 ' onClick={()=>(
          setShourBtn(1),
          setFormOnOf(3)
          
          )}><div>Finish</div></button>:''}


{formOnOf==1?<> 

  <div className='acceptanceConGo2' >

          
<div className='acceptanceConWhere2'><div className='acceptanceConWhereTitle2'>From</div><div className='acceptanceConWhereInfo2'> {checkRequist?.clientFrom}</div></div>
<div className='acceptanceConWhere2'><div className='acceptanceConWhereTitle2'>To</div> <div className='acceptanceConWhereInfo2'> {checkRequist?.clientGoTo}</div></div>
<div className='acceptanceConWhere2Price acceptanceConWhere2PriceCall'><div className='acceptanceConWhereTitle2Price'>Price</div> <div className='acceptanceConWhereInfo2Price'> {checkRequist?.clientPrice} <small>Birr</small> </div></div>
<div className='acceptanceConWhere2Price acceptanceConWhere2PriceCall'><MdMessage onClick={()=>(
  setMessageOnOfBtn(1)
)}  style={{
  width:'25px',
  height:'25px',
  color:'salmon',
  marginLeft:'10px',
  borderRadius: '10px'}}/>
 <a className='acceptanceConWhereTitle2Price' href={"tel://"+checkRequist?.clientPhone}> <IoIosCall style={{
            width:'25px',
            height:'25px',
            color:'rgb(0, 238, 0)',
            marginLeft:'30px',
            marginRight:'20px',
            borderRadius: '10px'}}/></a> <a className='acceptanceConWhereTitle2Price'  href={"tel://"+checkRequist?.clientPhone}>{checkRequist?.clientName}</a></div> 

</div>
  </>
  
:''}

             
  {messageOnoOfBtn==1? 
             <div className='messageConClient'>
              <form  className='messageFormClient' onSubmit={sendMessages}>
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
             

            </div>
            <div className='messageBtnClient messageBtnClientBack messageBtnClientRefresh messageBtnClientRefreshDr'>
             <IoMdRefresh onClick={refreshPage}  style={{
                  color:'#0077ff',
                  width:'30px',
                  height:'30px'
         }}/> 
             </div>

             <div className='messageBtnClient messageBtnClientBack'>
            <MdKeyboardBackspace onClick={()=>(
                setFormOnOf(1),
                setMessageOnOfBtn(0)
                )}    style={{
                  width:'30px',
                  height:'30px',
                  color:'white',
                  borderRadius: '10px'
                  }}/>
            </div>
                <input className='messageInputClient' type="text" placeholder='message' onChange={(e)=>setMessageInput(e.target.value)}  />
                <button type='submit' className='messageBtnClient'>{">"}</button>

              </form>
             </div>
:''}



</div>:''}





    </div>
    </div>
  )
}

export default DriverSearchBody

