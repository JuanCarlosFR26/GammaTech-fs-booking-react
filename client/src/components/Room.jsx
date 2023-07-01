import React from 'react'

const Room = ({ className, id, name, tv, air }) => {
  return (
    <div className={className}>
        <h2>{id}</h2>
        <p>{name}</p>
        <p>{tv}</p>
        <p>{air}</p>
    </div>
  )
}

export default Room