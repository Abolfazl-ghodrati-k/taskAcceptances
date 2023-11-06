import React, { useCallback, useState } from 'react'
import { SelectProps } from './types'

const Select = ({ onDeselect, onSelect }: SelectProps) => {
  const [selected, setSelected] = useState(false)

  const toggleSelected = useCallback(
    () => {
      setSelected((prevState) => !prevState)
    },
    [],
  )
  
  return (
    <div onClick={toggleSelected} className='flex items-center justify-center w-[20px] h-[20px] ml-2 cursor-pointer rounded-full border-2 border-black overflow-hidden '>
      <div className={`w-[12px] h-[12px] ${selected ? 'opacity-100' : 'opacity-0'} transition-all bg-[#15159b] rounded-full`}>
        
      </div>
    </div>
  )
}

export default Select