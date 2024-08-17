'use client'
import { FC, useState } from "react";
import Button from "./ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios"
import { z } from "zod";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFrienBtnProps {}

type FormData = z.infer<typeof addFriendValidator>

const AddFrienBtn: FC<AddFrienBtnProps> = ({}) => {
  const [showSuccess, setShowSuccess] = useState(false)

  const { register, handleSubmit, setError , formState:{errors}  }=useForm<FormData>({
    resolver: zodResolver(addFriendValidator)
  })

  const addFriend= async (email: string)=>{
    try{
const validatedEmail= addFriendValidator.parse({email})
  await axios.post('/api/friends/add', {
    email:validatedEmail
  })
  setShowSuccess(true)
    } catch(err){
if(err instanceof z.ZodError){
  setError('email', {message: err.message})
  return
}
if(err instanceof AxiosError){
  setError('email', {message: err.response?.data})
  return
}
setError('email' , {message: 'something went wrong'})
    }
  }
  const onSubmit= (data: FormData)=>{
    addFriend(data.email)
  }
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor="email"
        className=" block text-sm font-medium leading-6 text-gray-800"
      >
        Add Friend by Email
      </label>
      <div className="mt-2 flex gap-4 w-1/3 ">
        <input
        {...register('email')}
          type="email"
          className=" block px-2 w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6 "
          placeholder="you@example.com"
        />
        <Button>Add </Button>
      </div>
      <p className="mt-1 text-sm text-red-600"> {errors.email?.message} </p>
  {
    showSuccess ? 
    (
      <p className=" mt-1 text-sm text-green-600" > Friend request sent</p>

    ) : null
  }
    </form>
  );
};

export default AddFrienBtn;
