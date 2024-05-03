'use server'

//import mysql from "mysql";
import mysql from 'mysql2/promise';


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
 
  let intervalID;

  export async function resetdriverlocupdate(){

    const db=await dbCreateConnection()
try {
  const [results,err]=await db.execute(`SELECT * FROM DriverData WHERE latitude!='0'`)
  console.log(results)
  


  if(results!=''){
      results?.map(async(result)=>{
        var t1 = new Date();
            var t2 = result.locUpdate;
            var dif = (t1 - t2)/1000;
            console.log('reset',result.locUpdate,dif)

           const [data,err2]=await db.execute(`UPDATE DriverData SET locDif=${dif}
           WHERE id=${result.id}`)
     
           const [data2,err3]=await db.execute(`UPDATE DriverData SET latitude=0,longitude=0,clientName='0',clientLat='0',
            clientLon='0',clientPhone='0',checkClient='0'
            WHERE locDif>40 OR locDif<0 `)

            console.log('dif is',dif,'locDif',result.locDif,'latitude',result.latitude,'id',result.id)

          
      })
      var t1 = new Date();
      var dif = results?.map((result)=>(t1-result.locUpdate)/1000);



     
  }


} catch (error) {
  
}
  }
    


export async function getdriverstotalnumber(){
  const db=await dbCreateConnection()
try {
  const [result,err]=await db.execute(`SELECT COUNT(*) AS rowCount FROM DriverData`)
  if (result!='') {
    console.log(result[0].rowCount)
    await db.end();
    return result[0].rowCount
  }
} catch (error) {
  await db.end();
  console.log(error)
}
}

  export async function searchbyname(searchText){
    const db=await dbCreateConnection()
    try {
        const [result,err]=await db.execute(`SELECT * FROM DriverData WHERE name LIKE '${searchText}%' OR phoneNumber LIKE '${searchText}%' OR phoneNumber2 LIKE '${searchText}%'`)
        if (result!='') {
            console.log(result)
            await db.end();
            return result
        } else {
            console.log(err)
            await db.end();
            return [{
              name: 'not found',
              fatherName:'',
              phoneNumber:''
            }]
        }
    } catch (error) {
        console.log(error)
    }
  }


  export async function getonlinedriverstotalnumber(){
    const db=await dbCreateConnection()
  try {
    const [result,err]=await db.execute(`SELECT COUNT(*) AS rowCount FROM DriverData WHERE latitude!='0' `)
    if (result!='') {
      console.log(result[0].rowCount)
      await db.end();
      return result[0].rowCount
    }
  } catch (error) {
    await db.end();
    console.log(error)
  }
  }

  export async function getonlinedrivers(searchText){
    const db=await dbCreateConnection()
    try {
        const [result,err]=await db.execute(`SELECT * FROM DriverData WHERE latitude!='0'`)
        if (result!='') {
            console.log(result)
            await db.end();
            return result
        } else {
            console.log(err)
            await db.end();
            return err
        }
    } catch (error) {
        console.log(error)
    }
  }

  export async function searchonlinedrivers(searchText){
    const db=await dbCreateConnection()
    try {
        const [result,err]=await db.execute(`SELECT * FROM DriverData WHERE (name LIKE '${searchText}%' OR phoneNumber LIKE '${searchText}%' OR phoneNumber2 LIKE '${searchText}%') AND latitude!='0'`)
        if (result!='') {
            console.log(result)
            await db.end();
            return result
        } else {
            console.log(err)
            await db.end();
            return [{
              name: 'not found',
              fatherName:'',
              phoneNumber:''
            }]
        }
    } catch (error) {
        console.log(error)
    }
  }