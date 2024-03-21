"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DeletePopup from "../components/(delete)/DeletePopup";

const page = () => {

  const [toggleDelete, setToggleDelete] = useState(false);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });


  const handleDelete = async () => {
    const userName = session?.user?.name
    const res = await fetch("/api/DeleteUser", {
      method: "POST",
      body: JSON.stringify({ userName }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
      
      signOut({ callbackUrl: "/" })

    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-4 text-orange-300 text-xl font-bold">
      <h1>Bruker Side</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Navn: {session?.user?.name}</p>
      <p>Role: {session?.user?.role}</p>
      <div onClick={() => setToggleDelete(true)} className="font-bold text-bold flex items-center justify-center p-4 bg-red-500 text-white">Slett bruker</div>
      {toggleDelete ? (
        <div className="flex flex-col absolute gap-4 z-1 bg-slate-700 border-2 border-orange-400 w-[80%] sm:w-[30%] items-center justify-center p-2">
          <div className="text-red-400 font-bold text-3xl">
            Er du sikker på at du ønsker å slette?
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div
              className="text-red-400 flex items-center justify-center p-2 bg-slate-800 border-2 border-slate-600 cursor-pointer hover:border-red-400"
              onClick={() => handleDelete()}
            >
              JA
            </div>
            <div
              className="text-emerald-400 flex items-center justify-center p-2 bg-slate-800 border-2 border-slate-600 cursor-pointer hover:border-emerald-400"
              onClick={() => setToggleDelete(false)}
            >
              NEI
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
