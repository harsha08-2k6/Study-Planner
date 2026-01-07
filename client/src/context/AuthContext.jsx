import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:8000/api';

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // In a real app, we'd verify the token or fetch user profile
            const savedUser = JSON.parse(localStorage.getItem('user'));
            setUser(savedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await axios.post(`${API_URL}/login/`, { username, password });
        const { access, refresh } = response.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

        // Fetch user profile to get the role
        const profileRes = await axios.get(`${API_URL}/users/me/`);
        const userData = profileRes.data;

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return response.data;
    };

    const register = async (userData) => {
        const response = await axios.post(`${API_URL}/register/`, userData);
        return response.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
