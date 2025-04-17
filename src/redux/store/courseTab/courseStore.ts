import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import { filterCourseReducer } from "../../slices/filterCourse/filterCourseSlice";
import { detailCourseReducer } from "../../slices/detailCourse/detailCourseSlice";

export const CourseStore = configureStore({
    reducer: {
        filterCourseReducer,
        detailCourseReducer,
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type CourseRootState = ReturnType<typeof CourseStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type CourseDispatch = typeof CourseStore.dispatch



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatchCourse = useDispatch.withTypes<CourseDispatch>()
export const useAppSelectorCourse = useSelector.withTypes<CourseRootState>()