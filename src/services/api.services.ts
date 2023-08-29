import axios from 'axios';
import { BASEURL } from '../constants/data';
import { getData } from '../utils/store-retrieve-data';

const service = axios.create({
    baseURL: BASEURL,

});

service.interceptors.request.use(
    async function (config) {
        let token = await getData({ key: "@authToken" })

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }


        return config;
    },
    function (error) {
        if (error.response) {
            return Promise.reject(error.response);
        } else if (error.request) {
            return Promise.reject(error.request);
        } else {
            return Promise.reject(error.message);
        }
    }
);

service.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            return Promise.reject(error.response);
        } else if (error.request) {
            return Promise.reject(error.request);
        } else {
            return Promise.reject(error.message);
        }
    }
);


export const POST = async (url: string, payload: any) => {
    try {
        const data = await service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        if (resolvedData) {
            return resolvedData;
        }

    } catch (error) {
        return error
    }
}


export const GET = async (url: string) => {
    try {
        const data = await service.get(url);
        const resolvedData = await Promise.resolve(data);
        if (resolvedData) {
            return resolvedData;
        }
    } catch (error) {
        return error
    }
}