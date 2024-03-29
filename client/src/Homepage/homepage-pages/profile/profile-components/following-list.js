import React from 'react'
import { Table, Button } from 'antd'
import { useState, useEffect } from 'react'

const FollowingListPage = () => {
    // front end need the following information: The users who have been followed by this user
    const [isLoading, setIsLoading] = useState(true) // Add loading state

    const [followingListToDisplay, setFollowingListToDisplay] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/follows/followinglist/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    //Successfully get following list
                    console.log(data.message)

                    const following_list = data.data.user_list
                    console.log(following_list)
                    setFollowingListToDisplay(following_list)
                    setIsLoading(false)
                    //following_list is the list of following users, array, get elements by following_list[0].(user_id,username,email,status)
                } else {
                    //error or unauthorized
                    console.log(data.message)
                } //Some error in query
            })
    }, [])

    const followedUsers = [
        { name: 'John Smith', username: 'john_smith', email: 'sample' },
        { name: 'Jane Doe', username: 'jane_doe', email: 'sample' },
        { name: 'Bob Johnson', username: 'bob_johnson', email: 'sample' },
    ]

    const followedColumns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Unfollow',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="link"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleUnfollow(record)}
                >
                    Unfollow
                </Button>
            ),
        },
    ]

    const handleUnfollow = (record) => {
        // Implement your logic to unfollow a user
        console.log(`Removing user ${record.user_id} from followed users`)

        fetch(
            `http://localhost:5000/api/follows/followinglist/${record.user_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    //Successfully remove user from following list
                    console.log(data.message)
                } else {
                    //error or unauthorized
                    console.log(data.message)
                }
            })

        // send unfollow request to backend for record.id and update server corresponding
    }

    return (
        <div style={{ paddingTop: '50px' }}>
            <h2>Following Users</h2>
            <Table
                dataSource={followingListToDisplay}
                columns={followedColumns}
            />
        </div>
    )
}

export default FollowingListPage
