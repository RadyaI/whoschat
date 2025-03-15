import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Who's Chat - Chat",
    description: "An anonymous chatroom you can create, share, and delete anytime.",
};

export default async function ChatPage({ params }: { params: Promise<{ chat: string }> }) {

    const chatId = (await params).chat;

    return (
        <>
            {chatId}
        </>
    )
}
