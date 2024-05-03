'use server'


import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs'


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


////////////////  firste Drive Register

export async function registerdriver(driverRegInfo){
    const db=await dbCreateConnection()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(driverRegInfo.password, salt)
    try {

          const q="INSERT INTO DriverData (`name`,`fatherName`,`grandFatherName`,`gender`,`phoneNumber`,`phoneNumber2`,`city`,`address`,`kebale`,`carType`,`carPlate`,`password`,`driverId`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
          const values= [driverRegInfo.name,driverRegInfo.fatherName,driverRegInfo.grandFatherName,driverRegInfo.gender,driverRegInfo.phoneNumber,driverRegInfo.phoneNumber2,driverRegInfo.city,driverRegInfo.address,driverRegInfo.kebale,driverRegInfo.carType,driverRegInfo.carPlate,hashedPassword,driverRegInfo.driverId];
        
        const [result,err]=await db.execute(`SELECT * FROM DriverData WHERE driverId=${driverRegInfo.driverId} OR phoneNumber=${driverRegInfo.phoneNumber} `)

            if (result.length!=0) {
                console.log('driver exist')
                await db.end();
                return 'matched number'
            }

            if (result?.length==0){
                const [data,err]=await db.execute(q,values)

                if (data) {
                console.log('registerd')
                await db.end();
                return 'registerd'
                } else {
                  console.log(err)  
                }
            }
        
    } catch (error) {
        console.log(error)
    }

}


export async function logindriver(driverId,password){
  const db=await dbCreateConnection()
try {

  const [data,err]=await db.execute(`SELECT * FROM DriverData WHERE driverId=${driverId}`)
  
  const logerData=data.map((d)=>d)
  const info=logerData[0]
 


if (data!='') {
  console.log(data,'cvbgf')
  console.log(data=='','cvbgf')

   const match=await bcrypt.compare(password,info.password)
    if (match==true) {
     
      console.log('loged in successfully')
      await db.end();
      return {
        name:info.name,
        id:info.id,
        fatherName:info.fatherName,
        grandFatherName:info.grandFatherName,
        phoneNumber:info.phoneNumber,
        phoneNumber2:info.phoneNumber2,
        carType:info.carType,
        carPlate:info.carPlate,
      }
    }else{
      console.log('log in not successful')
      await db.end();
      return {
        match:'welcom',
        tryAgen:'try another',
      }
    }
  } else {
    console.log(err)
    console.log('not registered')
      await db.end();
      return {
        match:'welcom',
        tryAgen:'try another',
      }
  }


  

} catch (error) {
  console.log(error)
}
}


export async function senddriverlocation(info){

  const db=await dbCreateConnection()
  try {
    const [data,err]=await db.execute(`UPDATE DriverData SET latitude=${info.latitude?info.latitude:0},longitude=${info.longitude?info.longitude:0},locUpdate=${Date.now()} 
    WHERE id=${info.id} `)

    if (data) {
      const [results,errors]=await db.execute(`SELECT * FROM DriverData WHERE id=${info.id}`)
      if (results) {
        console.log('location updated')

     const resultInfo=results.map((result)=>{
          return result
        })
        await db.end();
        return resultInfo[0]
        
      } else {
        console.log(errors)
      }
    } else {
      console.log(err)
    }
  } catch (error) {
    console.log(error)
  }

}


export async function clearclientinfo(id){
  const db=await dbCreateConnection()
  try {
    const [DriverData,err]=await db.execute(`UPDATE DriverData SET clientName='0',clientLat='0',
    clientLon='0',clientPhone='0',checkClient='0',latitude='0',longitude='0',finished=finished+1
    WHERE id=${id} `)
    if (DriverData) {
      await db.end();
      console.log('cleared')
       return 'cleared'
    } else {
      console.log(err)
    }
  } catch (error) {
    console.log(error)
  }

}


export async function checkClient(id){
  const db=await dbCreateConnection()
try {
  const [findClient,err]=await db.execute(`SELECT * FROM DriverData WHERE id=${id}`)
  if (findClient) {
    const check=findClient.map((d)=>{
      return d
 })
 console.log(check[0].checkClient)
 if (check[0].checkClient==1) {
  console.log('driverNameee',check[0].clientName)
  await db.end();
return {

  checkClient:check[0].checkClient,
  clientName:check[0].clientName,
  clientPhone:check[0].clientPhone,
  clientLat:check[0].clientLat,
  clientLon:check[0].clientLon,
  clientFrom:check[0].fromWhere,
  clientGoTo:check[0].goTo,
  clientPrice:check[0].price,
 }

 } else {
  console.log('not found',check[0].checkClient)
  await db.end();
  return {
    checkClient:check[0].checkClient,
  }
 }
  } else {
    console.log(err)
  }
} catch (error) {
  console.log(error)
}

}


