import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import AddTaskModal from './AddtaskModel.jsx';
import UserDropdown from './UserDropDown.jsx';

const Navbar = () => {
  const[open,setOpen] = useState(false);
  
  return (
    <div className='w-full bg-gray-950 text-white'>
        <div className='max-w-310 p-3 flex justify-between items-center'>
            <span className='font-bold text-2xl'>Kanban board</span>
            <span className='font-bold text-2xl flex gap-3 items-center'>
                <button onClick={()=>setOpen(true)} className='p-2 text-sm rounded-lg font-bold text-white bg-gray-800 hover:cursor-pointer hover:bg-gray-700 border-white border'>
                  Add task + 
                </button>
                 {/* MODAL */}
                <AddTaskModal open={open} setOpen={setOpen} />
                <UserDropdown />
            </span>
        </div>
    </div>
  )
}

export default Navbar