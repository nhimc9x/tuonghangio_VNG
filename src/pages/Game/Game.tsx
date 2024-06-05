import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataIP } from '../../type/type'
import clsx from 'clsx'
import { RollEffect } from '../../components/RollEffect/RollEffect'
import { CHAMP, CHAMPTYPE } from '../../data/data'
import { PuzziChamp } from '../../components/PuzziChamp/PuzziChamp'

function Game() {

  const navigate = useNavigate()

  const [currentChamp, setCurrentChamp] = useState<string>()
  const [data, setData] = useState<CHAMPTYPE>(CHAMP[0])
  const [rolling, setRolling] = useState(false)
  const [turn, setTurn] = useState<number>(0)

  const [user, setUser] = useState<
  {luot: number; tinhhoa: number; phieu: number; [key: string]: number}
  >({
    luot: 0,
    tinhhoa: 0,
    phieu: 0,
  })

  useEffect(() => {
    const userData = localStorage.getItem('UserData')
    if (!userData) {
      const exam = {
        luot: 200,
        tinhhoa: 0,
        phieu: 0
      }
      localStorage.setItem('UserData', JSON.stringify(exam))
    } else {
      setUser(JSON.parse(userData))
    }
  }, [])

  console.log(user);

  const handleAgreeChange = () => {
    setShowModal(false)
    if (data?.id === currentChamp) return
    setData(CHAMP.find(item => item.id === currentChamp) || CHAMP[0]);
  }

  useEffect(() => {
    const jsonStatus = localStorage.getItem('Status')
    if (jsonStatus) {
      const checkLoged: DataIP = JSON.parse(jsonStatus)
      if (!checkLoged.isLoged) {
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [navigate])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setLoading(false)
    }, 6000)
    return () => {
      clearTimeout(timeoutID)
    }
  })

  const handleRoll = (num: number) => {
    if (user.luot === 0) return
    setRolling(true)
    setTurn(num)
    const newUser = {
      ...user,
      luot: user.luot - num
    }
    setUser(newUser)
    localStorage.setItem('UserData', JSON.stringify(newUser))
  }

  const [showModal, setShowModal] = useState(false)

  if (loading) {
    return (
      <div className="w-dvw h-dvh overflow-hidden">
        <img className='size-full animate-zoom-in' src="/img/bg.jpg" alt="" />
      </div>
    )
  }

  return (
    <div
      style={{ backgroundImage: 'url(/img/wall.jpg)' }}
      className="w-dvw h-dvh overflow-hidden relative animate-zoom-out bg-cover bg-center"
    >
      {/* Nhân vật */}
      <div className="w-[50vw] z-10 absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2">
        <img className='w-full' src={`/img/${data?.img}`} alt={data?.id} />
      </div>

      {/* Đổi nhân vật */}
      <div
        onClick={() => setShowModal(true)}
        className="absolute cursor-pointer size-max z-10 top-[30%] left-[24%] flex flex-col items-center">
        <img className='size-8 z-10' src="/img/btn_change.png" alt="" />
        <div className="font-semibold text-[#e7c591]">Đổi</div>
      </div>

      {/* Nút quay 1 lần */}
      <div onClick={() => handleRoll(1)} className="w-32 select-none cursor-pointer z-10 h-max absolute top-[75%] left-[30%] flex justify-center items-center">
        <img className='w-full absolute' src="/img/btn.png" alt="" />
        <div className="z-10 uppercase font-semibold text-blue-600">1 lần</div>
      </div>

      {/* Nút quay 5 lần */}
      <div onClick={() => handleRoll(5)} className="w-32 select-none cursor-pointer z-10 h-max absolute top-[75%] right-[30%] flex justify-center items-center">
        <img className='w-full absolute' src="/img/btn.png" alt="" />
        <div className="z-10 uppercase font-semibold text-red-600">5 lần</div>
      </div>

      {/* Số lượng vật phẩm */}
      <div className="absolute top-3 right-10 flex gap-5 z-20">
        <div className="flex items-center justify-between bg-black/30 h-5 w-24 pr-1 rounded-sm">
          <img className='h-8' src="/img/s1.png" alt="" />
          <div className="text-white">{user.luot}</div>
        </div>
        <div className="flex items-center justify-between bg-black/30 h-5 w-24 pr-1 rounded-sm">
          <img className='h-8' src="/img/s2.png" alt="" />
          <div className="text-white">{user.tinhhoa}</div>
        </div>
        <div className="flex items-center justify-between bg-black/30 h-5 w-24 pr-1 rounded-sm">
          <img className='h-7' src="/img/s3.png" alt="" />
          <div className="text-white">{user.phieu}</div>
        </div>
      </div>

      {/* Số lượng mảnh */}
      <div className="absolute top-[52%] right-[24%] flex flex-col items-center gap-0.5">
        {/* <img className='w-10' src={`/img/${data.icon}`} alt="" /> */}
        {/* <img className='w- absolute top-0 left-0' src="/img/_sprites.png" alt="" /> */}
        <div className="size-10 bg-[url('/img/frame.png')] bg-center bg-cover grid place-content-center">
          <PuzziChamp width='2rem' icon={data.icon} />
        </div>
        <div className="text-xs bg-black/30 text-white px-2 font-medium rounded-sm">{`${user[data.id] || 0}/120`}</div>
      </div>

      {/* Modal quay */}
      {rolling && <RollEffect setRolling={setRolling} data={data} turn={turn} user={user} setUser={setUser} />}

      {/* Modal đổi tướng */}
      <div className={clsx('fixed top-0 right-0 left-0 bottom-0 z-50 bg-black/40 justify-center items-center', showModal ? 'flex' : 'hidden')}>
        <div className="w-[72%] h-[80%] relative">
          <img className='size-full object-fill' src="/bg-ranking.png" alt="" />
          <div className="size-full absolute z-10 top-0 left-0 pt-4 pb-16 flex flex-col">
            <div className="text-center font-bold text-2xl text-red-600 my-4">Chọn tướng</div>
            <form className="flex justify-center w-[84%] mx-auto gap-[3%]">
              <label className='w-[22%] cursor-pointer border-[0.275rem] border-transparent has-[:checked]:border-red-600' htmlFor="cuulinh">
                <img className='w-full' src="/img/modal/cuu1.png" alt="" />
                <input onChange={(e) => setCurrentChamp(e.target.id)} hidden type="radio" name="champ" id="cuulinh" />
              </label>
              <label className='w-[22%] cursor-pointer border-[0.275rem] border-transparent has-[:checked]:border-red-600' htmlFor="dmv">
                <img className='w-full' src="/img/modal/dmv1.png" alt="" />
                <input onChange={(e) => setCurrentChamp(e.target.id)} hidden type="radio" name="champ" id="dmv" />
              </label>
              <label className='w-[22%] cursor-pointer border-[0.275rem] border-transparent has-[:checked]:border-red-600' htmlFor="natra">
                <img className='w-full' src="/img/modal/na1.png" alt="" />
                <input onChange={(e) => setCurrentChamp(e.target.id)} hidden type="radio" name="champ" id="natra" />
              </label>
              <label className='w-[22%] cursor-pointer border-[0.275rem] border-transparent has-[:checked]:border-red-600' htmlFor="dethinh">
                <img className='w-full' src="/img/modal/dt1.png" alt="" />
                <input onChange={(e) => setCurrentChamp(e.target.id)} hidden type="radio" name="champ" id="dethinh" />
              </label>
            </form>
            <div onClick={handleAgreeChange} className="mt-auto w-max mx-auto select-none cursor-pointer flex justify-center items-center">
              <img className='w-36 absolute' src="/img/btn.png" alt="" />
              <div className="z-10 uppercase font-semibold text-red-600">Đồng ý</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Game