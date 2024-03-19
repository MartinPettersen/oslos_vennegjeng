import React from 'react'

type Props = {
    time: String
}

const TimeStamp = ({time}: Props) => {

    const timeFormatted = `${time.slice(11,16)} ${time.slice(8,10)}/${time.slice(5,7)}/${time.slice(0,4)}`

  return (
    <div className="text-slate-400 flex justify-end items-end">{timeFormatted}</div>
  )
}

export default TimeStamp