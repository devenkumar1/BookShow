'use client'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserData } from "@/store/userSlice";
import Image from "next/image";

export function LineBgGrid() {
  const { userData } = useSelector((state) => state.user);
  const navigate=useRouter();
  console.log(userData);
  const HandleClick=()=>{
    navigate.push('/user/profile/edit');
  }

  return (
    <div className="h-[50rem] w-full bg-gradient-to-b from-blue-500 to-indigo-800 relative flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 flex  items-center justify-center bg-gradient-to-t from-indigo-800 to-blue-500 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Glassmorphic Profile Card */}
      <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center mt-8">
        <h1 className="text-5xl font-extrabold text-center text-white pt-8">
          Profile Page
        </h1>

        {userData && (
          <div className="flex flex-col justify-center p-10 w-4/5 md:w-1/2 bg-white bg-opacity-40 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              <Image src={userData?.profilePic} height={150} width={150} className="rounded-lg mx-auto py-2" alt="profile-picture"/>
              Full Name: {(userData?.name)}
            </h3>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Email: {userData?.email}
            </h3>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Type: {userData?.role}
            </h3>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Phone Number: {userData?.phonenumber ? userData.phonenumber : "Not Provided"}
            </h3>
            {/* <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Joined on: {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </h3> */}
           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]" onClick={()=>HandleClick()}>Edit Profile</button> 
          </div>
        )}
      </div>
    </div>
  );
}

