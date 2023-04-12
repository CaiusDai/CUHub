import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    // const history = useHistory();
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log('the following command will be carried out')
        // your logout logic here
        // e.g. clear local storage, remove session cookie, etc.
        fetch(`http://localhost:5000/api/logout/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((res) => {
                const status = res.status
                if (status === 'fail') {
                    console.log('not authenticated')
                    // Not authenticated
                } else if (status === 'error') {
                    // Invalid fetch format
                    console.log('invalid fetch format')
                } else {
                    //Success
                    navigate(`/`)
                    console.log('invalid fetch format')
                }
            })
        // redirect to login page
        // history.push('/login');
    }

    return (
        <div className="logout-container">
            <h1>Logout</h1>
            <p>Are you sure you want to log out?</p>
            <Button type="primary" danger onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Logout
