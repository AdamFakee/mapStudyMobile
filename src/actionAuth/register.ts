import { callApi, CallApiType, ApiResponse } from './../customs/axiosLib';
import { domain } from "../constants/domain"
import { Tokens } from "../types/definition"
import { dataUser } from '../redux/slices/globalSlice';

export interface resultFetchRegister extends ApiResponse {
    metadata: {
        tokens: Tokens,
        data: dataUser
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