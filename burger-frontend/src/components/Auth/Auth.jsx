import React, { useState } from 'react'
import { Formik } from 'formik'
import { auth, selectToken, selectAuthFailedMsg, selectAuthLoading } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../spinner/Spinner'
import { Alert } from 'reactstrap'

const Auth = () => {
      const dispatch = useDispatch();
      const token = useSelector(selectToken);
      const isAuthLoading = useSelector(selectAuthLoading);
      const authFailedMsg = useSelector(selectAuthFailedMsg);
      const [isLogin, setIsLogin] = useState(true)

      let err = null;
      if (authFailedMsg !== null) {
            err = <Alert color='danger'>{authFailedMsg}</Alert>
      }

      let form = null;

      if (isAuthLoading) {
            form = <Spinner />
      } else {
            form = <Formik
                  initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                  }
                  }
                  onSubmit={
                        (values) => {
                              dispatch(auth(values.name, values.email, values.password, isLogin));
                              console.log("token: ", token)
                        }
                  }
                  validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                              errors.email = 'Required'
                        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)) {
                              errors.email = "Invalid Email Address"
                        }

                        if (!values.password) {
                              errors.password = 'Required'
                        } else if (values.password.length < 4) {
                              errors.password = "Password must be at least 4 charecters"
                        }
                        if (!isLogin) {
                              if (!values.passwordConfirm) {
                                    errors.passwordConfirm = 'Required'
                              } else if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = "Password field doesn't match"
                              }
                        }
                        return errors;
                  }}
            >
                  {
                        ({ values, handleChange, handleSubmit, errors }) => (
                              <div className='p-2 border-2 rounded-lg'>
                                    <button className='p-2 w-full text-white bg-rose-600' onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? "Sign Up" : "Sign In"}</button>
                                    <form onSubmit={handleSubmit}>
                                          {!isLogin && <><input name="name"
                                                value={values.name}
                                                onChange={handleChange} placeholder='Enter Your Name' className='form-control' />
                                                <span className='p-2 text-red-700'>{errors.passwordConfirm}</span>
                                                <br /></>}
                                          <input name="email" placeholder='Enter Your Email.'
                                                value={values.email}
                                                onChange={handleChange} className='form-control' />
                                          <span className='p-2 text-red-700'>{errors.email}</span>
                                          <br />
                                          <input name="password" value={values.password}
                                                onChange={handleChange} placeholder='Enter Your Password.' className='form-control' />
                                          <span className='p-2 text-red-700'>{errors.password}</span>
                                          <br />
                                          {!isLogin && <><input name="passwordConfirm"
                                                value={values.passwordConfirm}
                                                onChange={handleChange} placeholder='Enter Your Password Again.' className='form-control' />
                                                <span className='p-2 text-red-700'>{errors.passwordConfirm}</span>
                                                <br /></>}
                                          <button type="submit" className='btn btn-success'>{!isLogin ? "Sign Up" : "Sign In"}</button>
                                    </form>
                              </div>
                        )
                  }
            </Formik>
      }
      return (
            <div>
                  {err}
                  {form}
            </div>
      )
}

export default Auth