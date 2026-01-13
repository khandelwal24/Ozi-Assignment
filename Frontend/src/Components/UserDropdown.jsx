import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer,toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import EditProfileModal from "./EditProfileModal.jsx"


const UserDropdown = () => {
    const [openEdit, setOpenEdit] = useState(false)

    const navigate = useNavigate();

    const handleLogout = async(e) => {
      try{
        const res = await axios.get('http://localhost:1000/api/v1/user/logout',{headers:{"Content-Type":'application/json'},withCredentials:true})
        if(res?.data?.success){
          toast.success(res.data.message);
          setTimeout(()=>navigate('/login'),1000);
        }
      }
      catch(error){
        console.log('Error Occured',error);
        toast.error(error.response.data.message);
      }
    };


  const user = {
    name: "Harsh",
    email: "harsh@gmail.com",
  }

  return (
    <>
    <DropdownMenu>
      <ToastContainer theme='dark' position='top-center' autoClose={1000}/>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setOpenEdit(true)} className="hover:cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Edit Profile
          
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500 hover:cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <EditProfileModal
        open={openEdit}
        setOpen={setOpenEdit}
        user={user}
      />
      </>
  )
}

export default UserDropdown
