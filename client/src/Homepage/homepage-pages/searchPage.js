import React from 'react'
import { Table } from 'antd'
import { useParams } from 'react-router-dom'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
]

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
]

const SearchPage = () => {
    const { searchContent } = useParams()
    console.log('the following is search content for the page')
    console.log(searchContent)
    return <Table columns={columns} dataSource={data} />
}

export default SearchPage
