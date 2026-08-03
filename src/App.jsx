/**
 * App Component
 *
 * Root application component that sets up routing, theme management,
 * and lazy-loaded page components with suspense boundaries.
 *
 * Features:
 * - Client-side routing with HashRouter
 * - Theme detection from URL parameters and Redux state
 * - Lazy loading for all routes with loading spinner fallback
 * - Public routes (login, register, error pages)
 * - Protected routes wrapped in DefaultLayout
 *
 * @module App
 */

import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, data, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

// Containers
import DefaultLayout from './layout/DefaultLayout'
import Login from './views/pages/login/Login'
import Register from './views/pages/register/Register'
import Page404 from './views/pages/page404/Page404'
import Page500 from './views/pages/page500/Page500'
import Dashboard from './views/dashboard/Dashboard'
import UploadVideo from './My pages/uploadVideo'
import api from './services/api'
import { toast } from 'react-toastify'


/**
 * Main Application Component
 *
 * Manages application-wide concerns:
 * - Theme initialization and persistence
 * - Client-side routing configuration
 * - Lazy loading with suspense fallbacks
 * - Theme detection from URL query parameters
 *
 * Theme priority:
 * 1. URL parameter (?theme=dark)
 * 2. Redux stored theme
 * 3. Browser/system preference (auto)
 *
 * @component
 * @returns {React.ReactElement} Application root with routing
 *
 * @example
 * // Standard usage in index.js
 * import App from './App'
 * ReactDOM.render(<App />, document.getElementById('root'))
 */
const App = () => {
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  useEffect(() => {
    setColorMode('light')
  }, [])

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" name="Login Page" element={<Login />} />
        <Route path="/register" name="Register Page" element={<Register />} />
        <Route path="/404" name="Page 404" element={<Page404 />} />
        <Route path="/500" name="Page 500" element={<Page500 />} />
        <Route path='/' element={<DefaultLayout />} >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vidUpload" element={<UploadVideo />} />



        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
