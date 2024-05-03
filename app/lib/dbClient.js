'use server'

//import mysql from "mysql";
import mysql from 'mysql2/promise';


import { NextResponse } from "next/server";


const dbCreateConnection=async()=>{
  try {
    const dbConnect =await mysql.createConnection({
      
      host:"sql11.freemysqlhosting.net",
      user:"sql11703532",
      password:"6Qpap3IMrS",
      database:"sql11703532",
      charset : 'utf8mb4',
    
    })
    return dbConnect

  } catch (error) {
    console.log(error)
  }
}



  


    export async function resetdriveracceptance(clientPhone) {
        const db=await dbCreateConnection()
      try {
      
      const [results,err] = await db.execute(`UPDATE ClientData SET driverAcceptance='0',driverId='0'
      WHERE clientPhoneNumber=${clientPhone}`,[]);
      
      await db.end();
      if (results) {
       
       console.log('reseted driver`s acceptance')
       return JSON.stringify(results)
      }else{
        console.log(err,'driver`s acceptance error')
      }
      
      } catch (error) {
      
     console.log(error);
      
      return 'error';
      
      }
      
      }


      export async function cancelsearch(canceledDriverId){
        const db=await dbCreateConnection()

        try {
          const [result,err]=await db.execute(`UPDATE DriverData SET checkClient=0,clientLat=0,clientLon=0,clientPhone=0,clientName=0,searching=0
          WHERE id=${canceledDriverId} `,[])

          await db.end();
          if (result) {
            console.log(result,'search canceled')
           return JSON.stringify(result)
          } else {
            console.log(err,'search canceled err')

          }
        } catch (error) {
          console.log(error);

        }

      }


      export async function regclientdata(clientPhoneNumber,clientName){
        const db=await dbCreateConnection()
             try {

              const [result,err]= await db.execute(`SELECT * FROM ClientData WHERE clientPhoneNumber=${clientPhoneNumber}`)
              if(result.length===0){
                
                const q="INSERT INTO ClientData (`clientName`,`clientPhoneNumber`) VALUES (?,?)"
                const values= [clientName,clientPhoneNumber];
                const [result2,err2]= await db.execute(q,values)
                if (result2) {
                  //console.log(result2,'length')
                   console.log({
                    name:clientName,
                    phonesOF:clientPhoneNumber
                   })
                   console.log(result.length != 0)
                   console.log(result.length == 0)
                   await db.end();
                   return {
                    clientName:clientName,
                    clientPhoneNumber:clientPhoneNumber
                   }

                } else {
                  console.log(err2)

                }
               
              }
              if(result.length !=0 ){
                console.log(result.length != 0)
                console.log(result.length == 0)

                const [result3,err3] = await db.execute(`UPDATE ClientData SET clientName='${clientName}'
                WHERE clientPhoneNumber=${clientPhoneNumber} `)
                if (result3) {

                  console.log('notNew',result3)
                  await db.end();
                  return {
                    clientName:clientName,
                    clientPhoneNumber:clientPhoneNumber
                   }
                } else {
                  console.log(err3)
                }
              } 

             } catch (error) {
              console.log(error)
             }
      }
 

export async function sendpassengerlocation(passengerData){
  const db=await dbCreateConnection()
try {
   const [data,err]= await db.execute(`SELECT * FROM DriverData WHERE latitude!='0' AND
   id!=${passengerData.driverId1} AND
    id!=${passengerData.driverId2} AND
     id!=${passengerData.driverId3} AND
      id!=${passengerData.driverId4} AND
       id!=${passengerData.driverId5} AND
        id!=${passengerData.driverId6} AND
         id!=${passengerData.driverId7} AND
          id!=${passengerData.driverId8} AND
           id!=${passengerData.driverId9} AND
            id!=${passengerData.driverId10}`)

            if(data){
    return NearestCity(passengerData.latitude?passengerData.latitude:'0',passengerData.longitude?passengerData.longitude:'0');
      
      function Deg2Rad(deg) {
        return deg * Math.PI / 180;
        }

      function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
          lat1 = Deg2Rad(lat1);
          lat2 = Deg2Rad(lat2);
          lon1 = Deg2Rad(lon1);
          lon2 = Deg2Rad(lon2);
          var R = 6371; // km
          var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
          var y = (lat2 - lat1);
          var d = Math.sqrt(x * x + y * y) * R;
          return d;
          }

       async function NearestCity(latitude, longitude) {
            var minDif = 99999;
            var closest;
            
            for (let index = 0; index < data.length; ++index) {
            var dif = PythagorasEquirectangular(latitude, longitude, data[index].latitude, data[index].longitude);
            console.log(dif,'qwertyuiokjhgfdsasdvbnmnbvcdsryuoiuytredd')
            if (dif < minDif) {
              closest = index;
              minDif = dif;
            }
            
            }
            
            var closestData=data[closest]
            var name=passengerData.name
            var nameStringify=JSON.stringify(name)
            var id=closestData?closestData.id:'0'

            const [result3,err3] = await db.execute(`UPDATE ClientData SET searching=1
          WHERE clientPhoneNumber=${passengerData.clientPhone}`)

          const [result2,err2] = await db.execute(`UPDATE DriverData SET checkClient=1,clientLat=${passengerData.latitude?passengerData.latitude:0},clientLon=${passengerData.longitude?passengerData.longitude:0},clientPhone='${passengerData.clientPhone?passengerData.clientPhone:0}',clientName=${nameStringify?nameStringify:0},fromWhere='${passengerData.from?passengerData.from:0}',goTo='${passengerData.goTo?passengerData.goTo:0}',price='${passengerData.price?passengerData.price:0}',searching=1
          WHERE id=${id}`)

         if(result2){
            if (id=='0') {
              console.log('noDriver')
              await db.end();
             return 'noDriver'
            }else{
              console.log(nameStringify)
              console.log('driver found')
              await db.end();
             return {
                good:'good',
                id:closestData?closestData.id:'0',
              }
            }
          }

          
          
          }


     }

} catch (error) {
  console.log(error)
}
}


