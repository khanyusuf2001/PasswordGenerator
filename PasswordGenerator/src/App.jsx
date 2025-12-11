import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [upperChar, setUpper] = useState(false)
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState('')

  const passwordRef = useRef(null)

  const passswordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"

    if(number){
      str += "0123456789"
    }
    if(char){
      str += "!@#$%^&*()_+-`{}[]:;'<>,.?/|"
    }
    if(upperChar){
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }

    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * str.length)
      pass += str.charAt(idx)
    }
    setPassword(pass)
    setDisplayPassword('')
  }, [length, number, char, upperChar])

  useEffect(() => {
    if (!password) return
    
    let index = 0
    const interval = setInterval(() => {
      if (index <= password.length) {
        setDisplayPassword(password.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [password])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passswordGenerator()
  }, [passswordGenerator, length, number, char, upperChar])

  return (
    <>
      <div className='relative w-full min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden'>
        <div 
          className='absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full rounded-full opacity-20 pointer-events-none'
          style={{ 
            backgroundColor: '#d6b9fc',
            width: '900px',
            height: '900px',
            top: '-200px',
            filter: 'blur(100px)'
          }}
        ></div>

        <div className='w-full max-w-xl shadow-md rounded-lg px-6 py-4 bg-gray-800 text-white-500 relative z-10'>
        
          <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>

          <div className="flex items-center shadow rounded-lg overflow-hidden mb-4 text-white h-12">
            <input
              type="text"
              value={displayPassword}
              readOnly
              ref={passwordRef}
              placeholder="Password"
              className="flex-1 h-full py-2 px-3 text-sm bg-gray-700 border-0 outline-none"
            />
            <button
              onClick={() => copyPassword()}
              className="flex-none h-full ml-2 px-4 rounded text-white text-sm"
              style={{ backgroundColor: '#d6b9fc' }}
            >
              Copy
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-white mb-4 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                type='range'
                min={8}
                max={50}
                value={length}
                onChange={e => setLength(Number(e.target.value))}
                className='flex-1 cursor-pointer accent-violet-400'
              />
              <label className='text-sm whitespace-nowrap'>Length: {length}</label>
            </div>

            <div className='flex items-center gap-3'>
              <label className='inline-flex items-center gap-2 text-sm'>
                <input
                  type='checkbox'
                  checked={number}
                  id='numberInput'
                  onChange={() => setNumber(prev => !prev)}
                  className='w-4 h-4 accent-violet-400'
                />
                <span>Numbers</span>
              </label>

              <label className='inline-flex items-center gap-2 text-sm'>
                <input
                  type='checkbox'
                  checked={char}
                  id='charInput'
                  onChange={() => setChar(prev => !prev)}
                  className='w-4 h-4 accent-violet-400'
                />
                <span>Char</span>
              </label>

              <label className='inline-flex items-center gap-2 text-sm'>
                <input
                  type='checkbox'
                  checked={upperChar}
                  id='upperCharInput'
                  onChange={() => setUpper(prev => !prev)}
                  className='w-4 h-4 accent-violet-400'
                />
                <span>Upper</span>
              </label>
            </div>
            <button
              onClick={passswordGenerator}
              className="flex-none h-10 px-4 rounded text-white text-sm"
              style={{ backgroundColor: '#d6b9fc' }}
            >
              Generate
            </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
