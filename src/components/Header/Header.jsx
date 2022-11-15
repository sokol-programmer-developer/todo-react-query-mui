import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import DataContext from '../../utils/context'
import SettingsIcon from '@mui/icons-material/Settings'

const Header = () => {
    const { toggleModal } = useContext(DataContext)

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '13px 39px 0 36px',
            width: '100%',
            height: '70px'
        }}>
            <Typography sx={{ fontSize: '36px', color: '#F4F4F4' }}>To Do</Typography>
            <SettingsIcon sx={{ color: '#F4F4F4', fontSize: '40px', cursor: 'pointer' }} onClick={toggleModal} />
        </Box>
    )
}

export default Header
