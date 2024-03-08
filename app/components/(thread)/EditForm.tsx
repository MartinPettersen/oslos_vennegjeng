"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { Post } from "@/types/Post";

type Props = {
  post: Post;
};

const EditForm = ({ post }: Props) => {
  const router = useRouter();

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const [form, setForm] = useState({
    postId: post.postId,
    threadId: post.threadId,
    reply: post.reply.toString(),
    userName: post.userName,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/EditPost", {
      method: "POST",
      body: JSON.stringify({ form }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="z-[100] absolute w-[80%] sm:w-[50%]   rounded-sm drop-shadow-md flex items-center gap-4 flex-col p-4">
      <p className="text-red-700">{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col w-full sm:w-[50%] h-[40%] sm:h-[80%] bg-slate-600 p-6 text-orange-300 font-bold gap-4 sm:gap-4"
      >
        <h1 className="flex items-center justify-center">Endre Innlegg</h1>
        <h1>Du svarer som: {session?.user?.name}</h1>

        <div className="flex gap-2">
          <label className="">Svar </label>
          <input
            id="reply"
            type="text"
            name="reply"
            onChange={handleChange}
            required={true}
            value={form.reply}
            className=" text-slate-800 "
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Send Svar"
            className="bg-slate-700 hover:bg-slate-500 border-4 text-white border-orange-300 hover:border-orange-500 w-[80%] p-4 rounded-full hover:cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
