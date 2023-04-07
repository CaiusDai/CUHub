import React from 'react'
import { AppRouter } from './Route'
import { useRoutes } from 'react-router-dom'
const App = () => {
    const element = useRoutes(AppRouter)

    return <div>{element}</div>
}

export default App
