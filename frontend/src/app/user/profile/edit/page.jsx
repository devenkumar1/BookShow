'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
function EditProfile() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const navigate=useRouter();
    // Initialize state based on the user object or empty values
    const [name, setName] = useState(userData ? userData.name : "");
    const [phonenumber, setPhoneNumber] = useState(userData?.phonenumber || ""); // Ensure it's an empty string if null or undefined
    useEffect(() => {
        if (!userData) {
            dispatch(getUserData());
        } else {
            setName(userData?.name);
            setPhoneNumber(userData?.phonenumber || ""); 
        }
    }, [userData, dispatch]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if(!name || !phonenumber) return
        updateInfo={ name, phonenumber }
       
    };

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <div className='h-[50rem] w-full bg-gradient-to-b from-blue-500 to-indigo-800 relative flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-white'>Edit Profile</h1>
            <div className='flex flex-col justify-center p-10 w-4/5 md:w-1/2 bg-white bg-opacity-40 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl space-y-6 text-black'>
                <form className='flex flex-col gap-5'>
                    <label htmlFor="name">
                        Name:
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input type="email" id="email" name="email" value={userData?.email} disabled />
                    </label>
                    <label htmlFor="phonenumber">
                        Phone Number:
                        <input 
                            type="number" 
                            id="phonenumber" 
                            name="phonenumber" 
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                    </label>
                    <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]'>update</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
