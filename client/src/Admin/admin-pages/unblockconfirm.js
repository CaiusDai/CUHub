import { Helmet } from 'react-helmet-async'
import {
    Box,
    Button,
    Card,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
} from '@mui/material'
import { Form } from 'antd'
import React, { useState } from 'react'
import { SvgIcon } from '@mui/material'
import { VscBlank } from 'react-icons/vsc'

const Page = () => {
    
    const [message, setMessage] = useState('');
                
    const handleClick = () => {
        setMessage('Confirmation Submitted!');
    };
    const onFinish = (values) => {
        console.log('Confirm to unblock!')
    }
    //below I need the email of the user.
    let email = 'xx@gamil.com'

    return (
        <>
            <Helmet>
                <title>unblock Setting</title>
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
                            <Typography variant="h4">Block Setting</Typography>
                        </div>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={1}></Grid>
                                <Grid xs={12} md={8}>
                                    <Card sx={{ p: 3 }}>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                            sx={{ mb: 3 }}
                                        ></Stack>
                                        <Form
                                            name="unblock_setting"
                                            onFinish={onFinish}
                                            style={{ minWidth: '300px' }}
                                        >
                                            <Box sx={{ maxWidth: 420 }}>
                                            <h2>Do you want to Unblock the account?</h2>
                                                <Stack spacing={3}>
                                                    <Typography variant="h6">
                                                        user's mail address:
                                                        {email}
                                                    </Typography>
                                                </Stack>
                                                <Box sx={{ mt: 3 }}>
                                                    <Button
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        onClick={handleClick}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <SvgIcon><VscBlank /></SvgIcon>
                                                    {message && <span>{message}</span>}
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
