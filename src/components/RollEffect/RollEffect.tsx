import { useCallback, useEffect, useRef, useState } from 'react'
import { Card } from './Card/Card'
import { CHAMPTYPE } from '../../data/data';

// const GIF = [
//   { id: 'dmv', name: 'Đại Minh Vương', quantity: 5, icon: 'ic_natra.png', type: 'champ' },
//   { id: 'da', name: 'Tinh Hoa Thiên Kỹ', quantity: 666, icon: 's2.png', type: 'item' }
// ]

type ARRI = {
  id: string;
  name: string;
  quantity: number;
  icon: string;
  type: string;
}

type Props = {
  turn: number;
  setRolling: React.Dispatch<React.SetStateAction<boolean>>;
  data: CHAMPTYPE;
  user: { luot: number; tinhhoa: number; phieu: number; [key: string]: number };
  setUser: React.Dispatch<React.SetStateAction<{
    [key: string]: number;
    luot: number;
    tinhhoa: number;
    phieu: number;
  }>>;
}

export const RollEffect = ({ turn, setRolling, data, user, setUser }: Props) => {
  const [eff, setEff] = useState<boolean>(true)
  const [gif, setGif] = useState<ARRI[] | undefined>()
  const boxRef = useRef<HTMLDivElement>(null)

  const handleDocumentClick = (e: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(e.target as Node | null)) {
      setRolling(false)
    }
  }

  const random = useCallback(() => {
    const randomNum = Math.random() * 1000
    if (randomNum < 2) return { id: data.id, name: data.name, quantity: 120, icon: data.icon, type: 'champ' }
    else if (randomNum < 32) return { id: data.id, name: data.name, quantity: 5, icon: data.icon, type: 'champ' }
    else if (randomNum < 282) return { id: data.id, name: data.name, quantity: 2, icon: data.icon, type: 'champ' }
    else if (randomNum < 604) return { id: data.id, name: data.name, quantity: 1, icon: data.icon, type: 'champ' }
    else if (randomNum < 614) return { id: 'tinhhoa', name: 'Tinh Hoa Thiên Kỹ', quantity: 666, icon: 's2.png', type: 'item' }
    else if (randomNum < 704) return { id: 'tinhhoa', name: 'Tinh Hoa Thiên Kỹ', quantity: 388, icon: 's2.png', type: 'item' }
    else if (randomNum < 804) return { id: 'tinhhoa', name: 'Tinh Hoa Thiên Kỹ', quantity: 288, icon: 's2.png', type: 'item' }
    else return { id: 'phieu', name: 'Phiếu Ủng Hộ', quantity: 12, icon: 's3.png', type: 'item' }
  }, [data])

  useEffect(() => {
    const arr = []
    if (turn === 1) {
      arr.push(random())
    } else {
      arr.push(random())
      arr.push(random())
      arr.push(random())
      arr.push(random())
      arr.push(random())
    }
    setGif(arr)
  }, [random, turn])

  useEffect(() => {
    if (gif) {
      const total1 = gif.reduce((accumulator, item) => {
        return item.id === 'tinhhoa' ? accumulator + item.quantity : accumulator
      }, 0)
      const total2 = gif.reduce((accumulator, item) => {
        return item.id === data.id ? accumulator + item.quantity : accumulator
      }, 0)
      const total3 = gif.reduce((accumulator, item) => {
        return item.id === 'phieu' ? accumulator + item.quantity : accumulator
      }, 0)
      const newUser = {
        ...user,
        tinhhoa: user.tinhhoa + total1,
        phieu: user.phieu + total3,
        [data.id]: (user[data.id] || 0) + total2
      }
      setUser(newUser)
      localStorage.setItem('UserData', JSON.stringify(newUser))
    }
  }, [data, gif])

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    setEff(true)
    const stoID = setTimeout(() => {
      setEff(false)
    }, 1500);
    return () => {
      clearTimeout(stoID)
    }
  }, [])

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-[999] grid place-content-center bg-[#000000] opacity-90">
      {eff ? (
        <img className='object-cover w-[50vw]' src="/roll.gif" alt="" />
      ) :
        (
          <div className="relative">
            <div id='text-shadow' className="absolute left-1/2 -translate-x-1/2 text-5xl -top-8 italic font-bold text-yellow-300">Chúc mừng</div>
            <div ref={boxRef} className="bg-gradient-to-b from-yellow-800 to-yellow-400/30 w-screen h-64 flex items-center">
              <div className="w-full h-[60%] flex justify-center gap-4 animate-scale-up-center">
                {gif?.map((data, index) => <Card key={index} icon={data.icon} name={data.name} type={data.type} quantity={data.quantity} />)}
              </div>
            </div>
            <div className="text-gray-500/80 select-none mt-4 animate-pulse text-center italic font-normal">Nhấp bấm kỳ để tiếp tục</div>
          </div>
        )}
    </div>
  )
}
