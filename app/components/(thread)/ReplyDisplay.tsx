"use client";
import { Post } from "@/types/Post";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import EditForm from "./EditForm";
import PostShare from "./PostShare";
import UserNameLink from "./UserNameLink";

type Props = {
  postId: String;
};

const ReplyDisplay = ({ postId }: Props) => {
  const [post, setPost] = useState<Post>();
  const [winReady, setwinReady] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getPost = async () => {
    const res = await fetch("/api/GetPost", {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setPost(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      //redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    const threadId = post?.threadId;
    const res = await fetch("/api/DeletePost", {
      method: "POST",
      body: JSON.stringify({ postId, threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
    }
  };

  return (
    <div className="bg-slate-500 flex w-[100%] p-4 flex-col gap-4 text-orange-300 border-2 border-slate-200">
      <div className="flex justify-between items-center ">
        <UserNameLink userName={post?.userName}/>
        {session?.user?.name === post?.userName ? (
          <div className=" flex gap-2">
            <PencilIcon
              onClick={() => setToggle(!toggle)}
              className="h-4 w-4 text-orange-300 hover:cursor-pointer"
            />
            <TrashIcon
              onClick={() => handleDelete()}
              className="h-4 w-4 text-red-500 hover:cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row justify-between">
        {toggle ? <EditForm post={post!} /> : <p>{post?.reply}</p>}
        <h3 className="font-bold">
          {post?.createdAt === post?.updatedAt ? "" : "[Edited]"}
        </h3>
      </div>
        <div>
          <PostShare postId={postId} />
        </div>
    </div>
  );
};

export default ReplyDisplay;
