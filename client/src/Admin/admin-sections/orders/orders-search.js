import PropTypes from 'prop-types'
import { Stack, toggleButtonClasses, ToggleButtonGroup } from '@mui/material'
import { QueryField } from 'src/Admin/admin-components/query-field'

export const OrdersSearch = (props) => {
    const { mode = 'table', onModeChange, onQueryChange, query } = props

    return (
        <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={3}
            sx={{ p: 3 }}
        >
            <QueryField
                placeholder="Search..."
                onChange={onQueryChange}
                sx={{
                    flexGrow: 1,
                    order: {
                        xs: 1,
                        sm: 2,
                    },
                }}
                value={query}
            />
            <ToggleButtonGroup
                exclusive
                onChange={(event, value) => {
                    if (value) {
                        onModeChange?.(value)
                    }
                }}
                size="small"
                sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    p: 0.5,
                    order: 2,
                    [`& .${toggleButtonClasses.root}`]: {
                        border: 0,
                        '&:not(:first-of-type)': {
                            borderRadius: 1,
                        },
                        '&:first-of-type': {
                            borderRadius: 1,
                            mr: 0.5,
                        },
                    },
                }}
                value={mode}
            ></ToggleButtonGroup>
        </Stack>
    )
}

OrdersSearch.propTypes = {
    mode: PropTypes.oneOf(['table', 'dnd']),
    onModeChange: PropTypes.func,
    onQueryChange: PropTypes.func,
    query: PropTypes.string,
}
