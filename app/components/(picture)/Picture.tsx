import Image from "next/image";
import React from "react";

const Picture = () => {
  return (
    <div className="w-screen sm:w-[80%] flex gap-4 items-center justify-center p-4">
      <Image
        src="/lostrobot.jpg"
        alt="robot"
        width="200"
        height="200"
        className="hidden sm:block"
      />
      <Image
        src="/venner.jpg"
        alt="venner"
        width="200"
        height="200"
        className="hidden sm:block"
      />
      <Image
        src="/leke.jpg"
        alt="leke"
        width="200"
        height="200"
        className="hidden sm:block"
      />
      <Image
        src="/katter.jpg"
        alt="katter"
        width="200"
        height="200"
        className="hidden sm:block"
      />
      <Image
        src="/katter.jpg"
        alt="katter"
        width="400"
        height="400"
        className=" sm:hidden"
      />

      <Image
        src="/intelligentcube.jpg"
        alt="kube"
        width="200"
        height="200"
        className="hidden sm:block"
      />
    </div>
  );
};

export default Picture;