export async function checkdriveracceptance(clientPhone){
  const db=await dbCreateConnection()
try {
  const [findClient,err] =await db.execute(`SELECT * FROM ClientData WHERE clientPhoneNumber=${clientPhone}`)
  if (findClient.map(d=>d.driverAcceptance)==1) {
    console.log('driverName',findClient.map(d=>d.driverName))
    await db.end();
     return {
      driverAcceptance:findClient.map(d=>d.driverAcceptance),
      driverName:findClient.map(d=>d.driverName),
      driverFatherName:findClient.map(d=>d.driverFatherName),
      driverPhoneNumber1:findClient.map(d=>d.driverPhoneNumber1),
      driverPhoneNumber2:findClient.map(d=>d.driverPhoneNumber2),
      driverCarPlate:findClient.map(d=>d.driverCarPlate),
      driverCarType:findClient.map(d=>d.driverCarType),

     }
  } else {

    console.log('driver not found',findClient.map(d=>d.driverAcceptance))
    await db.end();
    return {
      driverAcceptance:findClient.map(d=>d.driverAcceptance),
      driverId:findClient.map(d=>d.driverId),

    }
  }

} catch (error) {
  console.log(error)
}
}


export async function resetride(clientPhone){
  const db=await dbCreateConnection()

  try {
    const [clientData,err] = await db.execute(`UPDATE ClientData SET driverName='0',driverFatherName='0',
    driverPhoneNumber1='0',driverPhoneNumber2='0',
    driverCarPlate='0',driverCarType='0',driverAcceptance='0',driverId='0',rideCount=rideCount+1
    WHERE clientPhoneNumber=${clientPhone} `)

    if (clientData) {
      console.log('resetride')
      await db.end();
      return'resetride'
    } else {
      console.log(err)
    }

  } catch (error) {
    console.log(error)
    
  }

}


export async function sendmessagefromclient(messageinput,clientPhone){
  const db=await dbCreateConnection()

try {

  const [messages,err]= await db.execute(`UPDATE ClientData SET clientMessage='${messageinput}',clientMNo=clientMNo+1 WHERE clientPhoneNumber='${clientPhone}'`) 
  if(messages){
    console.log('from client',messageinput)
    await db.end();
    return {
      textMessage:messageinput,
      messageId:'1'
    }
    
  }else{
    console.log(err)
  }

} catch (error) {
  console.log(error)
}
}



export async function checkmessagesfromdriver(clientPhone){
  const db=await dbCreateConnection()
  try {
    const [results,err] = await db.execute(`SELECT * FROM ClientData WHERE clientPhoneNumber='${clientPhone}'`)

     if (results) {
      if (results.map(result=>result.driverMessage)!='') {

        console.log(results.map(result=>result.driverMessage),'driver')
        await db.end();
        return {
          textMessage:results.map(result=>result.driverMessage),
          messageId:'2'
        }
       } else {
          console.log('noMessage from driver')
          await db.end();
          return {
            noMessage:'noMessage'
          }
       }
     } else {
      console.log(err)
     }
  } catch (error) {
    console.log(error)
  }
}


export async function cleardrivermessages(clientPhone){
  const db=await dbCreateConnection()
  try {
    const [result,err] = await db.execute(`UPDATE ClientData SET driverMessage='' WHERE clientPhoneNumber='${clientPhone}'`)

    if (result) {
      console.log('cleard from client')
      await db.end();
      return 'cleard'
    } else {
      console.log(err)
    }
  } catch (error) {
    console.log(error)
  }

}


export async function checktogetherfromclient(clientphonenumber,driverphone){
  const db=await dbCreateConnection()
try {
  const [together,err] = await db.execute(`SELECT * FROM DriverData WHERE phoneNumber='${driverphone}'`)

  if (together) {
    if(together.map((to)=>to.clientPhone)==clientphonenumber){
      console.log('checkDriverYes')
      await db.end();
       return 'yes'
    }else{
      console.log('checkDriverNo')
      await db.end();
     return 'no'
    }
  } else {
    console.log(err)
  }
} catch (error) {
  console.log(error)
}
}






