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
import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { SvgIcon } from '@mui/material'
import { VscBlank } from 'react-icons/vsc'
import { useParams } from 'react-router-dom'

const Page = () => {
    const onFinish = (values) => {
        console.log('Form submitted!')
        const { endTime } = values
        console.log('the following is endTime')
        console.log(endTime).catch((error) => console.error(error))
    }
    const [message, setMessage] = useState('')

    const handleClick = () => {
        setMessage('Confirmation Submitted!')
    }
    //below I need the email of the user.
    const { email } = useParams()

    return (
        <>
            <Helmet>
                <title>Block Setting</title>
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
                                            name="block_setting"
                                            onFinish={onFinish}
                                            style={{ minWidth: '300px' }}
                                        >
                                            <Box sx={{ maxWidth: 420 }}>
                                                <Stack spacing={3}>
                                                    <Typography variant="h6">
                                                        user's mail address:
                                                        {email}
                                                        {/*I need the mail of the user*/}
                                                    </Typography>
                                                    <div className="input-container">
                                                        <label htmlFor="endTime">
                                                            Blocking End Time:
                                                        </label>
                                                        <Form.Item name="endTime">
                                                            <Input
                                                                type="endTime"
                                                                id="endTime"
                                                                placeholder="sample:2022-04-08 15:30:00"
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
                                                        onClick={handleClick}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <SvgIcon>
                                                        <VscBlank />
                                                    </SvgIcon>
                                                    {message && (
                                                        <span>{message}</span>
                                                    )}
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
