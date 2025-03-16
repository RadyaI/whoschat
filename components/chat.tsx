"use client"

import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";

export default function Chat({ roomId }: { roomId: string }) {

    const [isNotFound, setIsNotFound] = useState<string>("loading");

    useEffect(() => {
        async function checkRoom() {
            try {
                const data = await getDocs(query(collection(db, "rooms"), where("roomCode", "==", roomId)))
                if (data.empty) {
                    setIsNotFound("true")
                } else {
                    setIsNotFound("false")
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
        }

        checkRoom()
    }, [])

    if (isNotFound === "loading") {
        return (
            <>
                <div className="w-[90%] sm:w-1/2 flex flex-col items-center sm:flex-row gap-5 justify-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Loading></Loading>
                    <p className="text-3xl text-center">Looking for a room...</p>
                </div>
            </>
        )
    }

    if (isNotFound === "true") {
        return (
            <>
                <div className="w-[90%] sm:w-1/2 flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <p className="text-xl">404</p>
                    <p className="text-3xl text-center mt-4">Where is the room?</p>
                </div>
            </>
        )
    }

    return (
        <>
            {roomId}
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