import React from "react";

const ThreadShare = () => {
  const handleCopy = async (url: string) => {
    return await navigator.clipboard.writeText(url);
  };

  return (
    <div
      onClick={() => handleCopy(window.location.href)}
      className="p-4 hover:cursor-pointer font-bold text-xl bg-slate-500 text-orange-300 hover:text-orange-400 hover:bg-slate-600 flex items-center justify-center w-[15%]"
    >
      Del
    </div>
  );
};

export default ThreadShare;
