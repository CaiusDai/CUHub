import { BiHomeCircle } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'
import { IoMdListBox } from 'react-icons/io'
import ArrowLeftOnRectangleIcon from '@heroicons/react/24/solid/ArrowLeftOnRectangleIcon'
import { SvgIcon } from '@mui/material'

export const items = [
    {
        href: '/homepage',
        icon: (
            <SvgIcon>
                <BiHomeCircle />
            </SvgIcon>
        ),
        label: 'Home',
    },
    {
        href: '/homepage/friend_post',
        icon: (
            <SvgIcon>
                <IoMdListBox />
            </SvgIcon>
        ),
        label: 'Friends post',
    },
    {
        href: '/homepage/all_accounts_list',
        icon: (
            <SvgIcon>
                <IoPersonOutline />
            </SvgIcon>
        ),
        label: 'Chat',
    },
    {
        href: '/homepage/logout',
        icon: (
            <SvgIcon>
                <ArrowLeftOnRectangleIcon />
            </SvgIcon>
        ),
        label: 'Log out',
    },
]
