import { useCallback, useEffect, useState } from 'react'


function App() {
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState()
  const [length,setLength] = useState(8)


  // call back hook used to memoize the callback so that it's not recreated on every render, takes 2 args, 
  // 1. take callback function to memoize and 2. is dependency array which is optional. 
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let char = "!@#$%^&*()<>?/|}{[]";

    // concat the num in str if numAllowed is true
    if (numAllowed) {
      str+=num;
    }

    // concat the char in str if charAllowed is true
    if (charAllowed) {
      str+=char;
    }

    // for loop to collect the letters from the str in selected range.
    for(let i = 0; i<length; i++){
      let charIndex = Math.floor((Math.random() * str.length) + 1)
      pass += str.charAt(charIndex)
    }

    // passing the pass into setPassword function.
    setPassword(pass)
  },[numAllowed,charAllowed,length])

  useEffect(()=>{
    passwordGenerator()
  },[numAllowed,charAllowed,length,passwordGenerator])

  return (
    <div className='w-full h-screen bg-gray-800 text-white p-4'>
        <h1 className='py-2 font-bold text-2xl  text-white text-center rounded'>Random Password Generator</h1>

        <div className='w-full max-w-xl shadow-2xl p-4 rounded mx-auto mt-8 grid gap-8 '>
            <input type="text" value={password} className='rounded w-full p-1.5 outline-none bg-white/40' readOnly={true} />


            <div className='flex flex-col gap-2.5 sm:gap-0 sm:flex-row sm:justify-between'>
              <div className='flex sm:gap-2 justify-between'>
                <p>Length</p>
                <input type="range" min={8} max={100} value={length} onChange={(e)=>setLength(e.target.value)}  />
                <p className='text-white'>{length}</p>
              </div>


              <div className='flex sm:gap-5 justify-between'>
                <div className='flex gap-2'>
                  <p>Number</p>
                  <input type='checkbox' checked={numAllowed} onChange={(e)=>setNumAllowed((prev)=>!prev)}/>
                </div>

                <div className='flex gap-2'>
                  <p>Char</p>
                  <input type='checkbox' checked={charAllowed} onChange={(e)=>setCharAllowed((prev)=>!prev)}/>
                </div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default App
