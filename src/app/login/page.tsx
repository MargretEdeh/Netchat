'use client'
import { FC, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/Button";
import { LuLoader2 } from "react-icons/lu";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
    const [isLoading , setIsLoading]= useState<boolean>(false)

   async function loginWithGoogle () {
        setIsLoading(true)
        try{
            // throw new Error('wahala oh')
            await signIn('google')
        }
        catch(err) {

            toast.error('wahala dey ohhh')
            setIsLoading(false)
        }
    }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-[10%] px-4 sm:px-6 lg:px-8 ">
        <div className=" w-full flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <Image src="/logo.svg" alt=" logo" width={50} height={50} />
              <h2 className=" text-md text-green-700 font-bold ">etChat </h2>
            </div>
            <h2 className="  text-center text-3xl font-bold tracking-wide text-gray-800"> Sign in with Google </h2>
          </div>
          <Button 
          isLoading={isLoading}
          type="button"
          className="max-w-sm flex items-center justify-center gap-2 mx-auto w-full"
          onClick={loginWithGoogle}
          > 
          {isLoading ?  null : <FcGoogle className="text-xl"/>  }
         
          Sign in 

          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
