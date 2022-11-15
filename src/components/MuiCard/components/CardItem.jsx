import React, { useContext } from 'react'
import { Box, Typography, Divider, Switch } from '@mui/material'
import DataContext from '../../../utils/context'

const color = ['#A9A9A9', '#FF0000', '#366EFF', '#FFEB33', '#10C200', '#412FAF', '#F18826']

const CardItem = ({ colorNumber, title, description, done, id }) => {
    const { toggleTodo } = useContext(DataContext)

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '-4px'
        }} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem sx={{
                        height: '40px',
                        border: `3px solid ${color[colorNumber > 6 ? colorNumber - 6 : colorNumber + 1]}`,
                        borderRadius: '4px'
                    }}
                />
                <Box>
                    <Typography sx={{
                        fontSize: '24px',
                        color: '#F4F4F4',
                        marginLeft: '12px',
                        textDecoration: done ? 'line-through' : 'none',
                        fontFamily: 'Abhaya Libre SemiBold'
                    }}>
                        {title.slice(0, 23)}
                    </Typography>
                    <Typography sx={{
                        fontSize: '14px',
                        color: '#D9D9D9',
                        margin: '-6px 0 0 12px',
                        fontFamily: 'Abhaya Libre SemiBold'
                    }}
                    >
                        {description.slice(0, 38)}
                    </Typography>
                </Box>
            </Box>
            <Switch onChange={() => toggleTodo(id)} checked={done} />
        </Box>
    )
}

export default CardItem
