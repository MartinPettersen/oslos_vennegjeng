import React from "react";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className="text-orange-400 flex bg-slate-700 items-center justify-center w-full sm:h-[10%]">
      <nav className="flex flex-col font-bold sm:flex-row w-full px-8 py-4 items-center gap-4">
        <div>
          <Link href="/CreateForum">CreateForum</Link>
        </div>
        <div>
          <Link href="/AdminPage">Admin</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
