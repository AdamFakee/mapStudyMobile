import axios, { AxiosInstance, AxiosRequestTransformer, AxiosResponseTransformer, RawAxiosRequestHeaders } from "axios";

const headerConfig: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
};

export const transformReq: AxiosRequestTransformer | AxiosRequestTransformer[] = (data) => {
    return JSON.stringify(data);
} 
export const transformRes: AxiosResponseTransformer | AxiosResponseTransformer[] = (data) => {
    return JSON.parse(data);
}

export const axiosConfigBase: AxiosInstance = axios.create({
    headers: headerConfig,
    timeout: 2000,
});

interface CallApiType {
    url: string,
    headers?: RawAxiosRequestHeaders;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: any;
}
export const callApi = async ({ url, headers, method = 'GET', data}: CallApiType) => {
    const response = await axiosConfigBase({
        url,
        method,
        headers: { ...headerConfig, ...headers },
        data,
        transformRequest: transformReq,
        transformResponse: transformRes,
    });
    return response.data;
};

