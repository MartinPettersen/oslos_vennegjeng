"use client";

import React, { useState } from "react";
import { FlagIcon } from "@heroicons/react/20/solid";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Post } from "@/types/Post";

type Props = {
    subjectType?: String,
    subjectId?: String,
}

const ReportForm = ({subjectId, subjectType}: Props) => {
  const [toggleReport, setToggleReport] = useState(false);

  const id = uuidv4();

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/api/auth/signin?callbackUrl=/Bruker");

    },
  });

  const [report, setReport] = useState({
    reportId: id,
    subjectType: subjectType,
    subjectId: subjectId,
    reason: "",
    userName: session?.user?.name,
  });


  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/Report", {
      method: "POST",
      body: JSON.stringify({ report }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
        setToggleReport(false)
    }
  };

  return (
    <div>
      {!toggleReport ? (
        <FlagIcon
          onClick={() => setToggleReport(true)}
          className="h-4 w-4 text-red-500 hover:cursor-pointer"
        />
      ) : (
        <div className="flex fixed top-0 left-0 z-10  w-full h-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="bg-slate-700 flex gap-4 w-[90%] sm:w-[29%] h-[29%] border-2 border-orange-300"
          >
              <p className="text-red-700">{errorMessage}</p>
            <div className="flex flex-col items-center justify-center w-full gap-2 sm:gap-6 h-full">
              <h2 className="text-red-600 font-bold text-3xl">Rapporter</h2>

              <div className="flex justify-between w-[55%]">
                <label>Grunn:</label>
                <input
                  id="reason"
                  type="text"
                  name="reason"
                  onChange={handleChange}
                  required={true}
                  value={report.reason}
                  className=" text-slate-800"
                />
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-8">
                <input
                  type="submit"
                  value="Ja"
                  className="flex items-center justify-center w-[5rem] bg-slate-800 hover:bg-slate-900 p-2 text-white font-bold hover:text-red-500 cursor-pointer"
                />
                <div
                  onClick={() => setToggleReport(false)}
                  className="flex items-center justify-center w-[5rem] bg-slate-800 hover:bg-slate-900 p-2 text-white font-bold hover:text-emerald-500 cursor-pointer"
                >
                  Nei
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
