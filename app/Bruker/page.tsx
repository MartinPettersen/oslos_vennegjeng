"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-4 text-orange-300 text-xl font-bold">
      <h1>Bruker Side</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Navn: {session?.user?.name}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
};

export default page;
