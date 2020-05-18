import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import { Login } from './Login/Login'
import { Home } from './Home/Home'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { User } from './User/User'

import { fetchData } from './Components/fetch/fetch'
import { removeUserToken } from './state/user'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  async function validateToken() {
    if (user.token && user.rememberMe !== undefined) {
      const url = 'https://private-leagues-api.herokuapp.com/api/check-token'
      const method = 'post'
      const headers = {
        'Content-Type': 'application/json',
      }
      const body = {
        token: user.token,
      }
      try {
        const res = await fetchData(url, method, headers, body)
        if (res.status !== 204) {
          dispatch(removeUserToken())
        }
      } catch (err) {
        console.log(err)
        dispatch(removeUserToken())
      }
    } else {
      dispatch(removeUserToken())
    }
  }

  useEffect(() => {
    validateToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className="App">
      <main className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/user">
              <User />
            </ProtectedRoute>
            <Route path="*">
              <h1>404 - page not found</h1>
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
