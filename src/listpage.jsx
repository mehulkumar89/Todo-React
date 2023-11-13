import { useEffect, useState } from "react"

function Listpage() {
  const [name, setname] = useState("")
  const [arr, setarr] = useState([])
  const [btn, setbtn] = useState(true)
  const [addbtn, setaddbtn] = useState(true)
  const [check, setcheck] = useState(true)
  const [nextName, setnextName] = useState('Next')
  const [ind, setind] = useState(-1)
  const [nextbtn, setnextbtn] = useState(-1)
  function load() {
    if (localStorage.getItem('array')) {
      let val = JSON.parse(localStorage.getItem('array'))
      setarr(val)
      if (localStorage.getItem('index')) {
        let val = Number(localStorage.getItem('index'))
        setnextbtn(val)
      }
    }
  }
  useEffect(() => {
    load()
  }, [])

  function edit() {
    let val = ind
    if (!check) {
      val = ind + 4;
    }
    let value = JSON.parse(localStorage.getItem('array'))
    console.log(val)
    value.map((item, index) => {
      if (index === val) {
        value[val] = name
      }
    })
    localStorage.setItem('array', JSON.stringify(value))
    setarr(value)
    setname("")
    setbtn(true)
    setind(-1)
    setaddbtn(true)
    setcheck(true)
    setnextName('Next')
  }

  function handleform(event) {

    let val = event.target.value
    setname(val)
  }
  function handledit(ref, index) {
    setaddbtn(true)
    setbtn(false)
    setname(ref)
    setind(index)
  }
  function handldel(indx) {
    if (ind === -1) {
      if (window.confirm('are you really want to delete')) {
        if (!check) {
          indx = indx + 4
        }
        let index = nextbtn - 1
        let ans = []
        let value = JSON.parse(localStorage.getItem('array'))
        value.map((item, index) => {
          if (indx !== index)
            ans.push(item)
        })
        localStorage.setItem('array', JSON.stringify(ans))
        setarr(ans)
        if (index >= -1)
          localStorage.setItem("index", index)
        setnextbtn(index)
        setaddbtn(true)
        if (!check) {
          setcheck(true)
          setnextName('Next')
        }
      }
    }
  }
  function handlenext() {
    if (check) {
      let val = JSON.parse(localStorage.getItem('array'))
      let ans = []
      for (let i = 4; i < val.length; i++) {
        ans.push(val[i]);
      }
      setarr(ans)
      setaddbtn(false)
      setcheck(false)
      setnextName('Back')
    }
    else {
      let val = JSON.parse(localStorage.getItem('array'))
      let ans = []
      for (let i = 0; i < 4; i++) {
        ans.push(val[i]);
      }
      setarr(ans)
      setaddbtn(true)
      setcheck(true)
      setnextName('Next')
    }
  }
  function handlesubmit() {
    let val = []
    let index = nextbtn + 1
    if (localStorage.getItem('array')) {
      val = JSON.parse(localStorage.getItem('array'))
      val.unshift(name)
    }
    else {
      val.unshift(name)
    }
    localStorage.setItem('array', JSON.stringify(val))
    setarr(val)
    setname("")
    localStorage.setItem("index", index)
    setnextbtn(index)
  }

  return (
    <div className="App">
      {addbtn && (
        <div className='wrap-form-header'>
          <input type='text' placeholder='Enter The Item Name' onChange={handleform} value={name}></input>
          {btn ? (
            <button className="btn button1" onClick={handlesubmit}>ADD ITEMS</button>
          ) : (
            <button className="btn button5" onClick={edit}>EDIT</button>
          )}
        </div>
      )}
      {arr.map((items, index) => {
        if (index < 4 || !check) {
          return (
            <>

              <div className='wrap-form'>
                <h2>{items}</h2>
                <button className="btn button5" onClick={() => handledit(items, index)}>edit</button>
                <button className="btn button3" onClick={() => handldel(index)}>delete</button>
              </div>
            </>
          )
        }
      })}
      {nextbtn >= 4 && (
        <div>
          <button className="btn button3" onClick={() => handlenext()}>{nextName}</button>
        </div>
      )}
    </div>
  )
}
export default Listpage