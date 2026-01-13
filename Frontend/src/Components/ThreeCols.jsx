import React from 'react'

const ThreeCols = () => {
  return (
    <div className='h-full w-full'>
        <div className='h-full max-w-480 p-5 border border-black'>
            <div className='grid grid-cols-3 w-full justify-center items-center content-center self-center'>
                <div className='w-1/3'>Pending</div>
                <div className='w-1/3'>Completed</div>
                <div className='w-1/3'>In-Progress</div>
            </div>
        </div>
    </div>
  )
}

export default ThreeCols