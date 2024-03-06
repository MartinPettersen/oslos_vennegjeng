'use client'
import { Thread } from "@/types/Thread";
import React, { useState } from "react";
import ReplyContainer from "./ReplyContainer";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditThread from "./EditThread";

type Props = {
  thread: Thread;
};

const ThreadContent = ({ thread }: Props) => {
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      //redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    console.log("i del")
    const res = await fetch("/api/DeleteThread", {
      method: "POST",
      body: JSON.stringify({ thread}),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col bg-slate-600 justify-center gap-4 p-4">
      <div className="flex justify-between items-center text-orange-300 ">
        <h1 className="font-bold text-xl">{thread!.headline}</h1>
        <div className="">{thread!.replies.length}</div>
        {session?.user?.name === thread?.userName ? (
          <div className=" flex gap-2">
            <PencilIcon onClick={() => setToggle(!toggle)} className="h-4 w-4 hover:cursor-pointer" />
            <TrashIcon
              onClick={() => handleDelete()}
              className="h-4 w-4 text-red-500 hover:cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-orange-300">{thread!.userName}</div>
      {toggle ? 
      <EditThread thread={thread}/>  :
    
      <p className="text-orange-300">{thread!.content}</p>
    }
    </div>
  );
};

export default ThreadContent;
