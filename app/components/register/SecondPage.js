import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

//custom input
import renderField from './renderField'

//validation
import { submit, validate, warn, asyncValidate } from './validation'

const SecondPage = (props)=>{

  //destructure props
  const { handleSubmit, previousPage, pristine, submitting } = props
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='username' type='text' component={renderField} customClass='form-control' label='Username'/>
      </div>
      <div>
        <Field name='password' type='password' component={renderField} customClass='form-control' label='Password'/>
      </div>
      <div>
        <Field name='passwordAgain' type='password' component={renderField} customClass='form-control' label='Confirm Password'/>
      </div>

      <hr />

      <button className='btn btn-default' onClick={previousPage} type='button'>Back</button>
      <button className='btn btn-primary' type='submit' disabled={submitting}>Submit</button>
    </form>
  )
}

SecondPage.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false, //keep data on unmount
  forceUnregisterOnUnmount: true, //unregister from input on unmount
  validate,
  warn,
  asyncValidate,
  asyncBlurFields: ['username']
})(SecondPage)
