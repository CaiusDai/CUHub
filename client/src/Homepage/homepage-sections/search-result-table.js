import React from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'User ID',
        dataIndex: 'user_id',
        key: 'user_id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
]

const SearchResultsTable = ({ searchResults }) => {
    return (
        <Table
            columns={columns}
            dataSource={searchResults}
            rowKey={(record) => record.user_id}
        />
    )
}

export default SearchResultsTable
