import { GlobalRootState } from './../../store/globalStore';
import { RawAxiosRequestHeaders } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InforUser } from "../../../types/definition";
import { ApiResponse, callApi, CallApiType } from "../../../customs/axiosLib";
import { domain } from "../../../constants/domain";
import { asyncStorageService } from '../../../services/asyncStorage.service';
import { keyStore } from '../../../constants/storeData';





interface Metadata {
    user: InforUser
}
interface resultFetch extends ApiResponse {
    metadata: Metadata
}

interface profileStateProps {
    user: InforUser,
    isLoading: boolean
}

const initialState: profileStateProps = {
    user: {} as InforUser,
    isLoading: true,
}

export const fetchInforUser = createAsyncThunk('inforUser/callApi', async (_, {getState}) => {
    const url = domain + '/user';
    const state = getState() as GlobalRootState;
    const globalState = state.globalReducer;
    const headers: RawAxiosRequestHeaders = {
        'x-client-email': globalState.dataUser.email || null,
        'authorization': await asyncStorageService.getData({key: keyStore.accessToken}),
    }
    const opts: CallApiType = {
        url, headers
    }
    const res = await callApi<resultFetch>(opts);
    return res;
})

export const profileSlice = createSlice({
    name: 'detailCourseSclie',
    initialState: initialState,
    reducers: {
        setThumbnail: (state, actions: PayloadAction<InforUser['thumbnail']>) => {
            if(!actions.payload) return;
            state.user.thumbnail = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInforUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInforUser.fulfilled, (state, action) => {
                state.user = action.payload.metadata.user;
                state.isLoading = false;
            })
    }
})



export const ProfileReducer = profileSlice.reducer;
export const ProfileAction = profileSlice.actions;
