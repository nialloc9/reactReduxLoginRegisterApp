import { SubmissionError } from 'redux-form'

//simulate server latency
const sleep = millSec => new Promise(resolve =>{ setTimeout(resolve, millSec)})

//submit
const submit = (values)=>{
  if(!values.firstName){
    throw new SubmissionError({firstName: 'Required', _error: 'Please fill in all fields.'})
  }
  else if(!values.lastName){
    throw new SubmissionError({lastName: 'Required', _error: 'Please fill in all fields.'})
  }
  else if(!values.email){
    throw new SubmissionError({email: 'Required', _error: 'Please fill in all fields.'})
  }
  else if(!values.username){
    throw new SubmissionError({username: 'Required', _error: 'Please fill in all fields.'})
  }
  else if(!values.password){
    throw new SubmissionError({password: 'Required', _error: 'Please fill in all fields.'})
  }
  else if(!values.passwordAgain){
    throw new SubmissionError({passwordAgain: 'Required', _error: 'Please fill in all fields.'})
  }else{
    console.log('REGISTER FORM:')
    console.log(values)
  }
}

//error validation
const validate = (values)=>{
  const errors = {}

  if(values.password != values.passwordAgain){
    errors.passwordAgain = 'Passwords do not match'
  }

  return errors
}

//warning validation
const warn = (values)=>{
  const warnings = {}

  if((values.password) && (values.password.length < 5)){
    warnings.password = 'Weak password'
  }

  return warnings
}

//asyncvalidation
const asyncValidate = (values)=>{
  return sleep(1000).then(()=>{
    if(['user', 'user1'].includes(values.username)){
      throw {username: 'Username already in use.'}
    }else
    if(['nialloc91@gmail.com', 'info@ocwebtech.com'].includes(values.email)){
      throw {email: 'Email already in use.'}
    }
  })
}

export { submit, validate, warn, asyncValidate }
