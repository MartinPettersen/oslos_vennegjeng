"use client";
import Reply from "@/app/components/(thread)/Reply";
import ReplyDisplay from "@/app/components/(thread)/ReplyDisplay";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import ThreadDisplay from "@/app/components/(thread)/ThreadDisplay";
import { Post } from "@/types/Post";
import { Thread } from "@/types/Thread";
import React, { useEffect, useState } from "react";

type Props = {
  params: { user: string };
};

const page = ({ params }: Props) => {
  const userName = params.user;

  const [kommentarer, setKommentarer] = useState(false);
  const [threads, setThreads] = useState<Thread[]>();
  const [posts, setPosts] = useState<Post[]>();
  const [winReady, setwinReady] = useState(false);

  const getUserThreads = async () => {
    console.log("i run");
    const res = await fetch("/api/GetUserThreads", {
      method: "POST",
      body: JSON.stringify({ userName }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setThreads(temp.data);
      console.log(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getUserThreads();
  }, []);

  return (
    <div className="flex justify-center flex-col gap-4 sm:gap-10 w-screen items-center p-4">
      <div className="bg-slate-500  p-4 w-full sm:w-[60%] flex">
        <div className="w-full flex flex-col gap-2 sm:gap-4 sm:p-4 ">
          <h1 className="text-orange-300 font-bold text-4xl flex items-center justify-center ">
            {userName.replace("%20", " ")}
          </h1>
          <div className="border-2 flex h-[3rem] justify-between border-orange-300 bg-slate-600">
            <div
              onClick={() => setKommentarer(false)}
              className={`w-1/2  flex items-center cursor-pointer justify-center ${
                !kommentarer
                  ? "bg-slate-700 hover:bg-slate-600 text-orange-300 font-bold hover:text-orange-400"
                  : "bg-slate-500 hover:bg-slate-600 text-orange-300 font-semibold"
              } `}
            >
              Tråder
            </div>
            <div
              onClick={() => setKommentarer(true)}
              className={`w-1/2  flex items-center cursor-pointer justify-center ${
                kommentarer
                  ? "bg-slate-700 hover:bg-slate-600 text-orange-300 font-bold hover:text-orange-400"
                  : "bg-slate-500 hover:bg-slate-600 text-orange-300 hover:text-orange-400 font-semibold"
              } `}
            >
              kommentarer
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full flex  items-end justify-center">
        {!kommentarer ? (
          <div className=" w-full h-full flex flex-col gap-4 items-center justify-center">
            {winReady ? (
              threads!.map((thread: any) => (
                <div className="bg-slate-500 hover:bg-slate-400 text-orange-300 flex flex-col p-4 w-[80%] sm:w-[40%]">
                  <ThreadDisplay threadId={thread.id} />
                </div>
              ))
            ) : (
              <div className="animate-pulse  flex font-bold text-3xl text-orange-300 w-full items-center justify-center">
                Loading
              </div>
            )}
          </div>
        ) : (
          <div className="">k</div>
        )}
      </div>
    </div>
  );
};

export default page;
