import clsx from 'clsx';
import { PuzziChamp } from '../../PuzziChamp/PuzziChamp'

export const Card = ({ type, name, icon, quantity }: {type: string; name: string; icon: string; quantity: number}) => {
  return (
    <div className={clsx('h-full w-[7.75rem] rounded-sm overflow-hidden select-none', type === 'champ' ? 'bg-[#db4747] text-[#db4747]' : 'bg-[#7a5397] text-[#7a5397]')}>
      <div className="h-4/5 grid place-content-center relative">
        {type === 'champ' ?
          <PuzziChamp icon={icon} />
          :
          <img className='w-16' src={`/img/${icon}`} alt="" />
        }
        <div className="absolute bottom-[0.05rem] right-[0.05rem] text-xs font-medium text-gray-300 w-10 rounded-[0.08rem] text-center bg-black/50">{quantity}</div>
      </div>
      <div className="h-1/5 bg-gray-300 grid place-content-center text-sm font-semibold tracking-tight">
        {name}
      </div>
    </div>
  )
}
