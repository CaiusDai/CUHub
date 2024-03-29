import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Box, Stack } from '@mui/material'
import adminavatar from '../../../Images/admintou.png'
import cuhublogo from '../../../Images/logo.png'

const TOP_NAV_HEIGHT = 64

export const TopNav = () => (
    <Box
        component="header"
        sx={{
            backgroundColor: 'common.white',
            color: 'common.white',
            position: 'fixed',
            width: '100%',
            zIndex: (theme) => theme.zIndex.appBar,
        }}
    >
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                minHeight: TOP_NAV_HEIGHT,
                px: 10,
            }}
        >
            <Stack alignItems="center" direction="row" spacing={3}>
                <Box
                    component={RouterLink}
                    to="/admin"
                    sx={{
                        display: 'inline-flex',
                        height: 24,
                        width: 24,
                    }}
                >
                    <Avatar src={cuhublogo} variant="rounded" size="large" />
                </Box>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar src={adminavatar} variant="rounded" />
            </Stack>
        </Stack>
    </Box>
)
