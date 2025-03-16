"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function HomeButton() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openOption, setOpenOption] = useState<boolean>(false);
    const [time, setTime] = useState<string>("30");
    const [chatPassword, setChatPassword] = useState<string>("")

    function randomCode(): string {
        return Math.random().toString(36).substring(2, 7)
    }

    async function createRoom() {
        try {
            setIsLoading(true)
            const nowMillis = Timestamp.now().toMillis()
            let expMillis;
            const plus30Minutes = nowMillis + 30 * 60 * 1000;
            const plus5Hours = nowMillis + 5 * 60 * 60 * 1000;
            const plus24Hours = nowMillis + 24 * 60 * 60 * 1000;

            if (time === "30") {
                expMillis = plus30Minutes
            } else if (time === "5") {
                expMillis = plus5Hours
            } else {
                expMillis = plus24Hours
            }

            const data = {
                roomCode: randomCode(),
                exp: Timestamp.fromMillis(expMillis).toMillis(),
                createdAt: Timestamp.fromMillis(nowMillis).toMillis(),
                usePassword: chatPassword ? true : false,
                password: chatPassword
            }

            await addDoc(collection(db, "rooms"), data)
            setIsLoading(false)

            router.push(`/${data.roomCode}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    return (
        <>
            {openOption && (<>
                <Option className="fixed z-20 p-4 w-[80%] sm:w-70 h-fit rounded-xl bg-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div onClick={() => setOpenOption(false)} className="text-right mx-auto w-[80%] mr-4 cursor-pointer text-2xl">x</div>
                    <div className="flex mt-4 w-full justify-around">
                        <div onClick={() => setTime("30")} className={`${time === "30" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>30 Minute</div>
                        <div onClick={() => setTime("5")} className={`${time === "5" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>5 Hours</div>
                        <div onClick={() => setTime("24")} className={`${time === "24" ? "shadow shadow-white" : ""} w-15 h-15 cursor-pointer text-center`}>24 Hours</div>
                    </div>
                    <p className="mt-5">Password: </p>
                    <input type="text" value={chatPassword} onChange={(e) => setChatPassword(e.target.value)} placeholder="Empty = no password" className="border rounded-md border-white outline-none px-4 py-2 w-full mt-1" />
                    <button onClick={createRoom} className="mt-3 cursor-pointer px-2 py-1 shadow hover:shadow-white">{isLoading ? "Loading..." : "Create"}</button>
                </Option>
            </>)}

            <div className="fixed z-10 flex flex-col text-2xl sm:text-xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <button onClick={() => setOpenOption(!openOption)} className="cursor-pointer hover:text-green-400">Create</button>
                <button>or <span className="cursor-pointer hover:text-green-400">Join</span></button>
            </div>
        </>
    )
}

const optionAppear = keyframes`
    0%{
        transform: translateY(-10px);
    }
    50%{
        transform: translateY(10px);
    }
    100%{
        transform: translatey(0px);
    }
`

const Option = styled.div`
    animation: ${optionAppear} 500ms;
`