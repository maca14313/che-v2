
function Iframe({loc}) {
    //console.log(loc)
   
  return (
    <iframe className='iframeMap' width="100%"  id="gmap_canvas" src={loc} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" style={{marginBottom:'2%',minHeight:'90svh'}} ></iframe>
    )
}

export default Iframe