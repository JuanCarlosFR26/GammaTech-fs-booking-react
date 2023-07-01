import React from 'react'

const Input = ({ onChange, type, name, className, value }) => {
  return (
    <input onChange={onChange} className={className} type={type} name={name} value={value} required/>
  )
}

export default Input