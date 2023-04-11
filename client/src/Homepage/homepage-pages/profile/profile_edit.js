import { Helmet } from 'react-helmet-async'
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
import old from 'src/Images/useravatar.png'

const Page = () => {
    // Here the backend I store the update profile information.
    const onFinish = (values) => {
        console.log('Form submitted!')
        const { username, major, college, birthday, interest, gender } = values
        console.log('the following is username')
        console.log(username)
        console.log('the following is major')
        console.log(major)
        console.log('the following is college')
        console.log(college)
        console.log('the following is birthday')
        console.log(birthday)
        console.log('the following is interest')
        console.log(interest)
        console.log('the following is gender')
        console.log(gender)
        fetch(
            `http://localhost:5000/api/profile/`,
            {
                method: 'PUT',
                body: { username: username, major: major, college: college, birthday: birthday, interests: interest, gender: gender },
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                //updating failed
                if (data.status === 'fail') { }
                else if (data.status === 'success') { }
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
                                                src={old}
                                                sx={{
                                                    height: 64,
                                                    width: 64,
                                                }}
                                            />
                                            <div>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    type="button"
                                                    variant="outlined"
                                                >
                                                    Change
                                                </Button>
                                                <div>
                                                    <Typography
                                                        color="text.secondary"
                                                        variant="caption"
                                                    >
                                                        Recommended dimensions:
                                                        200x200, maximum file
                                                        size: 5MB
                                                        <Form></Form>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Stack>
                                        <Form
                                            name="profile_edit"
                                            initialValues={{
                                                username: 'oldone',
                                                major: 'oldone',
                                                college: 'oldone',
                                                birthday: 'oldone',
                                                interest: 'oldone',
                                                gender: 'oldone',
                                            }}
                                            onFinish={onFinish}
                                            style={{ minWidth: '300px' }}
                                        >
                                            <Box sx={{ maxWidth: 420 }}>
                                                <Stack spacing={3}>
                                                    <div className="input-container">
                                                        <label htmlFor="username">
                                                            Username:
                                                        </label>
                                                        <Form.Item name="username">
                                                            <Input
                                                                type="text"
                                                                id="username"
                                                                placeholder="oldusername"
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
                                                            Birthday (Should be: YYYY-MM-DD) :
                                                        </label>
                                                        <Form.Item name="birthday">
                                                            <Input
                                                                type="birthday"
                                                                id="birthday"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="interest">
                                                            Interest:
                                                        </label>
                                                        <Form.Item name="interest">
                                                            <Input
                                                                type="interest"
                                                                id="interest"
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="input-container">
                                                        <label htmlFor="gender">
                                                            Gender (Should be: Male/Female/Unknown) :
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
