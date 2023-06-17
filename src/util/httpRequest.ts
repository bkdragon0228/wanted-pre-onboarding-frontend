import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestHeaders} from "axios";

const requstConfig : AxiosRequestConfig  = {
    baseURL : 'https://www.pre-onboarding-selection-task.shop/'
}

class HttpRequest {
    api : AxiosInstance;

    constructor() {
        this.api = axios.create(requstConfig);

        this.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            (error: AxiosError) => {
                console.log(error);
                return Promise.reject(error);
            }
        );
    }

    async use<TData extends Partial<Record<keyof TData, any>> = {}, TResponse extends Record<keyof TResponse, any> = {}>({
        method,
        url,
        data,
        headers
    } : {
        method : 'get' | 'post' | 'delete' | 'patch' | 'put',
        url : string;
        data? : TData;
        headers? : RawAxiosRequestHeaders;
    }) {

        return this.api<TResponse>({method, url, data, headers});
    }
}

const Axios = new HttpRequest();

export default Axios;