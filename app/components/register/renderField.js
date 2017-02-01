import React from 'react'

const renderField = ({ label, input, type, customClass, meta:{ touched, error, warning, asyncValidate } } = this.props)=>{
  return(
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} className={customClass} placeholder={label} />
        {touched && ((error && <span className='infoDanger'>{error}</span>) || (warning && <span className='infoWarning'>{warning}</span>))}
      </div>
    </div>
  )
}

export default renderField
