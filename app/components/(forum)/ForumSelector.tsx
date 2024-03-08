import { Forum } from "@/types/Forums";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  forums: Forum[];
};

const ForumSelector = ({ forums }: Props) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div>
      {toggled ? (
        <>
          <div
            className="z-1 absolute left-0 top-0 w-screen h-screen"
            onClick={() => setToggled(!toggled)}
          ></div>
          <div className="z-10 absolute  flex flex-col border-2 border-slate-700 bg-slate-700 bg-opacity-30 backdrop-blur-md">
            {forums.map((forum) => (
              <Link
                href={`../Forum/${forum.label}`}
                className=" text-orange-300 p-2 pl-7 pr-7 hover:text-orange-400 hover:bg-slate-700 hover:bg-opacity-40 w-[100%]"
              >
                {forum.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}
      <div
        className=" bg-slate-900 font-bold p-4 rounded bg-opacity-30 hover:bg-opacity-50 backdrop-blur-md text-orange-300 hover:text-orange-400 cursor-pointer"
        onClick={() => setToggled(!toggled)}
      >
        Velg Forum
      </div>
    </div>
  );
};

export default ForumSelector;
