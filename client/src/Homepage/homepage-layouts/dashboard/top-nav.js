import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Box, Stack } from '@mui/material'
import { QueryField } from '../../homepage-components/query-field'
const TOP_NAV_HEIGHT = 64

export const TopNav = (props) => {
    // const [searchQuery, setSearchQuery] = useState('');
    const { onQueryChange, query } = props

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
                    <QueryField
                        placeholder="Search..."
                        onChange={onQueryChange}
                        sx={{
                            backgroundColor: 'grey.200',
                            width: '100%',
                            borderRadius: 16,
                            flexGrow: 1,
                            order: {
                                xs: 1,
                                sm: 2,
                            },
                        }}
                        value={query}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default TopNav
