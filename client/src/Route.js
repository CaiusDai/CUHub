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
import SpecificPostPage from './Homepage/homepage-pages/specificPostPage'
import SearchPage from './Homepage/homepage-pages/searchPage'
import HomePage from './Homepage/homepage-pages/homePage'
import FriendsPost from './Homepage/homepage-pages/frend_post_page'
import Logout from './Homepage/homepage-pages/logout'
import ProfilePage from './Homepage/homepage-pages/profile/profile'
import ProfileEditPage from './Homepage/homepage-pages/profile/profile_edit'
import ViewInfoPage from './Admin/admin-pages/view_info'
import BlockSettingPage from './Admin/admin-pages/block_setting'
import UnfollowedProfilePage from './Homepage/homepage-pages/profile/unfollowed_profile'
import FollowedProfilePage from './Homepage/homepage-pages/profile/followed_profile'
import UnblockConfirmPage from './Admin/admin-pages/unblockconfirm'
import DeleteConfirmPage from './Admin/admin-pages/deleteconfirm'

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
                element: <HomePage />,
            },
            {
                path: 'homepage/friend_post',
                element: <FriendsPost />,
            },
            {
                path: 'homepage/chat',
                element: <NotFoundPage />,
            },
            {
                path: 'homepage/logout',
                element: <Logout />,
            },
            {
                path: 'homepage/particular_post/:id',
                element: <SpecificPostPage />,
            },
            {
                path: 'search/:searchContent',
                element: <SearchPage />,
            },
            {
                path: 'homepage/profile',
                element: <ProfilePage />,
            },
            {
                path: 'homepage/profile_edit',
                element: <ProfileEditPage />,
            },
            {
                path: 'homepage/logout',
                element: <Logout />,
            },
            {
                path: 'homepage/unfollowed_profile',
                element: <UnfollowedProfilePage />,
            },
            {
                path: 'homepage/followed_profile',
                element: <FollowedProfilePage />,
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
            {
                path: 'admin/view_info/:id',
                element: <ViewInfoPage />,
            },
            {
                path: 'admin/block_setting/:id',
                element: <BlockSettingPage />,
            },
            {
                path: 'admin/unblockconfirm/:id',
                element: <UnblockConfirmPage />,
            },
            {
                path: 'admin/deleteconfirm/:id',
                element: <DeleteConfirmPage />,
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
