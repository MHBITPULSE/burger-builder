import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const authSlice = createSlice({
      name: "auth",
      initialState: {
            token: null,
            userId: null,
            authLoading: false,
            authFailedMsg: null
      },
      reducers: {
            authSuccess: (state, action) => {
                  //console.log(action.payload)
                  state.token = action.payload.token;
                  state.userId = action.payload.userId
            },
            signIn: (state, action) => {
                  console.log("Sign In")
            },
            signOut: (state, action) => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('userId')
                  localStorage.removeItem('expirationTime')
                  state.token = null;
                  state.userId = null;
                  state.authFailedMsg = null;
            },
            signUp: (state, action) => {
                  console.log("Sign Up")
            },
            authLoading: (state, action) => {
                  state.authLoading = action.payload
            },
            authFailed: (state, action) => {
                  state.authFailedMsg = action.payload
            }
      }
})


export const { authSuccess, authLoading, authFailed, signIn, signOut, signUp } = authSlice.actions;

export const selectToken = (state) => state.auth.token
export const selectUserId = (state) => state.auth.userId
export const selectAuthLoading = (state) => state.auth.authLoading

export const selectAuthFailedMsg = (state) => state.auth.authFailedMsg

export const auth = (email, password, isLogin) => async (dispatch) => {
      dispatch(authLoading(true))
      const authData = {
            email: email,
            password: password,
            returnSecureToken: true
      }
      const API_KEY = "AIzaSyD9AQ_LD5NFhQuV5b8Q7v6rwmXipTbCAAQ"
      let authUrl = isLogin ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
            :
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
      await axios.post(authUrl, authData)
            .then(response => {
                  dispatch(authLoading(false))
                  localStorage.setItem('token', response.data.idToken)
                  localStorage.setItem('userId', response.data.localId)
                  let expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                  localStorage.setItem('expirationTime', expirationTime)

                  dispatch(authSuccess({ token: response.data.idToken, userId: response.data.localId }))
            }
            )
            .catch(err => {
                  dispatch(authLoading(false))
                  dispatch(authFailed(err.response.data.error.message))
            }
            )
}

export const authCheck = () => (dispatch) => {
      const token = localStorage.getItem('token');
      if (!token) {
            //logout
            dispatch(signOut())
      } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'))
            if (expirationTime <= new Date()) {
                  //logout
                  dispatch(signOut())
            } else {
                  const userId = localStorage.getItem('userId');
                  dispatch(authSuccess({ token: token, userId: userId }))
            }
      }
}

export default authSlice.reducer