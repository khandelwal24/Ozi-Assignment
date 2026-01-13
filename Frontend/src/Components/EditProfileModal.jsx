import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { AArrowUp } from "lucide-react"
import axios from "axios"

const EditProfileModal = ({ open, setOpen, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user && open) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }, [user, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async() => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      name,
    } = formData

    if(newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        alert("Current password is required")
        return
      }
      if (newPassword.length < 6) {
        alert("New password must be at least 6 characters")
        return
      }
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match")
        return
      }
    }

    const payload = {
      name,
      currentPassword,
      newPassword,
      newPassword
    }

    console.log("Payload to backend:", payload)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal info & password
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label className="mb-2">Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label className="mb-2">Email</Label>
            <Input value={formData.email} disabled />
          </div>

          <div className="border-t pt-4 font-bold text-lg">
            Change Password
          </div>

          {/* Current Password */}
          <div>
            <Label className="mb-2">Current Password</Label>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>

          {/* New Password */}
          <div>
            <Label className="mb-2">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="mb-2">Confirm New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
