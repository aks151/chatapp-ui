import React, {useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log('AuthContext.js AuthProvider initialized');

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if(storedToken) { 
                    setToken(storedToken);

                    const storedUser =  JSON.parse(await AsyncStorage.getItem('user'));
                    setUser(storedUser);
                }

               
            } catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadToken();

    }, []);

    const login = async (email, password) => {
        console.log('AuthContext.js, bonita login');
        try {
            console.log('AuthContext.js, inside login function try block');
            const response = await api.post('/api/auth/login', {email, password});
            const {token1, ...userData} = response.data;

            setToken(token1);
            setUser(userData);

            // await AsyncStorage.setItem('userToken', token1);
            // await AsyncStorage.setItem('user', JSON.stringify(userData));

            return response.data;
        } catch(error){
            console.log('AuthContext.js, login failed', error.response.data);
            throw error;        
        }
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{user, token, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}


export default AuthContext;