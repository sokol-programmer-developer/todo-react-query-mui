import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import DataContext from '../../utils/context'
import Checkbox from '@mui/material/Checkbox'

const Title = () => {
    const { todayTasks, setTodayTasks } = useContext(DataContext)

    return (
        <Box sx={{
            display: 'flex',
            padding: '9px 39px 0 26px',
            alignItems: 'center',
        }}>
            <Checkbox
                sx={{
                    color: '#F4F4F4',
                    borderRadius: '6px',
                    fontSize: 35,
                    '&.Mui-checked': {
                        color: '#F4F4F4',
                    },
                }}
                size='100px'
                disableRipple
                checked={todayTasks}
                onChange={() => setTodayTasks(!todayTasks)}
            />
            <Typography sx={{ fontSize: '24px', color: '#F4F4F4', fontFamily: 'Abhaya Libre SemiBold' }}>Today Tasks:</Typography>
        </Box>
    )
}

export default Title
