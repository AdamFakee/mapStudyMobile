import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { asyncStorageService } from "../../services/asyncStorage.service"
import { keyStore } from "../../constants/storeData"

interface globalStateProps {
    isLogin: boolean,
    isLoading: boolean
}

const initialGlobalState: globalStateProps = {
    isLogin: false,
    isLoading: true,
}


const globalSlice = createSlice({
    initialState: initialGlobalState,
    name: 'globalSlice',
    reducers: {
        login: (state) => {
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

