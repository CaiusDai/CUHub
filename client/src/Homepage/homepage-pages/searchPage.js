import React from 'react'
import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const { searchContent } = useParams()
    console.log('the following is search content for the page')
    console.log(searchContent)
    // This part carry out the Search component for CUHub
    // The Input for the backend is stored in searchContent, which is the search input from the suer
    // return all users corresponding to this searchContent and I will render it here.
    const [isLoading, setIsLoading] = useState(true)
    const [searchResultToDisplay, setSearchResultToDisplay] = useState([])

    const handleFollowedChange = (record) => {
        // user.followed is the result got from backend, there are three states
        // true: following, false:unfollowed, none, pending
        const updatedData = searchResultToDisplay.map((user) => {
            if (user.user_id === record.user_id) {
                if (user.status === true || user.status === false) {
                    // for following and pending, cancel the follow request
                    user.status = null
                    
                    fetch(
                        `http://localhost:5000/api/search/followinglist/${record.user_id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 'deleted') {
                                //Successfully change status back to no relationship
                                console.log(data.message)
                                console.log("follow request has been canceled")
                            } else{
                                //error
                                console.log(data.message)
                            } //Some error in query
                        })

                    // backend: do something here to update the state in database
                } else {
                    // for unfollowed, send a followed request, the frontend render the status as
                    // pending
                    fetch(
                        `http://localhost:5000/api/search/followinglist/${record.user_id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data.status)
                            if (data.status === 'inserted') {
                                //Add new record to the table, now is pending
                                console.log("a follow request has been sent")
                                console.log(data.message)
                            } else{
                                //error
                                console.log(data.message)
                            } //Some error in query
                        })


                    user.status = false
                    // backend: do something here to send the request to corresponding user
                }
            }
            return user
        })
        setSearchResultToDisplay(updatedData)
    }

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
        {
            title: 'FOLLOWED',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {

                let buttonText
                switch (status) {
                    case true:
                        buttonText = 'Following'
                        break
                    case false:
                        buttonText = 'Pending'
                        break
                    default:
                        buttonText = 'Unfollowed'
                }
                return (
                    <button onClick={() => handleFollowedChange(record)}>
                        {buttonText}
                    </button>
                )
            },
        },
    ]

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
                    setSearchResultToDisplay(user_list) // Update postToDisplay using the state setter
                    setIsLoading(false)
                    // PLEASE OMIT CODE BELLOW UNTIL NEXT REMINDER
                    // since the current result from back end does not have property call followed
                    // Adding the "followed" property to each user object in the data
                    
                    //user_list[0].user_id, user_list[0].username, user_list[0].email, user_list[0].status

                    if(user_list[0].status === false){

                    }//pending

                    if(user_list[0].status === true){

                    }//following
                    
                    else{

                    }//unfollowed


                    const dataWithFollowed = user_list
    
                    // PLEASE OMIT CODE ABOVE
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
