import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { ThemeProvider, BaseStyles } from '@primer/react'
import { Layout } from './components/Layout'
import './main.css'
import Home from './pages/Home'
import Events from './pages/Events'
import About from './pages/About'
import Extension from './pages/Extension'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route path=":owner/:repo" element={<Events />} />
            <Route path="about" element={<About />} />
            <Route path="extension" element={<Extension />} />
            <Route path="/*" element={<Home />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider colorMode="dark">
            <BaseStyles>
                <RouterProvider router={router} />
            </BaseStyles>
        </ThemeProvider>
    </React.StrictMode>
)
