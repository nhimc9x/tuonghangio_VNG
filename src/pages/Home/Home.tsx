import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataIP } from '../../type/type'

function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    const jsonStatus = localStorage.getItem('Status')
    if (jsonStatus) {
      const checkLoged: DataIP = JSON.parse(jsonStatus)
      if (checkLoged.isLoged) {
        navigate('/game')
      }
    }
  }, [navigate])

  // const jsonStatus = localStorage.getItem('Status')
  // if (jsonStatus) {
  //   const status: DataIP = JSON.parse(jsonStatus)
  //   console.log(status.isLoged);
  // }

  const [value, setValue] = useState<string>('')

  const handleCheck = () => {
    if (value.trim() === '') return
    if (value === 'nhi123') {
      const gifCode: DataIP = {
        isLoged: true,
        quatity: 200
      }
      localStorage.setItem('Status', JSON.stringify(gifCode))
      navigate('/game')
    } else {
      alert('Mã code sai, vui lòng nhập lại.')
    }
    setValue('')
  }


  return (
    <div className="h-full w-full bg-black/80 grid place-content-center">
      <div
        className="h-[20vw] w-[30vw] relative"
      >
        <img className='size-full absolute object-fill' src="/img/modal.png" alt="" />
        <div className="absolute w-full z-10 flex flex-col items-center px-[2vw] gap-4 pt-4">
          <img className='w-[4vw] select-none' src="/img/logo.png" alt="" />
          <div className="flex flex-col items-center gap-2">
            <label className='text-yellow-600 font-semibold uppercase' htmlFor="code">Nhập code</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} className='w-full outline-none px-2 py-1 rounded-sm' type="text" name="code" id="code" />
            <button onClick={handleCheck} className='w-full outline-none px-2 py-1 bg-yellow-600 font-medium uppercase text-white active:scale-105 rounded-sm' >Nhận</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home