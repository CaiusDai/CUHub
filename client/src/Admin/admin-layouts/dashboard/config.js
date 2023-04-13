import { BiHomeCircle } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'
import { IoMdListBox } from 'react-icons/io'
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon'
import { SvgIcon } from '@mui/material'
import ArrowLeftOnRectangleIcon from '@heroicons/react/24/solid/ArrowLeftOnRectangleIcon'

export const items = [
    {
        href: '/admin',
        icon: (
            <SvgIcon>
                <BiHomeCircle />
            </SvgIcon>
        ),
        label: 'Home',
    },
    {
        href: '/admin/blocking_list',
        icon: (
            <SvgIcon>
                <IoMdListBox />
            </SvgIcon>
        ),
        label: 'Blocking List',
    },
    {
        href: '/admin/all_accounts_list',
        icon: (
            <SvgIcon>
                <IoPersonOutline />
            </SvgIcon>
        ),
        label: 'All Accounts List',
    },
    {
        href: '/admin/logout',
        icon: (
            <SvgIcon>
                <ArrowLeftOnRectangleIcon />
            </SvgIcon>
        ),
        label: 'Log out',
    },
]
