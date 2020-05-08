import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_ENDPOINT} from 'react-native-dotenv';

export default () => {
    const defaultOptions = {
        baseURL: 'http://18.179.92.227/api/v1',
        timeout: 15 * 1000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = "Bearer "+token;
            }
            return config
        },
        error => {
            return Promise.reject(error)
        });

    return instance;
};
