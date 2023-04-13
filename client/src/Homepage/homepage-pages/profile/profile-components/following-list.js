import React from 'react';
import { Table, Button } from 'antd';

const FollowingListPage = () => {

  // front end need the following information: The users who have been followed by this user

  fetch(
    `http://localhost:5000/api/follows/followinglist/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        //Successfully get following list
        console.log(data.message)
        console.log(following_list)
        const following_list = data.data.user_list
        //following_list is the list of following users, array, get elements by following_list[0].(user_id,username,email,status)
      } else {
        //error or unauthorized
        console.log(data.message)
      } //Some error in query
    })
  const followedUsers = [
    { name: 'John Smith', username: 'john_smith', email: 'sample' },
    { name: 'Jane Doe', username: 'jane_doe', email: 'sample' },
    { name: 'Bob Johnson', username: 'bob_johnson', email: 'sample' }
  ];


  const followedColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
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
  ];

  const handleUnfollow = (record) => {
    // Implement your logic to unfollow a user
    console.log(`Removing user ${record.id} from followed users`);
    // send unfollow request to backend for record.id and update server corresponding
  }

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>Following Users</h2>
      <Table dataSource={followedUsers} columns={followedColumns} />
    </div>
  );
};

export default FollowingListPage;
