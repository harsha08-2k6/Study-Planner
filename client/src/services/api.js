import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const taskService = {
    getTasks: () => api.get('/tasks/'),
    createTask: (taskData) => api.post('/tasks/', taskData),
    updateTask: (id, taskData) => api.patch(`/tasks/${id}/`, taskData),
    deleteTask: (id) => api.delete(`/tasks/${id}/`),
};

export const subjectService = {
    getSubjects: () => api.get('/subjects/'),
    createSubject: (subjectData) => api.post('/subjects/', subjectData),
};

export default api;
