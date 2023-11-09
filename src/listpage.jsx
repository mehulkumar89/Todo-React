import { useEffect, useState } from "react"

function Listpage(){
  const [name,setname]=useState("")
  const [arr,setarr]=useState([])
  const [btn,setbtn]=useState(true)
  const [ind,setind]=useState(-1)
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
    }
  }
  }
  function handlesubmit(){
        let val=[]
        if(localStorage.getItem('array')){
          val=JSON.parse(localStorage.getItem('array'))
          val.push(name)
        }
        else{
          val.push(name)
        }
        localStorage.setItem('array',JSON.stringify(val))
        setarr((prev)=>{
           return(
            [
              ...prev,
              name
            ]
           )
        })
        setname("")

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
      return(
        <div className='wrap-form'>
        <h2>{items}</h2>
        <button className="btn button5" onClick={()=>handledit(items,index)}>edit</button>
        <button className="btn button3" onClick={()=>handldel(index)}>delete</button>
        </div>
       )
    })}
  </div>
  )
}
export default Listpage