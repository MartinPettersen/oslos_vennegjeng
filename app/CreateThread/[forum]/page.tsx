import React from "react";
import CreateThreadForm from "../../components/(createThread)/CreateThreadForm";

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;
  return (
    <div className="w-full height-full p-4">
      <CreateThreadForm forumLabel={forumLabel} />
    </div>
  );
};

export default page;
