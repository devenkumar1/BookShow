'use client';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '@/store/userSlice';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RootLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (!userData) {
            dispatch(getUserData());
        }
        setIsClient(true);
    }, [userData, dispatch]);

    useEffect(() => {
        if (userData && userData.role !== "Admin") {
            toast.error("Unauthorized access");
            navigate.replace('/home');
        }
    }, [userData, navigate]);

    if (!isClient) return <div>Loading...</div>;

    if (!userData) {
        return <div className='w-full min-h-screen text-center'>Not Authorized</div>;
    }
    return (
        <div className="w-full flex flex-row">
            <div className="w-[10%] min-h-screen flex flex-col pt-5 justify-around place-items-center text-center bg-blue-500 ">
                <aside className="h-[100%] flex flex-col items-center justify-center ">
                    <ul className="flex flex-col gap-10 text-2xl ">
                        <li className="hover:bg-blue-900 cursor-pointer">
                            <Link href={"/v1/admin"}>Admin dashboard</Link>
                        </li>
                        <li className="hover:bg-blue-900 cursor-pointer">
                            <Link href={"/v1/admin/component/movie"}>Movie dashboard</Link>
                        </li>
                        <li className="hover:bg-blue-900 cursor-pointer">
                            <Link href={"/v1/admin/component/shows"}>Show dashboard</Link>
                        </li>
                    </ul>
                </aside>
            </div>
            <main className="w-full min-h-screen">
             {children}
            </main>

        </div>
    );
}
