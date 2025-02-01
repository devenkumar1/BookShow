'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function AdminPanel() {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (!userData) {
            dispatch(getUserData);
        }
        setIsClient(true);
    }, [userData, dispatch]);

    useEffect(() => {
        if (userData && userData?.role !== "Admin") {
            toast.error("unauthorized access");
            navigate.push('/home');
        }
    }, [userData, navigate]);

    if (!userData) {
        return <div>Not Authorised</div>;
    }

    if (!isClient) return null;

    return (
        <div>AdminPanel</div>
    );
}

export default AdminPanel;
