import React from 'react'
import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useParams } from 'react-router-dom'
import searchResultTable from '../homepage-sections/search-result-table'

const columns = [
    {
        title: 'USERNAME',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'USER ID',
        dataIndex: 'user_id',
        key: 'user_id',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
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
    // This part carry out the Search component for CUHub
    // The Input for the backend is stored in searchContent, which is the search input from the suer
    // return all users corresponding to this searchContent and I will render it here.
    const [isLoading, setIsLoading] = useState(true)
    const [searchResultToDisplay, setSearchResultToDisplay] = useState([])

    useEffect(() => {
        fetch(
            `http://localhost:5000/api/search/?searchContent=${searchContent}`,
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
                    const user_list = data.data.user_list
                    console.log('The following is search result')
                    console.log(user_list)
                    setSearchResultToDisplay(user_list)
                    setIsLoading(false)
                    //user_list is the array of users
                    //Retrieve the elements in user_list in the format: userlist[0].username, userlist[0].user_id, userlist[0].email, only these three elements in an object of the array
                } else if (data.status === 'none') {
                    //No user found
                    setSearchResultToDisplay([])
                } //Some error in query
                else {
                    console.log(data.message)
                }
            })
    }, [searchContent])

    if (isLoading) {
        // Render a loading message while the posts are being retrieved
        return <div>Loading posts...</div>
    }
    console.log('check whether following thing is right')
    console.log(searchResultToDisplay)
    return <Table columns={columns} dataSource={searchResultToDisplay} />
}

export default SearchPage
