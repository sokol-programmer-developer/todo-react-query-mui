import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Card, CardContent, Box, Divider, Typography } from '@mui/material'
import DataContext from '../../utils/context'
import Marquee from 'react-fast-marquee'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'

import CardItem from './components/CardItem'

const MuiCard = ({ card, numberCard, news }) => {
    const { todayTasks, setTodayTasks, offNews } = useContext(DataContext)
    const [isOpen, setIsOpen] = useState(false)

    const memoizedValue = useMemo(() => getRandomNews(0, news), [news])

    function getRandomNews(min, obj) {
        const max = obj ? obj.articles.length - 1 : 2
        return Math.floor(Math.random() * (max - min)) + min
    }

    useEffect(() => {
        if (todayTasks === true) {
            if (numberCard === 0) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        } else if (numberCard === 0) {
            setIsOpen(false)
        }
    }, [todayTasks, setTodayTasks, numberCard])

    const handleClick = () => {
        setIsOpen(!isOpen)
        if (numberCard === 0) {
            setTodayTasks(!todayTasks)
        }
    }

    return (
        <Card sx={{
            width: '350px',
            minHeight: '79px',
            marginBottom: '32px',
            borderRadius: isOpen ? '40px' : '25px',
            boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
            backgroundColor: '#222222',
        }}>
            <CardContent sx={{ ":last-child": { paddingBottom: '12px !important' } }}>
                {!isOpen ?
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: '-4px'
                    }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                    height: '40px',
                                    border: '3px solid #A9A9A9',
                                    borderRadius: '4px'
                                }}
                            />
                            <Typography sx={{
                                fontSize: '24px',
                                color: '#F4F4F4',
                                marginLeft: '12px',
                                fontFamily: 'Abhaya Libre SemiBold'
                            }}
                            >
                                {numberCard === 0 ? 'Today Tasks'
                                    : numberCard === 1 ? 'Tomorrow Taks'
                                        : card.date.slice(0, 2) + '/' + card.date.slice(3, 5) + ' Tasks'
                                }
                            </Typography>
                        </Box>
                        <ArrowDropDownCircleIcon sx={{
                            color: '#F4F4F4',
                            fontSize: '25px',
                            cursor: 'pointer'
                        }} onClick={handleClick} />
                    </Box>
                    :
                    <Box>
                        {card.todos.map((task, i) => (
                            <CardItem
                                key={task.id}
                                title={task.title}
                                description={task.description}
                                done={task.done}
                                colorNumber={i}
                                id={task.id}
                            />
                        ))}
                        {offNews ? (
                            <Box sx={{
                                marginTop: '10px',
                                fontSize: '20px',
                                color: 'yellow'
                            }}
                            >
                                <Marquee gradient={false}>
                                    {news ? news.articles[memoizedValue].title : 'Тут должно быть новость, но произошла ошибка соединения'}
                                </Marquee>
                                {/* если нужно, чтобы только под первым списком показывалась новость, то расскоментить ниже, а выше закоммментить*/}
                                {/* { 
                                    numberCard === 0 ?
                                        <Marquee gradient={false}>
                                            {news ? news.articles[memoizedValue].title : 'Тут должно быть новость, но произошла ошибка соединения'}
                                        </Marquee>
                                        : null
                                } */}
                            </Box>
                        )
                            : null
                        }
                    </Box>
                }

            </CardContent>
        </Card>
    )
}

export default MuiCard
