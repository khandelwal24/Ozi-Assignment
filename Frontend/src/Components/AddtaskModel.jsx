import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import axios from "axios"
import { toast,ToastContainer } from "react-toastify"

const AddtaskHandler = async ()=>{
    try{
        const res = await axios.post('http://localhost:1000/api/v1/task/addtask');
        if(res?.data.success){
            toast.success(res.data.message);
        }
    }
    catch(error){
        console.log('Error Occured in addig task',error);
        toast.error(error.response.data.message);
    }
}

const AddTaskModal = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new task.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-1">Task Title</Label>
            <Input id="title" placeholder="Enter task title" />
          </div>

          <div>
            <Label htmlFor="desc" className="mb-1">Description</Label>
            <Input id="desc" placeholder="Enter description" />
          </div>

          <div>
            <Label htmlFor="dueDate" className="mb-1">Due-Date</Label>
            <input type="date" /> 
          </div>

          <Button onClick={AddtaskHandler} className="w-full">Add Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal
