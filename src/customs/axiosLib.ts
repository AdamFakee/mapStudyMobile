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

export interface CallApiType {
    url: string,
    headers?: RawAxiosRequestHeaders;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: any;
}
export interface ApiResponse {
    status?: number;
    message: string;
}
export interface ApiError extends Error {
    status: number;
    code: number;
}
export const callApi = async <T>({
    url,
    headers,
    method = 'GET',
    data,
}: CallApiType): Promise<T> => {
    const response = await axiosConfigBase({
        url,
        method,
        headers: { ...headerConfig, ...headers },
        data,
        transformRequest: transformReq,
        transformResponse: transformRes,
    });

    // nếu gặp lỗi 204 
    const result: T = response.status === 204 ? {} : await response.data;
    return { ...result };
};

