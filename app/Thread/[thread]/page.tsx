"use client";
import Reply from "@/app/components/(thread)/Reply";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import { Thread } from "@/types/Thread";
import React, { useEffect, useState } from "react";

type Props = {
  params: { thread: string };
};

const page = ({ params }: Props) => {
  const threadId = params.thread;

  const [thread, setThread] = useState<Thread>();
  const [winReady, setwinReady] = useState(false);

  const getThread = async () => {
    const res = await fetch("/api/GetThread", {
      method: "POST",
      body: JSON.stringify({ threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setThread(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getThread();
  }, []);

  return (
    <div className="flex justify-center w-screen items-center p-4">
      <div className="bg-slate-300  p-4 w-full sm:w-[60%] flex">
        {winReady ? (
          <div className="w-full flex flex-col gap-2 sm:p-4 ">
            <ThreadContent thread={thread!} />
            <Reply thread={thread!} />
          </div>
        ) : (
          <div className="animate-pulse font-bold flex text-3xl text-orange-300 w-full items-center justify-center">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
