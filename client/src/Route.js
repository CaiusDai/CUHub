import Main from './Homepage/homepage-pages/homePage'
import FriendsPost from './Homepage/homepage-pages/frend_post_page'
import React from 'react'
import LoginForm from './Authorization/Sign in/loginForm'
import SignUp from './Authorization/Sign up/SignUp'
import { Outlet } from 'react-router-dom'
import { Layout as AdminDashboardLayout } from './Admin/admin-layouts/dashboard/layout'
import { Layout as HomepageDashboardLayout } from './Homepage/homepage-layouts/dashboard/layout'
import NotFoundPage from './Admin/admin-pages/404'
import BlockinglistPage from './Admin/admin-pages/blocking_list'
import ReportsPage from './Admin/admin-pages'
import AllaccountslistPage from './Admin/admin-pages/all_accounts_list'
import Logout from './Homepage/homepage-pages/logout'

export const AppRouter = [
    {
        element: (
            <HomepageDashboardLayout>
                <Outlet />
            </HomepageDashboardLayout>
        ),
        children: [
            {
                path: 'homepage',
                element: <Main />,
            },
            {
                path: 'homepage/friend_post',
                element: <FriendsPost />,
            },
            {
                path: 'homepage/all_accounts_list',
                element: <AllaccountslistPage />,
            },
            {
                path: 'homepage/logout',
                element: <Logout />,
            },
        ],
    },
    {
        path: '/',
        element: <LoginForm />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        element: (
            <AdminDashboardLayout>
                <Outlet />
            </AdminDashboardLayout>
        ),
        children: [
            {
                path: 'admin',
                element: <ReportsPage />,
            },
            {
                path: 'admin/blocking_list',
                element: <BlockinglistPage />,
            },
            {
                path: 'admin/all_accounts_list',
                element: <AllaccountslistPage />,
            },
        ],
    },
    {
        path: '404',
        element: <NotFoundPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]
