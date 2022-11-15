import axios from 'axios'

const API_URL = 'http://localhost:3001'

axios.defaults.baseURL = API_URL

export const TodosService = {

    async getAllTodos() {
        return await axios.get('/tasks')
    },
    async updatedTask(id, newTask) {
        return await axios.patch(`/tasks/${id}`, newTask)
    }
}