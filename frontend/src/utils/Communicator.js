import axios from 'axios';
import Session from './Session';
import qs from 'qs';

const Communicator = {
    get: async (url, params = {}) => {
        try {
            return await Communicator.getInstance().get(url, {params});
        } catch (error) {
            throw error;
        }
    },
    post: async (url, data) => {
        try {
            return await Communicator.getInstance().post(url, data);
        } catch (error) {
            throw error;
        }
    },
    put: async (url, data) => {
        try {
            return await Communicator.getInstance().put(url, data);
        } catch (error) {
            throw error;
        }
    },
    'delete': async (url) => {
        try {
            return await Communicator.getInstance().delete(url);
        } catch (error) {
            throw error;
        }
    },
    getInstance: () => {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_ENTRY_POINT,
            headers: Communicator.headers(),
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' })
            }
        });

        instance.interceptors.response.use((response) => {
            return Communicator.parseBody(response)
        }, error => {
            if (error.response) {
                return Communicator.parseError(error.response.data)
            } else {
                return Promise.reject(error)
            }
        });

        return instance;
    },
    parseError: (message) => {
        return Promise.reject(message);
    },
    parseBody: (response) => {
        if ([200, 201, 204].indexOf(response.status) !== -1) {
            return response.data;
        } else {
            return this.parseError(response.data.messages)
        }
    },
    headers: () => {
        return {
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + Session.get('jwt')
        };
    }
};

export default Communicator;