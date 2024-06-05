
export const PuzziChamp = ({ width, icon }: { width?: string; icon: string }) => {
  return (
    <div
      id='fade_puzz'
      style={{
        clipPath: 'polygon(0 0, 60% 0, 100% 30%, 100% 100%, 30% 100%, 0 60%)',
        width: width || '4rem'
      }}
      className="bg-gradient-to-br to-red-700 from-yellow-600 p-[6%] relative"
    >
      <img className='w-[33%] bottom-[10%] right-[10%] absolute z-10' src="/img/manh.png" alt="" />
      <div
        style={{
          clipPath: 'polygon(0 0, 60% 0, 100% 30%, 100% 100%, 30% 100%, 0 60%)'
        }}
        className="bg-gradient-to-br from-red-700 from-20% to-yellow-600"
      >
        <img className='' src={`/img/${icon}`} alt="" />
      </div>
    </div>
  )
}
