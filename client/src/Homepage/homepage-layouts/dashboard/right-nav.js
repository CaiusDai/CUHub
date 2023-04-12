import AnnouncementDialog from '../../homepage-components/announcement'
import TrendingTable from '../../homepage-components/trending'
import { Drawer, Box } from '@mui/material'

const SIDE_NAV_WIDTH = 306
const TOP_NAV_HEIGHT = 64

export const RightNav = () => {
    return (
        <Drawer
            open
            anchor="right"
            variant="permanent"
            PaperProps={{
                sx: {
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: `calc(100% - ${TOP_NAV_HEIGHT}px)`,
                    p: 1,
                    top: TOP_NAV_HEIGHT,
                    width: SIDE_NAV_WIDTH,
                    zIndex: (theme) => theme.zIndex.appBar - 100,
                },
            }}
        >
            <Box sx={{ height: 16 }} />
            <TrendingTable />
            <Box sx={{ height: 16 }} />
            <AnnouncementDialog />
        </Drawer>
    )
}
export default RightNav
