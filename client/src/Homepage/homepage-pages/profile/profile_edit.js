import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material'
import { Form, Input } from 'antd'
import { VscBlank } from 'react-icons/vsc'
import { SvgIcon } from '@mui/material'

var avatar_changed = false
let userData

const Page = () => {
    let [avatarUrl, setAvatarUrl] = React.useState('')
    // Load the avatar
    const location = useLocation()
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const userDataString = urlParams.get('userdata')
    userData = JSON.parse(decodeURIComponent(userDataString))
    console.log(userData, avatarUrl)
    // const encodedUserDataString = encodeURIComponent(userDataString)
    // const encodedavatarUrl = encodeURIComponent(avatarUrl)
    React.useEffect(() => {
        setAvatarUrl(new URLSearchParams(location.search).get('avatar'))
    }, [location.search])

    // Hide the input form
    const hiddenFileInput = React.useRef(null)

    const handleUpload = (event) => {
        hiddenFileInput.current.click()
    }

    const handleChange = (event) => {
        console.log('1111')
        const fileUploaded = event.target.files[0]
        avatar_changed = true
        const objectURL = URL.createObjectURL(fileUploaded)
        if (avatarUrl) {
            URL.revokeObjectURL(avatarUrl)
        }
        setAvatarUrl(objectURL)

        console.log('sss',{avatar_changed})
    }

    const handleExit = (event) => {
        if (avatar_changed) URL.revokeObjectURL(avatarUrl)
    }

    const avatarSubmit = (values) => {
        const form_data = new FormData(values)
        fetch('http://localhost:5000/api/images/avatars/me', {
            method: 'PUT',
            body: form_data,
        })
            .then((response) => {
                console.log('Files uploaded successfully.')
            })
            .catch((error) => {
                console.error('Error uploading files:', error)
            })
            .finally(() => {
                // Clear the file input field after submitting
                document.getElementById('images').value = ''
            })
    }

    // Here the backend I store the update profile information.
    const onFinish = (values) => {
        console.log('Form submitted!')
        if (avatar_changed) {
            document.getElementById('avatar_form').submit()
            console.log('Calling Form')
        } else {
            console.log('Errror')
        }

        let { username, major, college, birthday, gender,interests } = values
        var partsArray = interests.split(',');
        console.log(interests)
        console.log(partsArray)
        fetch(`http://localhost:5000/api/profiles/`, {
            method: 'PUT',
            body: JSON.stringify({
                username: username,
                major: major,
                college: college,
                birthday: birthday,
                interests: partsArray,
                gender: gender,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                //updating failed
                if (data.status === 'fail') {
                } else if (data.status === 'success') {
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Profile Edit</title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">Settings</Typography>
                        </div>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={1}>
                                    <Typography variant="h6">
                                        Profile
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={8}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                            sx={{ mb: 3 }}
                                        >
                                            <Avatar
                                                src={avatarUrl}
                                                sx={{
                                                    height: 64,
                                                    width: 64,
                                                }}
                                            />
                                            
                                        </Stack>
                                        <Form
                                            action=""
                                            name="profile_edit"
                                            initialValues={{
                                                username: userData.username,
                                                major: userData.major,
                                                college: userData.college,
                                                birthday: userData.birthday,
                                                interests: userData.interests,
                                                gender: userData.gender,
                                            }}
                                            onFinish={onFinish}
                                            style={{ minWidth: '300px' }}
                                        >
                                            <Box sx={{ maxWidth: 420 }}>
                                                <Stack spacing={3}>
                                                <div>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={handleUpload}
                                                >
                                                    Change
                                                </Button>
                                                <Form
                                                    id="avatar_form"
                                                    encType="multipart/form-data"
                                                    onSubmit={avatarSubmit}
                                                >
                                                    <input
                                                        type="file"
                                                        id="images"
                                                        ref={hiddenFileInput}
                                                        onChange={handleChange}
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                    />
                                                </Form>
                                                <div>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="caption"
                                                    >
                                                        Recommended dimensions:
                                                        200x200
                                                    </Typography>
                                                </div>
                                            </div>
                                                    <div className="input-container">
                                                        <label htmlFor="username">
                                                            Username:
                                                        </label>
                                                        <Form.Item name="username">
                                                            <Input
                                                                type="username"
                                                                id="username"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="major">
                                                            Major:
                                                        </label>
                                                        <Form.Item name="major">
                                                            <Input
                                                                type="major"
                                                                id="major"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="college">
                                                            College:
                                                        </label>
                                                        <Form.Item name="college">
                                                            <Input
                                                                type="college"
                                                                id="college"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="birthday">
                                                            Birthday (Should be:
                                                            YYYY-MM-DD) :
                                                        </label>
                                                        <Form.Item name="birthday">
                                                            <Input
                                                                type="birthday"
                                                                id="birthday"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="interests">
                                                            Interest (Should be:
                                                            interest1,interest2,interest3):
                                                        </label>
                                                        <Form.Item name="interests">
                                                            <Input
                                                                type="interests"
                                                                id="interests"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="gender">
                                                            Gender (Should be:
                                                            Male/Female/Unknown)
                                                            :
                                                        </label>
                                                        <Form.Item name="gender">
                                                            <Input
                                                                type="gender"
                                                                id="gender"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                </Stack>
                                                <Box sx={{ mt: 3 }}>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Save
                                                    </Button>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={handleExit}
                                                        href="/homepage/profile"
                                                    >
                                                        Exit
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Page