import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { asyncStorageService } from "../../services/asyncStorage.service"
import { keyStore } from "../../constants/storeData"

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
                state.isLogin = true;
            }
            state.isLoading = false;
        })
    }
})

export const checkLogin = createAsyncThunk('globalSlice/checkLogin', async () => {
    const token = await asyncStorageService.getData({key: keyStore.accessToken})
    console.log('logiN::::token::check::::', token)
    return token ? token : null;
})


export const globalReducer = globalSlice.reducer;
export const globalActions = globalSlice.actions;

