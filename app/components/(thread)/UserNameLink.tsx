import Link from "next/link";
import React from "react";

type Props = {
  userName?: String;
};

const UserNameLink = ({ userName }: Props) => {
  return (
    <Link
      href={`../../User/${userName}`}
      className="flex flex-col text-orange-300 hover:text-orange-400"
    >
      <h3 className="font-bold ">{userName}</h3>
    </Link>
  );
};

export default UserNameLink;
