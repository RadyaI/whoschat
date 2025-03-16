"use client"

import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";
import { FcLock } from "react-icons/fc";

export default function Chat({ roomId }: { roomId: string }) {

    const [status, setStatus] = useState<string>("loading");
    const [password, setPassword] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [exp, setExp] = useState<number>(0);
    const [createdAt, setCreatedAt] = useState<number>(0);

    useEffect(() => {
        async function checkRoom() {
            try {
                const data = await getDocs(query(collection(db, "rooms"), where("roomCode", "==", roomId)))
                if (data.empty) {
                    setStatus("notfound")
                } else {
                    data.forEach((data) => {
                        setPassword(data.data().password)
                        setExp(data.data().exp)
                        setCreatedAt(data.data().createdAt)
                        if (data.data().usePassword && !sessionStorage.getItem("pass")) {
                            setStatus("needpassword")
                        } else {
                            setStatus("true")
                        }
                    })
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }

        checkRoom()
    }, [])

    if (status === "loading") {
        return (
            <>
                <div className="w-[90%] sm:w-1/2 flex flex-col items-center sm:flex-row gap-5 justify-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Loading></Loading>
                    <p className="text-3xl text-center">Looking for a room...</p>
                </div>
            </>
        )
    }

    if (status === "notfound") {
        return (
            <>
                <div className="w-[90%] sm:w-1/2 flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <p className="text-xl">404</p>
                    <p className="text-3xl text-center mt-4">Where is the room?</p>
                </div>
            </>
        )
    }

    function checkPassword(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (inputPassword === password) {
                sessionStorage.setItem("pass", "true")
                setStatus("true")
            } else {
                alert("Wrong password!")
            }
        }
    }

    if (status === "needpassword") {
        return (
            <>
                <div className="w-[90%] sm:w-1/2 flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <p className="text-3xl"><FcLock /></p>
                    <p className="text-xl text-center mt-4">
                        <input type="text" onKeyUp={(e) => checkPassword(e)} onChange={(e) => setInputPassword(e.target.value)} placeholder="Need password..." className="border w-full outline-none px-4 py-1" />
                    </p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-[90%]  sm:w-1/2 h-[95dvh] mx-auto mt-4">
                <div className="w-fit">Created at: {new Date(createdAt).toLocaleString("id-ID", {
                    hour12: false,
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: '2-digit'
                })}</div>

                <div className="w-fit">Exp at: {new Date(exp).toLocaleString("id-ID", {
                    hour12: false,
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: '2-digit'
                })}</div>

                <ChatWrapper className="w-[90%] px-4 mx-auto flex flex-col items-end h-[85%] mt-6">
                    
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Hellowwww</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    <div className="text-right gap-2 w-full mt-6">
                        <p>Lorem</p>
                        <p className="text-[10px]">20:01</p>
                    </div>
                    
                </ChatWrapper>
            </div>
        </>
    )
}

const loadingAnimation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`

const Loading = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-top: 4px solid white;
    border-left: 4px solid #0a0a0a;
    border-right: 4px solid #0a0a0a;
    border-bottom: 4px solid #0a0a0a;
    animation: ${loadingAnimation} 500ms linear infinite;
`

const ChatWrapper = styled.div`
    overflow: auto;

    &::-webkit-scrollbar{
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        display: none;
    }

    &::-webkit-scrollbar-thumb{
        width: 5px;
        background-color: #efefef;
        border-radius: 50px;
    }
`