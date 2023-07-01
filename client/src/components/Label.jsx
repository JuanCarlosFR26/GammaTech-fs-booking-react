import React from 'react'

const Label = ({ htmlFor, label, className }) => {
  return (
    <label className={className} htmlFor={htmlFor}>{label}</label>
  )
}

export default Label