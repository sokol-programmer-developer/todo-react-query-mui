import React, { useState } from 'react'
import { Box, Modal, Switch, Typography } from '@mui/material'
import DataContext from '../utils/context'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { TodosService } from '../services/Todos.service'

import Header from '../components/Header/Header'
import Title from '../components/Title/Title'
import MuiCard from '../components/MuiCard/MuiCard'
import { NewsService } from '../services/News.service'

const style = {
    position: 'absolute',
    top: '20.5%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#222',
    border: '2px solid gray',
    boxShadow: 24,
    borderRadius: '22px',
    px: 4,
    pb: 3,
}

const Home = () => {
    const queryClient = useQueryClient()

    const [todos, setTodos] = useState([])
    const [todosOrigin, setTodosOrigin] = useState([])
    const [todayTasks, setTodayTasks] = useState(true)

    const [news, setNews] = useState(null)
    const [offNews, setOffNews] = useState(true)

    const [open, setOpen] = useState(false)

    let currentId = 0

    const transformTodos = (data) => {
        const groups = data.reduce((groups, todo) => {
            const date = new Date(todo.date).toLocaleDateString()
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(todo)
            return groups
        }, {})

        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                todos: groups[date]
            }
        })

        return groupArrays
    }

    const { isLoading, isError, error } = useQuery(['tasks'], () => TodosService.getAllTodos(), {
        onSuccess: ({ data }) => {
            setTodosOrigin(data)
            setTodos(transformTodos(data))
        }
    })

    // eslint-disable-next-line no-unused-vars
    const { isError: isErrorNews } = useQuery(['news'], () => NewsService.getNews(), {
        onSuccess: ({ data }) => {
            setNews(data)
        }
    })

    const onChangeTaks = async (data) => {
        await mutation.mutate(data)
    }

    const mutation = useMutation(['tasks', currentId], (updatedTodo) =>
        TodosService.updatedTask(currentId, updatedTodo), {
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
            queryClient.setQueryData()
        }
    })


    const toggleTodo = (id) => {
        const newTask = todosOrigin.map(task => {
            if (task.id === id) {
                task.done = !task.done
            }
            return task
        }).find(task => task.id === id)

        currentId = id
        onChangeTaks(newTask)
    }

    // Modal 
    const toggleModal = () => {
        setOpen(!open);
    }

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px', color: 'white', fontSize: 30 }}>Loading...</Box>
    }

    if (isError) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px', color: 'red', fontSize: 30 }}>{error.message}</Box>
    }

    return (
        <DataContext.Provider value={{
            todos,
            setTodos,
            toggleTodo,
            todayTasks,
            setTodayTasks,
            offNews,
            setOffNews,
            toggleModal
        }}>
            <Box sx={{
                display: 'flex',
                margin: '80px auto',
                width: '390px',
                height: '844px',
                borderRadius: '30px',
                backgroundColor: '#222222',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    overflow: 'hidden'
                }}>
                    <Header />
                    <Title />
                    <Box sx={{
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '5px',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        {todos.map((card, i) => <MuiCard key={i} card={card} numberCard={i} news={news} />)}
                    </Box>
                </Box>
                <Modal
                    open={open}
                    onClose={toggleModal}
                >
                    <Box sx={{ ...style, width: 350 }}>
                        <h2>App settings</h2>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                            <Typography sx={{ fontSize: '20px' }}>
                                On/off news
                            </Typography>
                            <Switch onChange={() => setOffNews(!offNews)} checked={offNews} />
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </DataContext.Provider >
    )
}

export default Home
