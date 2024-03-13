"use client";
import { Thread } from "@/types/Thread";
import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import ReplyContainer from "./ReplyContainer";
import ThreadShare from "./ThreadShare";

type Props = {
  thread: Thread;
};

const Reply = ({ thread }: Props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {toggle ? (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 z-10 "
            onClick={() => setToggle(!toggle)}
          ></div>

          <ReplyForm thread={thread} />
        </>
      ) : (
        <div className="flex flex-row gap-2">
          <div
            onClick={() => setToggle(!toggle)}
            className="p-4 hover:cursor-pointer font-bold text-xl bg-slate-500 text-orange-300 hover:text-orange-400 hover:bg-slate-600 flex items-center justify-center w-[15%]"
          >
            Svar
          </div>
          <ThreadShare />
        </div>
      )}
      <div className="flex">
        <ReplyContainer thread={thread} />
      </div>
    </div>
  );
};

export default Reply;
