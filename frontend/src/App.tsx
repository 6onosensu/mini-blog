import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { RootState } from './app/store'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './features/auth/authSlice'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        {isAuthenticated ? (
          <>
            <h1 className="text-xl font-bold">Welcome, {user}</h1>
            <button
              className="bg-red-500 px-4 py-2 text-white rounded"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-600 px-4 py-2 text-white rounded"
            onClick={() => dispatch(login('admin'))}
          >
            Login as admin
          </button>
        )}
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
