import { useEffect, useState } from "react"

function Listpage(){
  const [name,setname]=useState("")
  const [arr,setarr]=useState([])
  const [btn,setbtn]=useState(true)
  const [ind,setind]=useState(-1)
  const [nextbtn,setnextbtn]=useState(0)
  function load(){
  if(localStorage.getItem('array')){
    let val=JSON.parse(localStorage.getItem('array'))
    setarr(val)
  }
}
 useEffect(()=>{
  load()
 },[])

  function edit(){
    let value=JSON.parse(localStorage.getItem('array'))
    value.map((item,index)=>{
      if(index===ind){
        value[ind]=name
      }
    })
    localStorage.setItem('array',JSON.stringify(value))
    setarr(value)
    setname("")
    setbtn(true)
    setind(-1)
  }

  function handleform(event){

    let val=event.target.value
    setname(val)
  }
  function handledit(ref,index){
    setbtn(false)
    setname(ref)
    setind(index)
  }
  function handldel(indx){
    if(ind==-1){
    if(window.confirm('are you really want to delete')){
    let ans=[]
    let value=JSON.parse(localStorage.getItem('array'))
    value.map((item,index)=>{
        if(indx!==index)
        ans.push(item)
    })
    localStorage.setItem('array',JSON.stringify(ans))
    setarr(ans)
    if(nextbtn!=0)
    setnextbtn(nextbtn-1)
    }
  }
  }
  function handlenext(){
    let val=JSON.parse(localStorage.getItem('array'))
    let ans=[]
    for(let i=3;i<val.length;i++){
      ans.push(val[i]);
    }
    setarr(ans)
  }
  function handlesubmit(){
        let val=[]
        console.log(nextbtn)
        if(localStorage.getItem('array')){
          val=JSON.parse(localStorage.getItem('array'))
          val.unshift(name)
        }
        else{
          val.unshift(name)
        }
        localStorage.setItem('array',JSON.stringify(val))
        setarr(val)
        setname("")
        setnextbtn(nextbtn+1)
  }
  
  
  
    return(
    <div className="App">
    <div className='wrap-form-header'>
      <input type='text' placeholder='Enter The Item Name' onChange={handleform} value={name}></input>
      {btn ? (
         <button className="btn button1" onClick={handlesubmit}>ADD ITEMS</button>
      ):(
        <button className="btn button5" onClick={edit}>EDIT</button>
      )}
    </div>
    {arr.map((items,index)=>{
      if(index<4){
      return(
        <>
        
        <div className='wrap-form'>
        <h2>{items}</h2>
        <button className="btn button5" onClick={()=>handledit(items,index)}>edit</button>
        <button className="btn button3" onClick={()=>handldel(index)}>delete</button>
        </div>
        </>
       )
}})}
    {nextbtn>=3 && (
          <div>
            <button className="btn button3" onClick={()=>handlenext()}>Next</button>
          </div>
    )}
  </div>
  )
}
export default Listpage