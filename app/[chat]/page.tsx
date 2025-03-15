export default async function Chat({ params }: { params: Promise<{ chat: string }> }) {

    const { chat } = await params;

    return (
        <>
            {chat}
        </>
    )
}