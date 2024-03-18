"use client";

import { Post } from "@/types/Post";
import { Report } from "@/types/Report";

import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const page = () => {
  const [reports, setReports] = useState<Report[]>();

  const [winReady, setwinReady] = useState(false);

  const status = "clear";

  const [post, setPost] = useState<Post>();
  const [thread, setThread] = useState<Post>();

  const getPost = async (postId: String) => {
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
      deletePost(temp.data);

    }
  };

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
  }, []);

  const getThread = async (report: Report) => {
    const threadId = report.subjectId;
    const res = await fetch("/api/GetThread", {
      method: "POST",
      body: JSON.stringify({ threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setThread(temp.data);
      setwinReady(true);
    }
  };

  const deleteThread = async () => {
    const res = await fetch("/api/DeleteThread", {
      method: "POST",
      body: JSON.stringify({ thread }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
    }
  };

  const deletePost = async (post: Post) => {
    const threadId = post!.threadId;
    const postId = post!.postId
    const res = await fetch("/api/DeletePost", {
      method: "POST",
      body: JSON.stringify({ postId, threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response)
    } else {
    }
  };

  const deleteReport = async (report: Report) => {
    console.log(report)
    const reportId = report!.reportId;
    const res = await fetch("/api/DeleteReport", {
      method: "POST",
      body: JSON.stringify({ reportId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response)
    } else {
    }
  };

  const handleDelete = async (report: Report) => {
    if (report.subjectType === "post") {
      getPost(report.subjectId);
      deleteReport(report)
    } else {
      console.log("its a thread")

      getThread(report);
      // deleteThread();
    }
  };

  return (
    <div className="w-full h-full  flex flex-col items-center gap-4 justify-start pt-4 sm:pt8">
      <div className="text-orange-300 font-bold text-3xl">Raporter</div>
      <div className="w-[90%] sm:w-[30%] h-[90%] sm:h-[80%] bg-slate-700">
        <p className="text-orange-300">Det er {reports?.length} rapporter:</p>
        {winReady ? (
          <div className="flex w-[95%] flex-col text-white gap-2">
            {reports?.map((report) => (
              <div className="bg-slate-500 flex justify-between p-1 border-2 border-orange-300">
                <div>
                  <div className="flex gap-1">
                    <p>Rapportert av:</p>
                    <div className="text-orange-300">{report.userName}</div>
                  </div>
                  <div className="flex gap-1">
                    <p>Grunn oppgitt:</p>
                    <div className="text-orange-300">{report.reason}</div>
                  </div>
                  <div className="flex gap-1">
                    <p>type:</p>
                    <div className="text-orange-300">{report.subjectType}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {report.subjectType === "post" ? (
                    <Link
                      href={`../Post/${report.subjectId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" "
                    >
                      <EyeIcon className="h-4 w-4 text-sky-500 hover:cursor-pointer" />
                    </Link>
                  ) : (
                    <Link
                      href={`../Thread/${report.subjectId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" "
                    >
                      <EyeIcon className="h-4 w-4 text-sky-500 hover:cursor-pointer" />
                    </Link>
                  )}
                  <TrashIcon
                    onClick={() => handleDelete(report)}
                    className="h-4 w-4 text-red-500 hover:cursor-pointer"
                  />
                </div>
              </div>
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
