import React from 'react';
import { Table, Button } from 'antd';

const FollowerListPage = () => {

  // front end need the following information: The users who already followed the user and the users
  // separate them into two groups and frontend will render them in the correct format

  const followedUsers = [
    { name: 'John Smith', username: 'john_smith', email: 'sample' },
    { name: 'Jane Doe', username: 'jane_doe',  email: 'sample'},
    { name: 'Bob Johnson', username: 'bob_johnson', email: 'sample' }
  ];

  const followRequests = [
    { name: 'Sam Jones', username: 'sam_jones', email: 'sample' },
    { name: 'Mary Wilson', username: 'mary_wilson', email: 'sample' },
    { name: 'Chris Lee', username: 'chris_lee', email: 'sample' }
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
      title: 'Remove',
      key: 'action',
      render: (text, record) => (
        <Button
          type="link"
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => handleRemoveFollower(record)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const followRequestColumns = [
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
      title: 'Approve',
      key: 'action',
      render: (text, record) => (
        <Button
          type="link"
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => handleRequestApprove(record)}
        >
          Approve
        </Button>
      ),
    },
    {
      title: 'Deny',
      key: 'action',
      render: (text, record) => (
        <Button
          type="link"
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => handleRequestDeny(record)}
        >
          Deny
        </Button>
      ),
    },
  ];

  const handleRemoveFollower = (record) => {
    // Implement your logic to remove the user from the followedUsers array
    console.log(`Removing user ${record.id} from followed users`);
    // send follower remove info to backend and update server corresponding
  }

  const handleRequestApprove = (record) => {
    // Implement your logic to remove the user from the followedUsers array
    console.log(`Approve user ${record.id} follow request`);

    // send request approve to backend and update server corresponding
  }

  const handleRequestDeny = (record) => {
    // Implement your logic to remove the user from the followedUsers array
    console.log(`Deny user ${record.id} follow request`);
    // send request deny to backend and update server corresponding
  }

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>Followers</h2>
      <Table dataSource={followedUsers} columns={followedColumns} />

      <h2>Follow Requests To You</h2>
      <Table dataSource={followRequests} columns={followRequestColumns} />
    </div>
  );
};

export default FollowerListPage;
