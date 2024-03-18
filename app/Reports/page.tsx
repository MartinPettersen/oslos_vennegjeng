"use client";

import { Post } from "@/types/Post";
import { Report } from "@/types/Report";
import { Thread } from "@/types/Thread";



import React, { useEffect, useState } from "react";
import ReportCard from "../components/(report)/ReportCard";

const page = () => {
  const [reports, setReports] = useState<Report[]>();

  const [winReady, setwinReady] = useState(false);

  const status = "clear";


  const getReports = async () => {
    const res = await fetch("/api/GetReports", {
      method: "POST",
      body: JSON.stringify({ status }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setReports(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getReports();
    setwinReady(true);
  }, []);



  //
  return (
    <div className="w-full h-full  flex flex-col items-center gap-4 justify-start pt-4 sm:pt8">
      <div className="text-orange-300 font-bold text-3xl">Raporter</div>
      <div className="w-[90%] sm:w-[30%] h-[90%] sm:h-[80%] bg-slate-700">
        <p className="text-orange-300">Det er {reports?.length} rapporter:</p>
        {winReady ? (
          <div className="flex w-[95%] flex-col text-white gap-2">
            {reports?.map((report, index) => (
              
              <ReportCard report={report} key={index}/>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default page;
