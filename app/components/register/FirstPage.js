import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

//custom input
import renderField from './renderField'

//validation
import { asyncValidate } from './validation'

const FirstPage = (props) =>{

  //deconstruct props
  const { handleSubmit, pristine, submitting } = props

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='firstName' type='text' component={renderField} customClass='form-control' label='First Name'/>
      </div>

      <div>
        <Field name='lastName' type='text' component={renderField} customClass='form-control' label='Last Name'/>
      </div>

      <div>
        <Field name='email' type='email' component={renderField} customClass='form-control' label='Email'/>
      </div>

      <hr />

      <button className='btn btn-primary' disabled={submitting} type='submit'>Next</button>
    </form>
  )
}

FirstPage.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false, //keep data on unmount
  forceUnregisterOnUnmount: true, //unregister from input on unmount
  asyncValidate,
  asyncBlurFields: ['email']
})(FirstPage)