export async function rejectedfromdriver(id){
  const db=await dbCreateConnection()
try {
   const [data,err]=await db.execute(`SELECT * FROM DriverData WHERE id=${id}`)
   if (data) {
    const rejectedData=data.map((d)=>d)

    if (rejectedData[0].searching==1) {
      const [clientData,errs]=await db.execute(`UPDATE ClientData SET driverAcceptance=2,driverId=${rejectedData[0].id}
      WHERE clientPhoneNumber=${rejectedData[0].clientPhone} `)

     if (clientData) {
      console.log('rejected')
      await db.end();
      return 'rejected'
     } else {
      await db.end();
      console.log(errs)
     }
    } else {
      await db.end();
      console.log('searching is not 1')

    }
   } else {
    await db.end();
    console.log(err)

   }
} catch (error) {
  await db.end();
  console.log(error)
}
}

export async function rejectedclientinfo(id){
  const db=await dbCreateConnection()
  try {
    const [DriverData,err]=await db.execute(`UPDATE DriverData SET clientName='0',clientLat='0',
    clientLon='0',clientPhone='0',checkClient='0',latitude='0',longitude='0'
    WHERE id=${id} `)
    if (DriverData) {
      console.log('rejectedclientinfocleared')
      await db.end();
           return 'rejected'
    } else {
      console.log(err)
      await db.end();
    }
  } catch (error) {
    await db.end();
    console.log(error)
  }
}

export async function senddatatoclientfromdriver(id){
  const db=await dbCreateConnection()
  try {
    const [data,err]=await db.execute(`SELECT * FROM DriverData WHERE id=${id}`)
    if (data) {
      const DriverData=data.map((d)=>d)
      if (DriverData[0].searching==1) {

        const [clientData,errData]=await db.execute(`UPDATE ClientData SET driverName='${DriverData[0].name}',driverFatherName='${DriverData[0].fatherName}',
        driverPhoneNumber1='${DriverData[0].phoneNumber}',driverPhoneNumber2='${DriverData[0].phoneNumber2}',
        driverCarPlate=${DriverData[0].carPlate},driverCarType='${DriverData[0].carType}',driverAcceptance=1,driverId=${DriverData[0].id}
        WHERE clientPhoneNumber=${DriverData[0].clientPhone} `)
         if (clientData) {
          console.log(data,'accept')
          const q="INSERT INTO Ride_data (`driver_id`,`clientName`,`clientPhone`,`fromWhere`,`goTo`,`price`,`clientLon`,`clientLat`,`finished`) VALUES (?,?,?,?,?,?,?,?,?)"
          const values= [DriverData[0].id,DriverData[0].clientName,DriverData[0].clientPhone,DriverData[0].fromWhere,DriverData[0].goTo,DriverData[0].price,DriverData[0].clientLon,DriverData[0].clientLat,'no'];
           const [result,errs]=await db.execute(q,values) 
           if (result) {
            console.log('ok Ride_data')
            await db.end();
            return 'accept'
           } else {
            console.log(errs)
            await db.end();
           }   

         } else {
          await db.end();
    console.log(errData)
         }

      } else {
        await db.end();
    console.log('canceld')
       return 'canceld'
      }

    } else {
      await db.end();
    console.log(err)
    }
  } catch (error) {
    await db.end();
    console.log(error)
  }

}


export async function checktogether(driverphonenumber,clientphone){
  const db=await dbCreateConnection()
try {
  const [together,err] = await db.execute(`SELECT * FROM ClientData WHERE clientPhoneNumber='${clientphone}'`)

  if (together) {
    if(together.map((to)=>to.driverPhoneNumber1)==driverphonenumber){
      console.log('checkClientYes')
      await db.end();
       return 'yes'
    }else{
      console.log('checkClientNo')
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


export async function clearclientmessages(clientPhone){
  const db=await dbCreateConnection()
  try {
    const [result,err] = await db.execute(`UPDATE ClientData SET clientMessage='' WHERE clientPhoneNumber='${clientPhone}'`)

    if (result) {
      console.log('cleard from driver')
      await db.end();
      return 'cleard'
    } else {
      console.log(err)
    }
  } catch (error) {
    console.log(error)
  }

}

export async function checkmessagesfromclient(clientPhone){
  const db=await dbCreateConnection()
  try {
    const [results,err] = await db.execute(`SELECT * FROM ClientData WHERE clientPhoneNumber='${clientPhone}'`)

     if (results) {
      if (results.map(result=>result.clientMessage)!='') {

        console.log(results.map(result=>result.clientMessage),'client')
        await db.end();
        return {
          textMessage:results.map(result=>result.clientMessage),
          messageId:'2'
        }
       } else {
          console.log('noMessage from client')
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

export async function sendmessagefromdriver(messageinput,clientPhone){
  const db=await dbCreateConnection()

try {

  const [messages,err]= await db.execute(`UPDATE ClientData SET driverMessage='${messageinput}',driverMNo=driverMNo+1 WHERE clientPhoneNumber='${clientPhone}'`) 
  if(messages){
    console.log('from driver',messageinput)
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