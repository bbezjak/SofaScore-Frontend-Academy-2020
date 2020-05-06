import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from './Input/Input'
import { fetchData } from '../Components/fetch/fetch'
import { setUserToken, rememberUser } from '../state/user'

import './Login.css'

export function Login() {
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  function isFormValid() {
    setUsernameError(false)
    setPasswordError(false)
    setFetchError(false)

    let isFormValid = true

    if (username === '') {
      setUsernameError(true)
      isFormValid = false
    }

    if (password === '') {
      setPasswordError(true)
      isFormValid = false
    }

    return isFormValid
  }

  const fetchUser = e => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    const url = 'https://private-leagues-api.herokuapp.com/api/login'
    const method = 'post'
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = {
      username: username,
      password: password,
    }

    fetchData(url, method, headers, body)
      .then(res => {
        if (res.status === 200) {
          res.json().then(json => {
        
            console.log('fetch successful')
        
            dispatch(setUserToken(json.token))
        
            if (rememberMe) {
              dispatch(rememberUser())
            }
          })
        } else if (res.status === 422) {
          setFetchError('Username or password is invalid, login unsuccessful')
        } else {
          setFetchError('Status ' + res.status)
        }
      })
      .catch(err => {
        setFetchError('Error during data exchange with server ' + err)
      })
  }

  function handleChecked() {
    setRememberMe(!rememberMe)
  }

  console.log({user});
  

  return (
    <>
      {user.token && <Redirect to="/magic" />}
      <div className="flex-container">
        <div id="login-modal" className="flex-container blue-item">
          <h1>Log in</h1>
          <form onSubmit={fetchUser}>
            <Input
              label="Username"
              type="text"
              onChange={e => setUsername(e.target.value)}
              placeholder="Your Username"
              displayError={usernameError}
              errorMessage="Please provide username"
            />
            <Input
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Your Password"
              displayError={passwordError}
              errorMessage="Please provide password"
            />
            <div className="flex-container">
              <button type="submit">Login</button>
              <div>
                <input type="checkbox" checked={rememberMe} onChange={handleChecked} />
                <label>Remember me</label>
              </div>
            </div>
          </form>
        </div>
        <div id="error-div" className={!fetchError ? 'no-display' : ''}>
          <p>{fetchError}</p>
        </div>
      </div>
    </>
  )
}
