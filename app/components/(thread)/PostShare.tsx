import Link from "next/link";
import React from "react";

type Props = {
  postId: String;
};

const PostShare = ({ postId }: Props) => {
  return (
    <Link
      href={`../Post/${postId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:cursor-pointer font-bold text-lg text-orange-300 hover:text-orange-400  flex items-center justify-center w-[15%]"
    >
      Del
    </Link>
  );
};

export default PostShare;
