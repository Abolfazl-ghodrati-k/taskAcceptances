import React from 'react'
import { IconProps } from './types'

const Icon = ({ Icon, color , onClick, size = 20}: IconProps) => {
  return (
    <div onClick={onClick} className='flex items-center justify-center hover:bg-slate-300 cursor-pointer transition-all rounded-full p-1'>
        <Icon color={color} size={size} />
    </div>
  )
}

export default Icon