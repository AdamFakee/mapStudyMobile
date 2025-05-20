import { keyStore } from './../../constants/storeData';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { asyncStorageService } from "../../services/asyncStorage.service"

export interface dataUser {
    thumbnail?: string,
    name: string,
    email: string
}

interface globalStateProps{
    isLogin: boolean,
    isLoading: boolean,
    dataUser: dataUser
}

const initialGlobalState: globalStateProps = {
    isLogin: false,
    isLoading: true,
    dataUser: {
        name: '',
        email: ''
    }
}


const globalSlice = createSlice({
    initialState: initialGlobalState,
    name: 'globalSlice',
    reducers: {
        login: (state, action: PayloadAction<dataUser>) => {
            state.dataUser = action.payload;
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        }
    },
    extraReducers: (build) => {
        build.addCase(checkLogin.pending, (state) => {
            state.isLoading = true;
        })
        build.addCase(checkLogin.fulfilled, (state, actions) => {
            if(actions.payload) {
                state.dataUser = actions.payload.userData;
                state.isLogin = true;
            }
            state.isLoading = false;
        })
    }
})


export const checkLogin = createAsyncThunk('globalSlice/checkLogin', async () => {
    const keys = [keyStore.accessToken, keyStore.refreshToken]
    const tokens = await asyncStorageService.getDataByMultiKeys(keys);
    const userData = await asyncStorageService.getData({key: keyStore.userData});
    const payload = {
        userData, 
        tokens: {
            accessToken: tokens[keyStore.accessToken],
            refreshToken: tokens[keyStore.refreshToken]
        }
    }
    return payload ? payload : null;
})


export const globalReducer = globalSlice.reducer;
export const globalActions = globalSlice.actions;

