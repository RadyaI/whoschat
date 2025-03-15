"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function HomeButton() {

    const router = useRouter();
    const [openOption, setOpenOption] = useState<boolean>(false);
    const [time, setTime] = useState<string>("30");

    function randomCode(): string {
        return Math.random().toString(36).substring(2, 7)
    }

    async function createRoom() {

        router.push(`/${randomCode()}`);
    }

    return (
        <>
            {openOption && (<>
                <div className="fixed z-20 p-4 w-[80%] sm:w-70 h-fit rounded-xl bg-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <div onClick={() => setOpenOption(false)} className="text-right mx-auto w-[80%] mr-4 cursor-pointer text-2xl">x</div>
                    <div className="flex mt-4 w-full justify-around">
                        <div onClick={() => setTime("30")} className={`${time === "30" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>30 Minute</div>
                        <div onClick={() => setTime("5")} className={`${time === "5" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>5 Hours</div>
                        <div onClick={() => setTime("24")} className={`${time === "24" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>24 Hours</div>
                    </div>
                    <p className="mt-5">Password: </p>
                    <input type="text" placeholder="Empty = no password" className="border rounded-md border-white outline-none px-4 py-2 w-full mt-1" />
                    <button onClick={createRoom} className="mt-3 cursor-pointer px-2 py-1 shadow hover:shadow-white">Create</button>
                </div>
            </>)}

            <div className="fixed z-10 flex flex-col text-2xl sm:text-xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <button onClick={() => setOpenOption(!openOption)} className="cursor-pointer hover:text-green-400">Create</button>
                <button>or <span className="cursor-pointer hover:text-green-400">Join</span></button>
            </div>
        </>
    )
}