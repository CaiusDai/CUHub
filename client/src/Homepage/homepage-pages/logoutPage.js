import React from 'react'
import { Button } from 'antd'

const LogoutPage = () => {
    // const history = useHistory();

    const handleLogout = () => {
        console.log('the following command will be carried out')
        // your logout logic here
        // e.g. clear local storage, remove session cookie, etc.

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

export default LogoutPage
