import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeStamp from "./TimeStamp";

type Props = {
  threadId: String;
};

const ThreadDisplay = ({ threadId }: Props) => {
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
    <div>
      {winReady ? (
        <Link
          href={`../../Thread/${threadId}`}
          className="flex flex-col text-orange-300 "
        >
          <h2 className="font-bold text-xl">{thread!.headline}</h2>
          <div className="flex justify-between">
            <p>Author: {thread!.userName}</p>
            <div className="flex gap-1">
              <TimeStamp time={thread!.createdAt} />
              <p>#{thread!.replies.length}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="animate-pulse font-bold text-3xl text-orange-300 w-full items-center justify-center">
          Loading
        </div>
      )}
    </div>
  );
};

export default ThreadDisplay;
