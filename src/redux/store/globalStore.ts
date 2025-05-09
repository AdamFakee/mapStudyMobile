import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import { globalReducer } from "../slices/globalSlice";
import { CourseReducers } from "./courseTab/courseReducer";
import { ExamReducer } from "./examTab/ExamReducer";

export const GlobalStore = configureStore({
    reducer: {
        globalReducer,
        courseReducer: CourseReducers,
        ExamReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type GlobalRootState = ReturnType<typeof GlobalStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type GlobalDispatch = typeof GlobalStore.dispatch



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatchGlobal = useDispatch.withTypes<GlobalDispatch>()
export const useAppSelectorGlobal = useSelector.withTypes<GlobalRootState>()