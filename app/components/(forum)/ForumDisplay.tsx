import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Forum = {
  label: String;
  status: String;
  threads: [];
};

type Props = {
  forum: Forum;
};

const ForumDisplay = ({ forum }: Props) => {
  const [thread, setThread] = useState<Thread>();
  const [winReady, setwinReady] = useState(false);

  const getThread = async () => {
    const forumLabel = forum.label;
    const res = await fetch("/api/GetThreads", {
      method: "POST",
      body: JSON.stringify({ forumLabel }),
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
    <div className=" flex flex-col text-slate-100 h-full border-2 rounded border-orange-300 w-[90%]">
      <Link
        href={`../Forum/${forum.label}`}
        className=" bg-slate-700 bg-opacity-50 p-2 hover:text-orange-400 backdrop-blur-md w-[100%]"
      >
        <h1 className="font-bold">{forum.label}</h1>
        <div>Tråder: {forum.threads.length}</div>
      </Link>
      <div className="bg-slate-600 hover:text-orange-400 p-2 bg-opacity-50 backdrop-blur-md w-[100%]">
        {winReady ? (
          <Link href={`../../Thread/${thread?.id}`} className="flex">
            <h1>Nyeste innlegg: </h1>
            <div>{thread?.headline}</div>
          </Link>
        ) : (
          <div className="animate-pulse font-bold text-3xl text-orange-300 w-full items-center justify-center">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDisplay;
