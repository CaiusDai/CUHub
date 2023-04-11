import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Box, Stack, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const TOP_NAV_HEIGHT = 64

export const TopNav = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentInput = e.target.elements.commentInput
        console.log(`Submitted comment ${commentInput.value} for post`)
        navigate(`/search/${commentInput.value}`)
    }

    // const handleSearchInputChange = (event) => {
    //   setSearchQuery(event.target.value);
    // };
    return (
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
                alignItems="center"
                sx={{
                    minHeight: TOP_NAV_HEIGHT,
                    px: 10,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Box
                            component={RouterLink}
                            to="/homepage"
                            sx={{
                                display: 'inline-flex',
                                height: 24,
                                width: 24,
                            }}
                        >
                            <Avatar
                                src="/client/src/Images/icon.png"
                                variant="rounded"
                                size="large"
                            />
                        </Box>
                    </Stack>
                </Box>
                <Stack alignItems="center" direction="row" spacing={0}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                id={`commentInput`}
                                name="commentInput"
                                variant="outlined"
                                placeholder="Search user here"
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </form>
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default TopNav
