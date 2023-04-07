import Main from './Homepage/homePage'
import React from 'react'
import LoginForm from './Authorization/Sign in/loginForm'
import SignUp from './Authorization/Sign up/SignUp'

export const AppRouter = [
    {
        path: 'homepage',
        element: <Main />,
    },
    {
        path: '/',
        element: <LoginForm />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
]
