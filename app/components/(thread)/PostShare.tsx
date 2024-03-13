import Link from 'next/link'
import React from 'react'

type Props = {
    postId: String,
}

const PostShare = ({postId}: Props) => {
  return (
     <Link
        href={`../Post/${postId}`} target="_blank" rel="noopener noreferrer"
        className=" bg-slate-600 hover:bg-slate-700 bg-opacity-50 p-2 hover:text-orange-400 backdrop-blur-md w-[100%]"
      >
        Del
      </Link>
  )
}

export default PostShare