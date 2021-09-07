const axios = window.axios;

const BASE_API_URL = "http://127.0.0.1:8000/api";

export default {
    getAllTasks: () => 
        axios.get(`${BASE_API_URL}/tasks`),
    getOneTask: (id) => 
        axios.get(`${BASE_API_URL}/tasks/${id}/edit`),
    addTask: (task) => 
        axios.post(`${BASE_API_URL}/tasks`, task),
    updateTask: (task, id) => 
        axios.put(`${BASE_API_URL}/tasks/${id}`, task),
    deleteTask: (id) =>
        axios.delete(`${BASE_API_URL}/tasks/${id}`)
};