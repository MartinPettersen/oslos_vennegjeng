"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Thread } from "../../../types/Thread";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  forumLabel: string;
};
const CreateThreadForm = ({ forumLabel }: Props) => {
  const router = useRouter();

  const id = uuidv4();

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const [form, setForm] = useState({
    id: id,
    headline: "",
    userName: session?.user?.name,
    content: "",
    forumLabel: forumLabel,
    replies: [],
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

    const res = await fetch("/api/Threads", {
      method: "POST",
      body: JSON.stringify({ form, forumLabel, id }),
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
    <div className="w-full h-full flex sm:items-center justify-center">
      <p className="text-red-700">{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col w-full sm:w-[22%] h-[40%] sm:h-[80%] bg-slate-600 p-6 text-orange-300 font-bold gap-4 sm:gap-4"
      >
        <h1 className="flex items-center justify-center">Opprett Innlegg</h1>
        <h1>Navn: {session?.user?.name}</h1>

        <div className="flex justify-between">
          <label>Tittel</label>
          <input
            id="headline"
            type="text"
            name="headline"
            onChange={handleChange}
            required={true}
            value={form.headline}
            className=" text-slate-800"
          />
        </div>
        <div className="flex justify-between">
          <label>Innhold</label>
          <input
            id="content"
            type="text"
            name="content"
            onChange={handleChange}
            required={true}
            value={form.content}
            className=" text-slate-800"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Opprett Innlegg"
            className="bg-slate-700 hover:bg-slate-500 border-4 text-white border-orange-300 hover:border-orange-500 sm:w-[80%] p-4 rounded-full hover:cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default CreateThreadForm;
