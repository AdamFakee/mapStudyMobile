import { callApi, CallApiType, ApiResponse } from './../customs/axiosLib';
import { domain } from "../constants/domain"
import { Tokens } from "../types/definition"

export interface resultFetchRegister extends ApiResponse {
    metadata: {
        tokens: Tokens,
        data: {
            name: string,
            email: string,
        }
    }
}


export const CallApiRegister = async <T>(data: unknown): Promise<T> => {
    const url = domain + '/user/signup';
    const opts: CallApiType = {
        method: 'POST',
        data: data,
        url,
    }
    try {
        const res: T = await callApi(opts)
        return res;
    } catch (error) {
        throw error;
    }
}