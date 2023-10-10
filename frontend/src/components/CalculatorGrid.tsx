import { ReactNode } from 'react'

const CalculatorGrid = ({
  text,
  place = '',
  clickHandler,
}: {
  text: string | ReactNode
  place?: string
  clickHandler?: () => void
}) => {
  return (
    // p-[23.5px]
    <div
      className={`bg-base-200 w-24 h-[75px] text-wrap text-center  flex items-center justify-center font-bold text-xl select-none  duration-200 cursor-pointer shadow-sm rounded-lg hover:bg-info ${place}  `}
      onClick={clickHandler}
    >
      {text}
    </div>
  )
}

export default CalculatorGrid
