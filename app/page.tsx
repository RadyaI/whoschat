import HomeButton from "@/components/homeButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who's Chat - Home",
  description: "An anonymous chatroom you can create, share, and delete anytime.",
};

export default function Home() {
  return (
    <>
      <HomeButton></HomeButton>
    </>
  )
}