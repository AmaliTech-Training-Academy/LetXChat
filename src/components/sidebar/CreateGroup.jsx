import React from 'react'
import edit from '../../assets/Edit.svg'

function CreateGroup() {
  return (
    <div className='w-full h-12 border-y bg-transparent mt-12 px-9 flex justify-between items-center'>
        <button className='w-[100px] h-5 bg-[#000000CC] text-white font-semibold text-sm rounded'>Create group</button>
        <div className='w-6 h-5 bg-[#000000CC] rounded flex items-center justify-center cursor-pointer'>
            <img src={edit} alt="" className=''/>
        </div>
    </div>
  )
}

export default CreateGroup