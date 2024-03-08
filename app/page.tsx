import Image from "next/image";
import Navbar from "./components/(navigation)/Navbar";
import Picture from "./components/(picture)/Picture";
import ContainerForum from "./components/(forum)/ContainerForum";

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col gap-2 items-center justify-start  h-full sm:h-[90%] sm:pl-24 sm:pr-24">
      <Picture />
      <ContainerForum />
    </main>
  );
}
