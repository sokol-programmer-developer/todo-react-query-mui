import axios from 'axios'

const API_KEY = '27b0716359d94365a4067fa0835766e2'

export const NewsService = {

    async getNews() {
        return await axios.get(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=${API_KEY}`)
    },
}