"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Thread } from "../../../types/Thread";

const CreateForum = () => {
  const router = useRouter();
  const [forum, setForum] = useState({
    label: "",
    status: "clear",
    threads: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/Forums", {
      method: "POST",
      body: JSON.stringify({ forum }),
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
        className="flex flex-col h-[40%] sm:h-[80%] bg-slate-600 p-6 text-orange-300 font-bold gap-4 sm:gap-4"
      >
        <h1 className="flex items-center justify-center">Opprett Forum</h1>
        <div className="flex gap-2">
          <label>Forum Navn</label>
          <input
            id="label"
            type="text"
            name="label"
            onChange={handleChange}
            required={true}
            value={forum.label}
            className=" text-slate-800"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Opprett Forum"
            className="bg-slate-700 hover:bg-slate-500 border-4 text-white border-orange-300 hover:border-orange-500 w-[80%] p-4 rounded-full hover:cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default CreateForum;
