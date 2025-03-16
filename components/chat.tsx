"use client"

import { db } from "@/config/firebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";
import { FcLock } from "react-icons/fc";

type ChatMessage = {
    id: string,
    roomCode: string
    message: string,
    createdAt: number
} | null

export default function Chat({ roomId }: { roomId: string }) {

    const [status, setStatus] = useState<string>("loading");
    const [password, setPassword] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [exp, setExp] = useState<number>(0);
    const [createdAt, setCreatedAt] = useState<number>(0);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [chatData, setChatData] = useState<ChatMessage[] | null>([null]);

    const getChatData = useCallback(() => {
        try {
            return onSnapshot(query(
                collection(db, "chats"),
                where("roomCode", "==", roomId),
                orderBy("createdAt", "desc")
            ), (snapshot) => {
                const temp: ChatMessage[] = [];
                snapshot.forEach((data) => {
                    temp.push({ ...data.data(), id: data.id } as ChatMessage)
                })
                setChatData(temp);
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }, [roomId]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Timestamp.now().toMillis() > exp) {
                setStatus("notfound");
            }
        }, 500);

        return () => clearInterval(interval);
    }, [exp])

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
        getChatData()
    }, [roomId, getChatData])

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

    async function submitMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            try {
                if (inputMessage.trim()) {
                    const data = {
                        roomCode: roomId,
                        message: inputMessage,
                        createdAt: Timestamp.now().toMillis()
                    }

                    setInputMessage("")
                    await addDoc(collection(db, "chats"), data)
                } else {
                    alert("Empty message!")
                }

            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }
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

                <ChatWrapper className="w-[90%] h-[75%] px-4 mx-auto flex flex-col items-end mt-6">

                    {chatData?.map((i, index) =>
                        <div key={index} className="text-right gap-2 w-full mt-6">
                            <p>{i?.message}</p>
                            <p className="text-[10px]">{new Date(i?.createdAt ?? 0).toLocaleString("id-ID",
                                {
                                    hour12: false,
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: '2-digit'
                                }
                            )}</p>
                        </div>
                    )}

                </ChatWrapper>
                <div className="mx-auto w-[90%]">
                    <input type="text" onKeyUp={(e) => submitMessage(e)} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Message..." className="w-full px-3 py-2 mt-3 outline-none" />
                </div>
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
        /* width: 5px;
        background-color: #efefef;
        border-radius: 50px; */
        display: none;
    }
`