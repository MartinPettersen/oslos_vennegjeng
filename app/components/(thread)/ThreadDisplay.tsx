import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    // console.log("running");
    // console.log(res)
    if (!res.ok) {
      const response = await res.json();
      // console.log(response.message);
    } else {
      const temp = await res.json();
      // console.log(temp);
      console.log(temp.data);
      setThread(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    console.log("i run");
    getThread();
  }, []);

  return <div>{winReady ? <Link href={`../../Thread/${threadId}`} className="flex flex-col">
    <h2 className="font-bold text-xl">
    {thread!.headline} 
    </h2>
    <div className="flex justify-between">
    <p>Author: {thread!.userName}</p> 
    <p>#{thread!.replies.length}</p> 

    </div>
    </Link> : null}</div>;
};

export default ThreadDisplay;